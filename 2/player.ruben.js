const suma = value1 => value2 => value1 + value2;
const multiply = value1 => value2 => value1 * value2;
const calculate = operation => trash => value1 => value2 => position =>
  operation === 1 ? suma(value1)(value2) : multiply(value1)(value2);

const part1 = input => {
  let theCalculate = calculate(input[0]);
  let theResult = 0;
  const copyInput = [...input];
  copyInput[1] = 12;
  copyInput[2] = 2;
  copyInput.forEach((curr, index, array) => {
    theCalculate = theCalculate(array[curr]);
    if (typeof theCalculate !== 'function') {
      array[curr] = theCalculate;
      if (array[index + 1] === 99) theResult = array[0];
      theCalculate = calculate(array[index + 1]);
    }
  });

  return theResult;
};

module.exports = { part1 };
