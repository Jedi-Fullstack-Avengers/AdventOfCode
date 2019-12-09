
const OP_CODES = {
	"ADD": 1, 
	"MULTIPLY": 2, 
	"INPUT": 3, 
	"OUTPUT": 4,
	"JUMPTRUE": 5,
	"JUMPFALSE": 6,
	"LESSTHAN": 7,
	"EQUALS": 8
};
const PARAM_MODES = {"POSITION": "0", "IMMEDIATE": "1"};
const logger = [];

let inputMethod = null;
let outputCallback = null;

const run = ([...data]) => ([...inputs] = []) => (index = 0) => {
	const opAndModes = data[index].toString();
	const opcode = Number(opAndModes.substr(-2));
	const [mode1, mode2] = [opAndModes.length > 2 ? opAndModes.substr(-3, 1) : "0", opAndModes.length > 3 ? opAndModes.substr(-4, 1) : "0"];
	
	//const initalIdx = index;	
	//console.log(`initalIdx = ${initalIdx} | opAndModes = ${opAndModes} | data = `, data);
	
	if (opcode === OP_CODES.ADD || opcode === OP_CODES.MULTIPLY) {		
		const [param1, param2, paramAddress] = [data[++index], data[++index], data[++index]];
		const [value1, value2, valueAddress] = [
			mode1 		=== PARAM_MODES.POSITION ? data[param1] : param1, 
			mode2 		=== PARAM_MODES.POSITION ? data[param2] : param2, 
			/*modeAddress == PARAM_MODES.POSITION ? data[paramAddress] :*/ paramAddress //the behavior of this param not depends on param mode? :S 
		];
		const total = (opcode === OP_CODES.ADD) ? value1 + value2 : value1 * value2;
		
		//console.log(`value1 = ${value1} | value2 = ${value2} | valueAddress = ${valueAddress} | total = ${total} | mode1 = ${mode1}`);
		
		data[valueAddress] = total;
	} else if (opcode === OP_CODES.INPUT || opcode === OP_CODES.OUTPUT) {
		const param1 = data[++index];
		const value1 = /*(mode1 == PARAM_MODES.POSITION) ? data[param1] :*/ param1; //the behavior of this param not depends on param mode? :S 
		
		if (opcode === OP_CODES.INPUT) {
			data[value1] = inputMethod ? inputMethod() : inputs[0];
			if (inputs.length > 1) inputs.shift();
		} else {
			logger.push(data[value1]);		
			
			if (outputCallback) {
				outputCallback(data, data[value1]);
			}
		}
	} else if (opcode === OP_CODES.JUMPTRUE) {
		const [param1, param2] = [data[index+1], data[index+2]];
		const [value1, value2] = [
			mode1 === PARAM_MODES.POSITION ? data[param1] : param1, 
			mode2 === PARAM_MODES.POSITION ? data[param2] : param2
		];
		
		if (value1 !== 0) {
			index = value2;
		} else {
			index += 3;
		}
	} else if (opcode === OP_CODES.JUMPFALSE) {
		const [param1, param2] = [data[index+1], data[index+2]];
		const [value1, value2] = [
			mode1 === PARAM_MODES.POSITION ? data[param1] : param1, 
			mode2 === PARAM_MODES.POSITION ? data[param2] : param2
		];
		
		if (value1 === 0) {
			index = value2;
		} else {
			index += 3;
		}
	} else if (opcode === OP_CODES.LESSTHAN) {
		const [param1, param2, paramAddress] = [data[++index], data[++index], data[++index]];
		const [value1, value2, valueAddress] = [
			mode1 		=== PARAM_MODES.POSITION ? data[param1] : param1, 
			mode2 		=== PARAM_MODES.POSITION ? data[param2] : param2, 
			/*modeAddress == PARAM_MODES.POSITION ? data[paramAddress] :*/ paramAddress //the behavior of this param not depends on param mode? :S 
		];
		
		if (value1 < value2) {
			data[valueAddress] = 1;
		} else {
			data[valueAddress] = 0;
		}
	} else if (opcode === OP_CODES.EQUALS) {
		const [param1, param2, paramAddress] = [data[++index], data[++index], data[++index]];
		const [value1, value2, valueAddress] = [
			mode1 		=== PARAM_MODES.POSITION ? data[param1] : param1, 
			mode2 		=== PARAM_MODES.POSITION ? data[param2] : param2, 
			/*modeAddress == PARAM_MODES.POSITION ? data[paramAddress] :*/ paramAddress //the behavior of this param not depends on param mode? :S 
		];
		
		if (value1 === value2) {
			data[valueAddress] = 1;
		} else {
			data[valueAddress] = 0;
		}
	} else {
		return `BROKEN at index ${index} with opAndModes ${opAndModes}`;
	}

	if (opcode !== OP_CODES.JUMPTRUE && opcode !== OP_CODES.JUMPFALSE) index++;
	if (!data[index] || data[index] === 99) return logger[logger.length - 1];

	return run(data)(inputs)(index);
};

module.exports = {OP_CODES, PARAM_MODES, logger, run};
