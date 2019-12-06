const getValues = input => input.split(')');

const findPlanet = (array, values, callback) => {
  for (let index = 0; index < array.length; index++) {
    const element = getValues(array[index]);
    if (element[1] === values[0]) {
      return 1 + callback(array[index]);
    }
  }
};

const getCalculateOrbit = array =>
  (calculateOrbit = input => {
    const values = getValues(input);
    if (values[0] === 'COM') {
      return 1;
    } else {
      return findPlanet(array, values, calculateOrbit);
    }
  });

const part1 = array => {
  const calculateOrbit = getCalculateOrbit(array);
  return array.reduce((acc, element) => acc + calculateOrbit(element), 0);
};

const part2 = input => {
  let result;
  return result;
};

module.exports = { part1, part2 };
