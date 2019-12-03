const calulatePath = (i, j, totalSteps) => array => movement => {
  const direction = movement[0];
  const steps = parseInt(movement.substring(1), 10);
  for (let step = 0; step < steps; step++) {
    if (direction === 'R') i++;
    else if (direction === 'L') i--;
    else if (direction === 'U') j++;
    else j--;
    totalSteps++;

    if (array[i] === undefined) array[i] = [];
    array[i][j] = totalSteps;
  }
};

const part1 = input => {
  const path1 = input[0];
  const path2 = input[1];
  const array = [1];
  const doMovement = calulatePath(0, 0, 0)(array);
  path1.forEach(doMovement);

  let i = 0;
  let j = 0;
  const result = path2.reduce((solution, movement) => {
    const direction = movement[0];
    const steps = parseInt(movement.substring(1), 10);
    for (let step = 0; step < steps; step++) {
      if (direction === 'R') i++;
      else if (direction === 'L') i--;
      else if (direction === 'U') j++;
      else j--;

      if (array[i] !== undefined && array[i][j] !== undefined) {
        if (!solution || solution > Math.abs(i) + Math.abs(j)) solution = Math.abs(i) + Math.abs(j);
      }
    }
    return solution;
  }, null);
  return result;
};

const part2 = input => {
  const path1 = input[0];
  const path2 = input[1];
  const array = [1];
  const doMovement = calulatePath(0, 0, 0)(array);
  path1.forEach(doMovement);

  let i = 0;
  let j = 0;
  let mySteps = 0;
  const result = path2.reduce((solution, movement) => {
    const direction = movement[0];
    const steps = parseInt(movement.substring(1), 10);
    for (let step = 0; step < steps; step++) {
      if (direction === 'R') i++;
      else if (direction === 'L') i--;
      else if (direction === 'U') j++;
      else j--;
      mySteps++;
      if (array[i] !== undefined && array[i][j] !== undefined) {
        if (!solution || mySteps + array[i][j] < solution) solution = mySteps + array[i][j];
      }
    }
    return solution;
  }, null);
  return result;
};

module.exports = { part1, part2 };
