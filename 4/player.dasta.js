const { range } = require('rxjs');
const { filter, toArray } = require('rxjs/operators');

const part1 = values => {
  //const values = n.split('-');
  const source = range(values[0], values[1] - values[0]).pipe(
    filter(
      num =>
        Array.from(num.toString()).filter((element, index, array) => element === array[index + 1])
          .length &&
        Array.from(num.toString()).every((element, index, array) => !(element > array[index + 1]))
    ),
    toArray()
  );

  let solution = 0;
  source.subscribe(value => (solution = value.length));

  return solution;
};

const part2 = values => {
  //const values = n.split('-');
  const source = range(values[0], values[1] - values[0]).pipe(
    filter(
      num =>
        num
          .toString()
          .match(/([0-9])\1*/g)
          .filter(element => element.length === 2).length &&
        Array.from(num.toString()).every((element, index, array) => !(element > array[index + 1]))
    ),
    toArray()
  );

  let solution = 0;
  source.subscribe(value => (solution = value.length));
  return solution;
};

module.exports = { part1, part2 };
