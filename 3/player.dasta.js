const move = rawData => {
  const currentPath = [];
  let x = 0;
  let y = 0;

  rawData.forEach(data => {
    const direction = data[0];
    let value = data.slice(1, data.length);

    while (value) {
      if (direction === 'R') x++;
      else if (direction === 'L') x--;
      else if (direction === 'U') y++;
      else if (direction === 'D') y--;

      currentPath.push(x + ',' + y);
      value--;
    }
  });

  return currentPath;
};

const part1 = wires => {
  const usedPaths = wires.map(wire => move(wire));
  return usedPaths[0]
    .filter(function(n) {
      return this.has(n);
    }, new Set(usedPaths[1]))
    .map(element => {
      const values = element.split(',');
      return Math.abs(values[0]) + Math.abs(values[1]);
    })
    .sort((a, b) => a - b)[0];
};

const part2 = wires => {};

module.exports = { part1, part2 };
