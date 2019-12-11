const IntCode = require('../5/raul.IntCode.js');

const part1 = data => {
  const phaseSettings = permutation([0, 1, 2, 3, 4]);
  let maxSignal = 0;

  phaseSettings.forEach(phases => {
    let signal = 0;

    phases.forEach(phase => {
      const intCode = new IntCode({ data: data, inputs: [phase, signal] });
      signal = intCode.run();
    });

    if (signal > maxSignal) maxSignal = signal;
  });

  return maxSignal;
};

const part2 = data => {
  const phaseOptions = [5, 6, 7, 8, 9];
  const phaseSettings = permutation(phaseOptions); //[phaseOptions];
  const intCodes = [];
  let pending = phaseSettings.length * phaseOptions.length;
  let maxSignal = 0;

  phaseSettings.forEach((phases, i) => {
    let signal = 0;

    intCodes[i] = [];

    phases.forEach((phase, j) => {
      intCodes[i][j] = new IntCode({
        id: `ROBOT-${i}-${j}`,
        data: data,
        inputs: j === 0 ? [phase, 0] : [phase],
        onOutput: function(obj, val) {
          const jNext = this.jVal + 1 === phaseOptions.length ? 0 : this.jVal + 1;
          const intCodeNext = intCodes[this.iVal][jNext];

          //console.log(`OUTPUT ${val} OF ${obj.id} INSERTED IN ${intCodeNext.id}`);
          obj.status = 'PAUSED';
          intCodeNext.inputs.push(val);

          if (
            intCodeNext.status === 'OFF' ||
            intCodeNext.status === 'WAITING_READ' ||
            intCodeNext.status === 'PAUSED'
          ) {
            intCodeNext.status = 'ON';
            intCodeNext.run();
          }
        }.bind({ iVal: i, jVal: j }),
        onEnd: function(obj, lastOutput) {
          if (this.jVal + 1 === phaseOptions.length) {
            if (lastOutput > maxSignal) maxSignal = lastOutput;
          }

          //console.log(`END ${obj.id}`);
          if (--pending === 0) {
            //console.log("maxSignal = ", maxSignal);
          }
        }.bind({ iVal: i, jVal: j })
      });
    });
  });

  phaseSettings.forEach((phases, i) => {
    intCodes[i][0].run();
  });

  return maxSignal;
};

const permutation = array => {
  const innerPermutation = (array, temp) => {
    if (!array.length) result.push(temp);
    for (let i = 0; i < array.length; i++) {
      const x = array.splice(i, 1)[0];
      innerPermutation(array, temp.concat(x));
      array.splice(i, 0, x);
    }
  };

  const result = [];
  innerPermutation(array, []);
  return result;
};

module.exports = { part1, part2 };
