const IntCode = require('./raul.IntCode.js');

const part1 = data => {
  delete IntCode.OP_CODES.JUMPTRUE;
  delete IntCode.OP_CODES.JUMPFALSE;
  delete IntCode.OP_CODES.LESSTHAN;
  delete IntCode.OP_CODES.EQUALS;

  return IntCode.run(data)([1])();
};
const part2 = data => {
  IntCode.OP_CODES.JUMPTRUE = 5;
  IntCode.OP_CODES.JUMPFALSE = 6;
  IntCode.OP_CODES.LESSTHAN = 7;
  IntCode.OP_CODES.EQUALS = 8;

  return IntCode.run(data)([5])();
};

module.exports = { part1, part2 };
