const IntCode = require('./raul.IntCode.js');

const part1 = data => {
  const OP_CODES = {
    ADD: 1,
    MULTIPLY: 2,
    INPUT: 3,
    OUTPUT: 4
  };
  const intCode = new IntCode({ data: data, inputs: [1], OP_CODES: OP_CODES });

  return intCode.run();
};
const part2 = data => {
  const intCode = new IntCode({ data: data, inputs: [5] });
  return intCode.run();
};

module.exports = { part1, part2 };
