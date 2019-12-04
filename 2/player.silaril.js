'use strict';

function runIntcodeProgram(passedMemory, noun, verb) {
  let memory = JSON.parse((JSON.stringify(passedMemory)));
  memory[1] = noun;
  memory[2] = verb;

  for (let instructionPointer = 0; instructionPointer <= memory.length; instructionPointer += 4) {
    const opcode = memory[instructionPointer];
    const address1 = memory[instructionPointer + 1];
    const address2 = memory[instructionPointer + 2];
    const addressDestination = memory[instructionPointer + 3];
    switch (opcode) {
      case 1:
        memory[addressDestination] = memory[address1] + memory[address2];
        break;
      case 2:
        memory[addressDestination] = memory[address1] * memory[address2];
        break;
      case 99:
        return memory[0];
    }
  }
}

// Part 1
// ======

const part1 = input => {
  let initialMemory = input.map(Number);

  return runIntcodeProgram(initialMemory, 12, 2);
};

// Part 2
// ======

const part2 = input => {
  const expectedOutput = 19690720;
  let initialMemory = input.map(Number);
  let actualOutput;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      actualOutput = runIntcodeProgram(initialMemory, noun, verb);
      if (actualOutput === expectedOutput) {
        return 100 * noun + verb;
      }
    }
  }
  return "I couldn't find a solution for you :("
};

module.exports = {part1, part2};
