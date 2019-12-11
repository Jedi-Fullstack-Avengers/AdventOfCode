const applyMod = (intCode, modParam, index, relativeBase) => {
  switch (modParam) {
    case 0:
      return intCode[intCode[index]];
    case 1:
      return intCode[index];
    case 2:
      return intCode[intCode[index] + relativeBase];
    default:
      console.log(`Mod parametter ${modParam} not valid!`);
      return -1;
  }
};

const applyModWrite = (intCode, modParam, index, relativeBase) => {
  switch (modParam) {
    case 0:
    case 1:
      return intCode[index];
    case 2:
      return intCode[index] + relativeBase;
    default:
      console.log(`Mod parametter ${modParam} not valid!`);
      return -1;
  }
};

const getOpCodeAndMode = op => {
  const opCode = op.length == 1 ? 0 + op : op[op.length - 2] + op[op.length - 1];
  const mode = op.substring(0, op.length - 2);
  const result = [
    opCode,
    mode
      .split('')
      .reverse()
      .join('')
  ];

  return result;
};

const intCodeComputer = (input, userInput, cache) => {
  const intCode = [...input];
  let loopLength = 1;
  let relativeBase = 0;
  let parameters = {};
  let error = false;
  let waiting = false;

  for (
    let index = cache !== undefined ? cache.position : 0;
    index < intCode.length && !error && !waiting;
    index += loopLength
  ) {
    const operation = getOpCodeAndMode(intCode[index].toString());
    const opCode = parseInt(operation[0]);
    if (opCode === 99) {
      cache.saveCache(intCode, opCode, index);
      break;
    }
    const modParams = [
      parseInt(operation[1][0] === undefined ? 0 : operation[1][0]),
      parseInt(operation[1][1] === undefined ? 0 : operation[1][1]),
      parseInt(operation[1][2] === undefined ? 0 : operation[1][2])
    ];

    switch (opCode) {
      case 1:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first + parameters.second;
        loopLength = 4;
        break;
      case 2:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first * parameters.second;
        loopLength = 4;
        break;
      case 3:
        loopLength = 2;
        if (userInput === undefined) {
          if (cache.halt(opCode, userInput)) {
            cache.saveCache(intCode, opCode, index + loopLength);
            waiting = true;
          }
        } else {
          intCode[applyModWrite(intCode, modParams[0], index + 1, relativeBase)] = userInput;
        }
        break;
      case 4:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase)
        };

        loopLength = 2;
        cache.output.push(parameters.first);
        if (cache.halt(opCode, userInput)) {
          cache.saveCache(intCode, opCode, index + loopLength);
          waiting = true;
        }
        break;
      case 5:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase)
        };

        if (parameters.first != 0) {
          index = parameters.second;
          loopLength = 0;
        } else {
          loopLength = 3;
        }
        break;
      case 6:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase)
        };

        if (parameters.first == 0) {
          index = parameters.second;
          loopLength = 0;
        } else {
          loopLength = 3;
        }
        break;
      case 7:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first < parameters.second ? 1 : 0;
        loopLength = 4;
        break;
      case 8:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first == parameters.second ? 1 : 0;
        loopLength = 4;
        break;
      case 9:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase)
        };

        relativeBase += parameters.first;
        loopLength = 2;
        break;

      default:
        console.log(`Operation code ${opCode} not valid!`);
        error = true;
        break;
    }
  }

  return cache;
};

