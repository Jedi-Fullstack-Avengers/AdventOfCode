const generatePattern = (repetitions, signalLength) => {
  const pattern = [0, 1, 0, -1];
  let filledPattern = [];

  while (filledPattern.length < signalLength) {
    filledPattern = filledPattern.concat(
      pattern
        .map((digit, index) => {
          const tempArray = [];
          let count = index === 0 && filledPattern.length === 0 ? repetitions - 1 : repetitions;
          while (count--) tempArray.push(digit);
          return tempArray;
        })
        .flat()
    );
  }

  return filledPattern.slice(0, signalLength);
};

const part1 = (input, loop = 100, slice = [0, 8]) => {
  const signalLength = input.length;
  let inputSignal = Array.from(input);
  let nextInputSignal = [];

  while (loop--) {
    for (let index = 0; index < signalLength; index++) {
      const pattern = generatePattern(index + 1, signalLength);
      const sum = inputSignal
        .map((digit, index) => {
          return digit * pattern[index];
        })
        .reduce((accumulator, digit) => accumulator + digit);
      nextInputSignal.push(
        Math.abs(
          sum
            .toString()
            .split('')
            .pop()
        )
      );
    }

    inputSignal = [...nextInputSignal];
    nextInputSignal = [];
  }

  return inputSignal.slice(slice[0], slice[1]).join('');
};
const part2 = input => {
  // let count = 10000;
  // let realSignal = [];
  // while (count--) {
  //   realSignal.push(...input);
  // }
  // realSignal = realSignal.flat().join('');
  // const messageOffset = input
  //   .split('')
  //   .slice(0, 7)
  //   .reduce((accumulator, digit) => parseInt(accumulator) + parseInt(digit));
  // return part1(realSignal, 100, [messageOffset, this.length]);
};

module.exports = { part1, part2 };
