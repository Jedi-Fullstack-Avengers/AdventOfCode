const part1 = array => {
  const intCode = [...array];

  intCode[1] = 12;
  intCode[2] = 2;

  intCode.forEach((currentValue, index, array) => {
    const operation = currentValue;
    if (index % 4 === 0 && operation !== 99 && (operation === 1 || operation === 2)) {
      const firstValuePos = array[index + 1];
      const secondValuePos = array[index + 2];
      const resultPos = array[index + 3];
      const firstValue = array[firstValuePos];
      const secondValue = array[secondValuePos];
      let resultValue = -1;

      if (operation === 1) resultValue = firstValue + secondValue;
      else if (operation === 2) resultValue = firstValue * secondValue;

      if (resultValue === -1) {
        array[0] = -1;
      }

      array[resultPos] = resultValue;
    }
  });

  return intCode[0];
};

const trampoline = fn => (...args) => {
  let result = fn(...args);
  while (typeof result === 'function') {
    result = result();
  }
  return result;
};

const part2 = (array, noun = 0, verb = 0) => {
  const intCode = [...array];
  const expectedValue = 19690720;

  intCode[1] = noun;
  intCode[2] = verb;

  intCode.forEach((currentValue, index, array) => {
    const operation = currentValue;
    if (index % 4 === 0 && operation !== 99 && (operation === 1 || operation === 2)) {
      const firstValuePos = array[index + 1];
      const secondValuePos = array[index + 2];
      const resultPos = array[index + 3];
      const firstValue = array[firstValuePos];
      const secondValue = array[secondValuePos];
      let resultValue = -1;

      if (operation === 1) resultValue = firstValue + secondValue;
      else if (operation === 2) resultValue = firstValue * secondValue;

      if (resultValue === -1) {
        array[0] = -1;
      }

      array[resultPos] = resultValue;
    }
  });

  if (intCode[0] === expectedValue) return 100 * noun + verb;

  if (verb < 100) verb++;
  else if (noun < 100) {
    verb = 0;
    noun++;
  } else return -1;

  return trampoline(part2)(array, noun, verb);
};

module.exports = { part1, part2 };