const Navigator = {
  directions: ['^', '>', 'v', '<'],
  direction: '^',
  position: [0, 0],
  route: { '0,0': 0 },
  paintedSpots: { '0,0': 0 },
  advance: function() {
    switch (this.direction) {
      case '^':
        this.position[1] -= 1;
        break;
      case 'v':
        this.position[1] += 1;
        break;
      case '>':
        this.position[0] += 1;
        break;
      case '<':
        this.position[0] -= 1;
        break;
      default:
        console.log(this.direction, 'Invalid direction!');
        break;
    }

    if (this.route[this.position.join(',')] === undefined) this.route[this.position.join(',')] = 0;
  },
  updateDirection: function(value) {
    // Turn left
    if (value === 0) {
      const currentDirection = this.directions.findIndex(element => element === this.direction);
      if (currentDirection === 0) {
        this.direction = this.directions[this.directions.length - 1];
      } else {
        this.direction = this.directions[currentDirection - 1];
      }
      //Turn right
    } else if (value === 1) {
      const currentDirection = this.directions.findIndex(element => element === this.direction);
      if (currentDirection === this.directions.length - 1) {
        this.direction = this.directions[0];
      } else {
        this.direction = this.directions[currentDirection + 1];
      }
    } else {
      console.log(value, 'Invalid direction degrees!');
    }
  },
  paint: function(colorToPaint) {
    const floorColor = this.route[this.position.join(',')];
    this.route[this.position.join(',')] = colorToPaint;
    if (floorColor !== colorToPaint) {
      //console.log(`Painting ${colorToPaint} on ${this.position.join(',')}`);
      this.paintedSpots[this.position.join(',')] = colorToPaint;
    } else {
      console.log(`${this.position.join(',')} already painted with ${colorToPaint}`);
    }
  },
  getFloorColor: function() {
    const floorColor = this.route[this.position.join(',')];
    return floorColor !== undefined ? floorColor : undefined;
  }
};

const part1 = (input, part2 = false) => {
  let hullPaintingRobot = {
    intCode: input,
    opCode: 0,
    position: 0,
    output: [],
    halt: function(opCode, input) {
      if (opCode === 99) return true;
      if (opCode === 3 && input === undefined) return true;
      if (opCode === 4 && this.output.length > 1) return true;
      return false;
    },
    saveCache: function(intCode, opCode, position) {
      this.intCode = intCode;
      this.opCode = opCode;
      this.position = position;
    },
    resetOutput: function() {
      this.output = [];
    }
  };

  while (hullPaintingRobot.opCode != 99) {
    const floorColor = Navigator.getFloorColor();
    hullPaintingRobot = intCodeComputer(hullPaintingRobot.intCode, floorColor, hullPaintingRobot);

    if (
      hullPaintingRobot.opCode != 99 &&
      hullPaintingRobot.opCode !== 3 &&
      hullPaintingRobot.output.length > 1
    ) {
      Navigator.paint(hullPaintingRobot.output[0]);
      Navigator.updateDirection(hullPaintingRobot.output[1]);
      Navigator.advance();
      hullPaintingRobot.resetOutput();
    }
  }

  return part2 ? Navigator.paintedSpots : Object.keys(Navigator.paintedSpots).length;
};

const part2 = input => {
  const paintedSpots = part1(input, true);
  let maxX, minX, maxY, minY;

  Object.entries(paintedSpots).forEach(spot => {
    const x = parseInt(spot[0].split(',')[0]);
    const y = parseInt(spot[0].split(',')[1]);

    if (maxX === undefined || (x >= 0 && x > maxX)) maxX = x;
    if (maxY === undefined || (y >= 0 && y > maxY)) maxY = y;
    if (minX === undefined || (x < 0 && x < minX)) minX = x;
    if (minY === undefined || (y < 0 && y < minY)) minY = x;
  });

  const layout = {
    wide: Math.abs(minX) + Math.abs(maxX),
    tall: Math.abs(minY) + Math.abs(maxY) / 2,
    data: []
  };

  for (let i = 0; i < layout.tall; i++) {
    for (let j = 0; j < layout.wide; j++) {
      if (layout.data[i] === undefined) layout.data[i] = [];
      const pixelColor = paintedSpots[`${i},${j}`];
      if (pixelColor === 1) layout.data[i][j] = '#';
      else layout.data[i][j] = '.';
    }
  }

  for (let i = 0; i < layout.tall; i++) {
    for (let j = 0; j < layout.wide; j++) {
      process.stdout.write(layout.data[i][j]);
    }
    console.log();
  }

  return null;
};

module.exports = { part1, part2 };
