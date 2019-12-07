const opCodeSum = (store, values, position) => {
  //console.log(`Sum ${values[0]}+${values[1]} on ${position}`);
  store[position] = values[0] + values[1];
  return store;
};

const opCodeMul = (store, values, position) => {
  //console.log(`Mul ${values[0]}*${values[1]} on ${position}`);
  store[position] = values[0] * values[1];
  return store;
};

const opCodeSave = (store, value, position) => {
  //console.log(`Save ${value} on ${position}`);
  store[position] = value;
  return store;
};

const opCodeLoad = (store, value) => {
  //console.log(`Load ${value} from ${value}`);
  return store[value];
};

const lessThan = (store, values, position) => {
  store[position] = values[0] < values[1] ? 1 : 0;
  //console.log(`LessThan ${values[0] < values[1]} on ${position} found ${store[position]}`);
};

const equals = (store, values, position) => {
  store[position] = values[0] == values[1] ? 1 : 0;
  //console.log(`Equals ${values[0] == values[1]} on ${position} found ${store[position]}`);
};

const getOperation = value => {
  return Array.from(value.toString()).reverse();
};

const getLoopLength = (opCode, modified) => {
  if (opCode === 1 || opCode === 2 || opCode === 7 || opCode === 8) return 4;
  if (opCode === 3 || opCode === 4) return 2;
  return modified ? 0 : 3;
};

const intCodeComputer = (input, phaseSetting, inputSignal) => {
  const intCode = [...input];
  let loopLength = 1;
  let solution = 0;

  for (let index = 0; index < intCode.length; index += loopLength) {
    let modified = false;
    const operation = getOperation(parseInt(intCode[index]));
    if (operation[0] == 9 && operation[1] == 9) break;
    const opCode = parseInt(operation[0]);
    //console.log('TCL: opCode', opCode);
    const modParams = [
      parseInt(operation[2] === undefined ? 0 : operation[2]),
      parseInt(operation[3] === undefined ? 0 : operation[3])
    ];
    //console.log('TCL: modParams', modParams);

    const firstValuePos = intCode[index + 1];
    const secondValuePos = intCode[index + 2];
    const firstValue = modParams[0] === 0 ? intCode[firstValuePos] : firstValuePos;
    const secondValue = modParams[1] === 0 ? intCode[secondValuePos] : secondValuePos;
    const resultPosition = intCode[index + 3];

    //console.log(`Using values: ${firstValue}|${secondValue}`);

    if (opCode === 1) opCodeSum(intCode, [firstValue, secondValue], resultPosition);
    else if (opCode === 2) opCodeMul(intCode, [firstValue, secondValue], resultPosition);
    else if (opCode === 3) {
      opCodeSave(intCode, phaseSetting === -1 ? inputSignal : phaseSetting, firstValuePos);
      phaseSetting = -1;
    } else if (opCode === 4) solution = opCodeLoad(intCode, firstValuePos);
    else if (opCode === 5) {
      if (firstValue != 0) {
        index = secondValue;
        modified = true;
      }
    } else if (opCode === 6) {
      if (firstValue == 0) {
        index = secondValue;
        modified = true;
      }
    } else if (opCode === 7) lessThan(intCode, [firstValue, secondValue], resultPosition);
    else if (opCode === 8) equals(intCode, [firstValue, secondValue], resultPosition);
    loopLength = getLoopLength(opCode, modified);
  }

  return solution;
};

// DAY 7 Related Code

const getSignal = (input, higher, phaseSettings) => {
  let io = 0;
  phaseSettings.forEach(ps => {
    io = intCodeComputer(input, ps, io);
  });

  if (io > higher.signal) {
    higher.signal = io;
    higher.phaseSetting = phaseSettings;
  }

  return higher;
};

const permutation = array => {
  const innerPermutation = (array, temp) => {
    if (!array.length) result.push(temp);
    for (let i = 0; i < array.length; i++) {
      const x = array.splice(i, 1)[0];
      innerPermutation(array, temp.concat(x));
      array.splice(i, 0, x);
    }
  };

  const result = [];
  innerPermutation(array, []);
  return result;
};

const part1 = input => {
  let higher = { signal: 0, phaseSetting: [0, 0, 0, 0, 0, 0] };
  permutation([0, 1, 2, 3, 4]).forEach(phaseSettings => {
    getSignal(input, higher, phaseSettings);
  });

  return higher.signal;
};

const part2 = input => {};

module.exports = { part1, part2 };
