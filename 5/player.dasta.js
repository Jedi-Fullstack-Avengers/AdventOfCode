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
  //console.log(`Load ${value} on ${value}`);
  return store[value];
};

const getOperation = value => {
  return Array.from(value.toString()).reverse();
};

const part1 = input => {
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
    const userInput = 1;

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

const part2 = () => {};

module.exports = { part1, part2 };
