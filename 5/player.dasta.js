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

const jumpIfTrue = values => {
  //console.log(`Try to jump with ${values[0]} != 0`);
  if (values[0] != 0) return values[1];
};

const jumpIfFalse = values => {
  //console.log(`Try to jump with ${values[0]} == 0`);
  if (values[0] == 0) return values[1];
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

const part1 = (input, userInput = 1) => {
  const intCode = [...input];
  let loopLength = 1;
  let solution = 0;

  for (let index = 0; index < intCode.length; index += loopLength) {
    const operation = getOperation(parseInt(intCode[index]));
    if (operation[0] == 9 && operation[1] == 9) break;
    const opCode = parseInt(operation[0]);
    const modParams = [
      parseInt(operation[2] === undefined ? 0 : operation[2]),
      parseInt(operation[3] === undefined ? 0 : operation[3])
    ];
    loopLength = opCode === 1 || opCode === 2 ? 4 : 2;

    //console.log(`Op ${opCode} with modParams ${modParams[0]}-${modParams[1]}`);
    const firstValuePos = intCode[index + 1];
    const secondValuePos = intCode[index + 2];
    const firstValue = modParams[0] === 0 ? intCode[firstValuePos] : firstValuePos;
    const secondValue = modParams[1] === 0 ? intCode[secondValuePos] : secondValuePos;

    //console.log(`${firstValue}-${secondValue}`);

    if (opCode === 1) opCodeSum(intCode, [firstValue, secondValue], intCode[index + 3]);
    else if (opCode === 2) opCodeMul(intCode, [firstValue, secondValue], intCode[index + 3]);
    else if (opCode === 3) opCodeSave(intCode, userInput, firstValuePos);
    else if (opCode === 4) solution = opCodeLoad(intCode, firstValuePos);
  }

  return solution;
};

const part2 = (input, userInput = 5) => {
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
    else if (opCode === 3) opCodeSave(intCode, userInput, firstValuePos);
    else if (opCode === 4) solution = opCodeLoad(intCode, firstValuePos);
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

module.exports = { part1, part2 };
