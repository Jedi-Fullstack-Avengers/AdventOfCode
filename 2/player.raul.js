module.exports = {
	part1: (data, input1 = 12, input2 = 2) => { //CURRIFICACIÓN!
		const process = ([...arr]) => (i = 0) => {
			const [opcode, pos1, pos2, posOuput] = [arr[i], arr[i+1], arr[i+2], arr[i+3]];
			const input1 = arr[pos1], input2 = arr[pos2];
			const total = (opcode === 1) ? (input1 + input2) : (input1 * input2);
			
			arr[posOuput] = total;
			
			if (arr[i+4] && arr[i+4] !== 99) return process(arr)(i+4);
			return arr;
		};
		
		data[1] = input1;
		data[2] = input2;
		
		return process(data)()[0];		
	},
	
	part2: data => {		
		let input1 = 0, input2 = 0, found = false, loops = 0;
		const WANTED = 19690720;
		
		
		do {
			const val = module.exports.part1(data, input1, input2);
			
			//console.log(`${input1}, ${input2} = ${val}`);
			if (val === WANTED) {
				found = true;
			} else {
				if (input1 < 99) input1++;
				else {
					input1 = 0;
					input2++;
				}
			}		
			
			loops++;
		} while (!found && input2 < 100);
		
		if (found) return `${input1}${input2} (${loops} loops)`;
		return `UNABLE! (${loops} loops)`;
	}
};
