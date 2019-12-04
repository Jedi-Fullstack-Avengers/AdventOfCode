const { range } = require('rxjs');
const { filter, toArray } = require('rxjs/operators');

const part1 = n => {
  const values = n.split('-');
  const source = range(values[0], values[1] - values[0]).pipe(
    filter(
      n =>
        Array.from(n.toString()).filter((element, index, array) => element === array[index + 1])
          .length &&
        Array.from(n.toString()).every((element, index, array) => !(element > array[index + 1]))
    ),
    toArray()
  );

  let solution = 0;
  source.subscribe(value => (solution = value.length));

  return solution;
};

const part2 = n => {};

module.exports = { part1, part2 };
