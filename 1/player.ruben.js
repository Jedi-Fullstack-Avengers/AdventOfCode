const calculateFuel = input => Math.floor(input / 3) - 2;
const adjustFuel = input => {
  const extraFuel = calculateFuel(input);
  return extraFuel > 0 ? extraFuel + adjustFuel(extraFuel) : 0;
};

const part1 = input => {
  return input.map(calculateFuel).reduce((acc, curr) => acc + curr, 0);
};
const part2 = input => {
  return input
    .map(calculateFuel)
    .map(input => input + adjustFuel(input))
    .reduce((acc, curr) => acc + curr, 0);
};

module.exports = {
  part1,
  part2
};
