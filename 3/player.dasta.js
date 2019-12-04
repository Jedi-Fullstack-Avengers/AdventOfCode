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

const part2 = wires => {
  let globalPath = null;
  const usedPaths = wires.map(wire => {
    const collisions = [];
    let x = 0;
    let y = 0;
    let steps = 0;
    let isFirst = false;

    if (!globalPath) {
      globalPath = [[], []];
      isFirst = true;
    }

    wire.forEach(data => {
      const direction = data[0];
      let value = data.slice(1, data.length);

      while (value) {
        steps++;
        if (direction === 'R') x++;
        else if (direction === 'L') x--;
        else if (direction === 'U') y++;
        else if (direction === 'D') y--;

        if (!isFirst && globalPath[x] && globalPath[x][y]) collisions.push(`${x},${y},${steps}`);
        else if (isFirst) {
          if (!globalPath[x]) globalPath[x] = [];
          if (!globalPath[x][y]) globalPath[x][y] = [steps];
        }

        value--;
      }
    });

    return collisions;
  });
  return usedPaths[1]
    .map(collision => {
      const values = collision.split(',');
      return parseInt(globalPath[values[0]][values[1]]) + parseInt(values[2]);
    })
    .sort((a, b) => a - b)[0];
};

module.exports = { part1, part2 };
