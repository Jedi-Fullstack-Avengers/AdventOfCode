const calculateSlope = (origin, target) => {
  return {
    ang: Math.atan2(origin.x - target.x, origin.y - target.y),
    slope: reduce(target.y - origin.y, target.x - origin.x).join()
  };
};

function reduce(numerator, denominator) {
  var gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

const sonar = (map, coordinates) => {
  const vectors = [];

  map.forEach((row, y) => {
    Array.from(row).forEach((element, x) => {
      if (element === '#' && (x != coordinates.x || y != coordinates.y)) {
        const vector = calculateSlope(coordinates, { x, y });
        if (
          !vectors.some(
            registeredVector =>
              registeredVector.ang === vector.ang && registeredVector.slope === vector.slope
          )
        )
          vectors.push(vector);
      }
    });
  });

  return vectors.length;
};

const part1 = input => {
  let maxMatches = 0;
  input.forEach((row, y) => {
    Array.from(row).forEach((element, x) => {
      if (element === '#') {
        const matches = sonar(input, { x, y });
        if (matches > maxMatches) {
          maxMatches = matches;
        }
      }
    });
  });

  return maxMatches;
};

const part2 = input => {};

module.exports = { part1, part2 };
