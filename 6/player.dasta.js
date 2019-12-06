const calculateOrbits = (planet, map, jumps = 0) =>
  map[planet] !== undefined ? calculateOrbits(map[planet], map, ++jumps) : jumps;

const part1 = input => {
  const estellarMap = {};

  input.forEach(value => {
    const data = value.split(')');
    const center = data[0];
    const inOrbit = data[1];
    if (!estellarMap[inOrbit]) estellarMap[inOrbit] = [center];
  });

  return Object.keys(estellarMap).reduce(
    (accumulator, currentValue) => accumulator + calculateOrbits(currentValue, estellarMap),
    0
  );
};
const part2 = input => {};

module.exports = { part1, part2 };
