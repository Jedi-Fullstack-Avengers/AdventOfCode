class IntCode {
  constructor({ ...cfg } = {}) {
    this.OP_CODES = cfg.OP_CODES || {
      ADD: 1,
      MULTIPLY: 2,
      INPUT: 3,
      OUTPUT: 4,
      JUMPTRUE: 5,
      JUMPFALSE: 6,
      LESSTHAN: 7,
      EQUALS: 8
    };
    this.PARAM_MODES = cfg.PARAM_MODES || { POSITION: '0', IMMEDIATE: '1' };
    this.data = cfg.data ? [...cfg.data] : [];
    this.inputs = cfg.inputs ? [...cfg.inputs] : [];
    this.outputs = cfg.outputs ? [...cfg.outputs] : [];
    this.inputMethod = cfg.inputMethod || null;
    this.onOutput = cfg.onOutput || null;
    this.onEnd = cfg.onEnd || null;
    this.id = cfg.id || new Date().getTime();

    this.init();
    //console.log("new IntCode");
  }

  init() {
    this.index = 0;
    this.status = 'OFF'; //ON, OFF, END, WAITING_READ, PAUSED
  }

  run() {
    //console.log(`RUN ${this.id} > index = ${this.index} | status = ${this.status} | input = ${this.inputs[0]} | instruction = ${this.data[this.index]}`);

    if (this.status === 'OFF' || (this.status === 'WAITING_READ' && this.inputs.length > 0)) {
      this.status = 'ON';
    } else if (this.status !== 'ON') {
      //console.log(`-- RETURN status = ${this.status} for ${this.id}`);
      return this.status;
    }

    const data = this.data;
    const OP_CODES = this.OP_CODES;
    const PARAM_MODES = this.PARAM_MODES;
    const opAndModes = data[this.index].toString();
    const opcode = Number(opAndModes.substr(-2));
    const [mode1, mode2] = [
      opAndModes.length > 2 ? opAndModes.substr(-3, 1) : '0',
      opAndModes.length > 3 ? opAndModes.substr(-4, 1) : '0'
    ];

    //const initalIdx = this.index;
    //console.log(`initalIdx = ${initalIdx} | opAndModes = ${opAndModes} | data = `, data);

    if (opcode === OP_CODES.ADD || opcode === OP_CODES.MULTIPLY) {
      const [param1, param2, paramAddress] = [
        data[++this.index],
        data[++this.index],
        data[++this.index]
      ];
      const [value1, value2, valueAddress] = [
        mode1 === PARAM_MODES.POSITION ? data[param1] : param1,
        mode2 === PARAM_MODES.POSITION ? data[param2] : param2,
        //the behavior of this param not depends on param mode? :S
        paramAddress //modeAddress == PARAM_MODES.POSITION ? data[paramAddress] : paramAddress
      ];
      const total = opcode === OP_CODES.ADD ? value1 + value2 : value1 * value2;

      //console.log(`value1 = ${value1} | value2 = ${value2} | valueAddress = ${valueAddress} | total = ${total} | mode1 = ${mode1}`);

      data[valueAddress] = total;
    } else if (opcode === OP_CODES.INPUT || opcode === OP_CODES.OUTPUT) {
      const param1 = data[this.index + 1];
      //the behavior of this param not depends on param mode? :S
      const value1 = param1; //(mode1 == PARAM_MODES.POSITION) ? data[param1] : param1;

      if (opcode === OP_CODES.INPUT) {
        //console.log(`READ this.index = ${this.index} | this.inputs[0] = ${this.inputs[0]}`);
        if (this.inputs.length === 0 && this.inputMethod) this.inputs.push(this.inputMethod(this));

        if (this.inputs.length > 0) {
          data[value1] = this.inputs.shift();
          this.index++;
        } else {
          this.status = 'WAITING_READ';
        }
      } else {
        this.outputs.push(data[value1]);

        this.index++;

        if (this.onOutput) {
          this.onOutput(this, data[value1]);
        }
      }
    } else if (opcode === OP_CODES.JUMPTRUE) {
      const [param1, param2] = [data[this.index + 1], data[this.index + 2]];
      const [value1, value2] = [
        mode1 === PARAM_MODES.POSITION ? data[param1] : param1,
        mode2 === PARAM_MODES.POSITION ? data[param2] : param2
      ];

      if (value1 !== 0) {
        this.index = value2;
      } else {
        this.index += 3;
      }
    } else if (opcode === OP_CODES.JUMPFALSE) {
      const [param1, param2] = [data[this.index + 1], data[this.index + 2]];
      const [value1, value2] = [
        mode1 === PARAM_MODES.POSITION ? data[param1] : param1,
        mode2 === PARAM_MODES.POSITION ? data[param2] : param2
      ];

      if (value1 === 0) {
        this.index = value2;
      } else {
        this.index += 3;
      }
    } else if (opcode === OP_CODES.LESSTHAN) {
      const [param1, param2, paramAddress] = [
        data[++this.index],
        data[++this.index],
        data[++this.index]
      ];
      const [value1, value2, valueAddress] = [
        mode1 === PARAM_MODES.POSITION ? data[param1] : param1,
        mode2 === PARAM_MODES.POSITION ? data[param2] : param2,
        //the behavior of this param not depends on param mode? :S
        paramAddress //modeAddress == PARAM_MODES.POSITION ? data[paramAddress] : paramAddress
      ];

      if (value1 < value2) {
        data[valueAddress] = 1;
      } else {
        data[valueAddress] = 0;
      }
    } else if (opcode === OP_CODES.EQUALS) {
      const [param1, param2, paramAddress] = [
        data[++this.index],
        data[++this.index],
        data[++this.index]
      ];
      const [value1, value2, valueAddress] = [
        mode1 === PARAM_MODES.POSITION ? data[param1] : param1,
        mode2 === PARAM_MODES.POSITION ? data[param2] : param2,
        //the behavior of this param not depends on param mode? :S
        paramAddress //modeAddress == PARAM_MODES.POSITION ? data[paramAddress] : paramAddress
      ];

      if (value1 === value2) {
        data[valueAddress] = 1;
      } else {
        data[valueAddress] = 0;
      }
    } else {
      return `BROKEN at index ${this.index} with opAndModes ${opAndModes}`;
    }

    if (opcode !== OP_CODES.JUMPTRUE && opcode !== OP_CODES.JUMPFALSE) {
      this.index++;
    }

    if (data[this.index] === undefined || data[this.index] === 99) {
      const lastOutput = this.outputs.length > 0 ? this.outputs[this.outputs.length - 1] : null;

      this.status = 'END';
      //console.log("INTCODE END WITH VAL: ", lastOutput);
      if (this.onEnd) this.onEnd(this, lastOutput);

      return lastOutput;
    }

    return this.run();
  }
}

module.exports = IntCode;
