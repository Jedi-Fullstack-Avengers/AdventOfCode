'use strict'

const sum = (a, b) => a + b;

// Part 1
// ======

const part1 = input => {
  return input.map(simpleFuelCalculation)
    .reduce(sum);
};

const simpleFuelCalculation = mass => (Math.floor(mass / 3)) - 2;

// Part 2
// ======

const part2 = input => {

  return input.map(advancedFuelCalculation)
    .reduce(sum);
};

const advancedFuelCalculation = mass => {
  let sum = 0;
  let fuel_needed = simpleFuelCalculation(mass);
  while (fuel_needed > 0) {
    sum += fuel_needed;
    fuel_needed = simpleFuelCalculation(fuel_needed);
  }
  return sum;
};

module.exports = { part1, part2 };
