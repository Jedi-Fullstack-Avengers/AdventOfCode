const calculateSlope = (origin, target) => {
  return {
    ang: Math.atan2(target.x - origin.x, target.y - origin.y),
    slope: reduce(target.y - origin.y, target.x - origin.x).join(),
    position: [target.x, target.y],
    value: [origin.x - target.x, origin.y - target.y]
  };
};

const reduce = (numerator, denominator) => {
  let gcd = (a, b) => (b ? gcd(b, a % b) : a);
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
};

const sonar = (map, coordinates) => {
  const vectors = [];

  map.forEach((row, y) => {
    Array.from(row).forEach((element, x) => {
      if (element === '#' && (x !== coordinates.x || y !== coordinates.y)) {
        const vector = calculateSlope(coordinates, { x, y });

        if (
          !vectors.some((registeredVector, index) => {
            if (
              registeredVector.ang === vector.ang &&
              registeredVector.slope === vector.slope &&
              Math.abs(registeredVector.value[0]) + Math.abs(registeredVector.value[1]) >
                Math.abs(vector.value[0]) + Math.abs(vector.value[1])
            ) {
              vectors.splice(index, 1, vector);
            }
            return registeredVector.ang === vector.ang && registeredVector.slope === vector.slope;
          })
        ) {
          vectors.push(vector);
        }
      }
    });
  });

  vectors.sort((a, b) => {
    return b.ang - a.ang;
  });

  return vectors;
};

const part1 = (input, part2 = false) => {
  let maxMatches = { position: '', matches: 0, targets: [] };
  input.forEach((row, y) => {
    Array.from(row).forEach((element, x) => {
      if (element === '#') {
        const matches = sonar(input, { x, y });
        if (matches.length > maxMatches.matches) {
          maxMatches.matches = matches.length;
          maxMatches.position = `${x},${y}`;
          maxMatches.targets = matches;
        }
      }
    });
  });

  return part2 ? maxMatches : maxMatches.matches;
};

const laser = (map, targets) => {
  targets.forEach(target => {
    const shoot = Array.from(map[target.position[1]]);
    shoot[target.position[0]] = '.';
    map[target.position[1]] = shoot.join('');
  });

  return map;
};

const part2 = input => {
  let shootList = [];
  const baseStation = part1(input, true);
  let updatedMap = laser(input, baseStation.targets);
  shootList = [...shootList, ...baseStation.targets];
  let updatedTargets = [];

  do {
    updatedTargets = sonar(updatedMap, baseStation.position);
    updatedMap = laser(input, updatedTargets);
    shootList = [...shootList, ...updatedTargets];
  } while (updatedTargets.length > 0);

  return shootList[199].position[0] * 100 + shootList[199].position[1];
};

module.exports = { part1, part2 };
