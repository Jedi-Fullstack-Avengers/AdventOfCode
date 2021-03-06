const getOpCodeAndMode = op => {
  const opCode = op.length == 1 ? 0 + op : op[op.length - 2] + op[op.length - 1];
  const mode = op.substring(0, op.length - 2);
  const result = [
    opCode,
    mode
      .split('')
      .reverse()
      .join('')
  ];
  //console.log(`Op ${result} from ${op}`);
  return result;
};

const singleMovement = (magicInput, array, position) => {
  array[position] = magicInput;
};

const suma = a => b => (array, position) => {
  //console.log(`suma: a ${a}, b ${b}, position ${position}`);
  array[position] = a + b;
  //console.log(array[position]);
};

const multi = a => b => (array, position) => {
  //console.log(`multi: a ${a}, b ${b}, position ${position}`);
  array[position] = a * b;
  //console.log(array[position]);
};

const part1 = input => {
  const magicInput = 1;
  let finalResult;
  for (let i = 0; i < input.length; i++) {
    const op = getOpCodeAndMode(input[i].toString());
    //console.log('TCL: op', op);
    if (op[0] == '99') break;

    if (op[0] === '01' || op[0] === '02') {
      let calculo = op[0] === '01' ? suma : multi;
      for (let index = 0; index < 2; index++) {
        let mode = parseInt(op[1][index]);
        let operand = mode ? input[(i += 1)] : input[input[(i += 1)]];
        calculo = calculo(operand);
      }
      calculo(input, input[(i += 1)]);
    }

    if (op[0] === '03') singleMovement(magicInput, input, input[(i += 1)]);
    if (op[0] === '04')
      console.log(
        op[1][0] ? (finalResult = input[(i += 1)]) : (finalResult = input[input[(i += 1)]])
      );
    //console.log(input);
  }
  return finalResult;
};

const part2 = input => {
  const magicInput = 5;
  let finalResult;
  for (let i = 0; i < input.length; i++) {
    const op = getOpCodeAndMode(input[i].toString());
    //console.log('TCL: op', op);
    if (op[0] == '99') break;

    if (op[0] === '01' || op[0] === '02') {
      let calculo = op[0] === '01' ? suma : multi;
      for (let index = 0; index < 2; index++) {
        let mode = parseInt(op[1][index]);
        let operand = mode ? input[(i += 1)] : input[input[(i += 1)]];
        calculo = calculo(operand);
      }
      calculo(input, input[(i += 1)]);
    }

    if (op[0] === '03') singleMovement(magicInput, input, input[(i += 1)]);
    if (op[0] === '04')
      console.log(
        op[1][0] ? (finalResult = input[(i += 1)]) : (finalResult = input[input[(i += 1)]])
      );

    if (op[0] === '05') {
      let mode1 = parseInt(op[1][0]);
      let mode2 = parseInt(op[1][1]);
      let firstParameter = mode1 ? input[(i += 1)] : input[input[(i += 1)]];
      i = firstParameter ? (mode2 ? input[(i += 1)] : input[input[(i += 1)]]) - 1 : i + 1;
      //console.log(`Jumped to ${i} ${input[i + 1]}`);
    }

    if (op[0] === '06') {
      let mode1 = parseInt(op[1][0]);
      let mode2 = parseInt(op[1][1]);
      let firstParameter = mode1 ? input[(i += 1)] : input[input[(i += 1)]];
      i = !firstParameter ? (mode2 ? input[(i += 1)] : input[input[(i += 1)]]) - 1 : i + 1;
      //console.log(`Jumped to ${i} ${input[i + 1]}`);
    }

    if (op[0] === '07' || op[0] === '08') {
      let mode1 = parseInt(op[1][0]);
      let mode2 = parseInt(op[1][1]);
      let mode3 = parseInt(op[1][3]);
      let firstParameter = mode1 ? input[(i += 1)] : input[input[(i += 1)]];
      let secondParameter = mode2 ? input[(i += 1)] : input[input[(i += 1)]];
      let thirdParameter = mode3 ? input[(i += 1)] : input[input[(i += 1)]];
      if (op[0] === '07')
        firstParameter < secondParameter
          ? (input[thirdParameter] = 1)
          : (input[thirdParameter] = 0);
      if (op[0] === '08')
        firstParameter == secondParameter
          ? (input[thirdParameter] = 1)
          : (input[thirdParameter] = 0);
    }
    //console.log(input);
  }
  return finalResult;
};

module.exports = { part1, part2 };
