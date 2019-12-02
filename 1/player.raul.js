module.exports = {
	'part1': data => data.reduce((acc, curr) => acc + Math.floor(Number(curr)/3)-2, 0),
	'part2': data => {
		const fn = val => {
			const res = Math.floor(Number(val)/3)-2;
			if (res > 0) return res + fn(res);
			return 0;
		};
		
		/*let result = 0;
		data.forEach(curr => {
			result += fn(curr);
		});
		return result;*/
		
		return data.reduce((acc, curr) => acc + fn(curr), 0);
	},
	'_part2': data => {
		let result = 0;
		
		data.forEach(curr => {
			do {
				curr = Math.floor(Number(curr)/3)-2;
				if (curr > 0) result += curr;
			} while (curr > 0);				
		});
		
		return result;
	}
};
	 