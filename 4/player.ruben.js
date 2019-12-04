const { range } = require('rxjs');
const { filter, reduce } = require('rxjs/operators');

const hasSameAdjacentDigit = number =>
  Array.from(number.toString()).reduce(
    (acc, cur, idx, array) => (acc ? acc : cur === array[idx + 1]),
    false
  );

const hasSameAdjacentDigitStrict = number =>
  number
    .toString()
    .match(/(\d)\1*/g)
    .reduce((acc, cur) => (acc ? acc : cur.length === 2), false);

const isCrescendo = number =>
  Array.from(number.toString()).every((cur, idx, array) => !(array[idx - 1] > cur));

const part1 = input => {
  let result;
  range(input[0], input[1] - input[0])
    .pipe(
      filter(hasSameAdjacentDigit),
      filter(isCrescendo),
      reduce(acc => acc + 1, 0)
    )
    .subscribe(x => (result = x));
  return result;
};

const part2 = input => {
  let result;
  range(input[0], input[1] - input[0])
    .pipe(
      filter(hasSameAdjacentDigitStrict),
      filter(isCrescendo),
      reduce(acc => acc + 1, 0)
    )
    .subscribe(x => (result = x));
  return result;
};

module.exports = { part1, part2 };
