module.exports = {
	part1: (data, onlyDouble = false) => {
		const results = [];
		
		for (let num = data[0]; num <= data[1]; num++) {
			const str = String(num);
			let twiceOk = false; //(str.search(/(.)\1/) >= 0);
			let increaseOk = true;
			
			if (str.length === 6) {
				let min = 0, i = 0;
				
				do {					
					if (!twiceOk) {
						const rx2 = new RegExp(str[i].repeat(2), "g");
						const pos2 = str.search(rx2);
						
						if (onlyDouble) {
							const rx3 = new RegExp(str[i].repeat(3), "g");
							const pos3 = str.search(rx3);
							
							twiceOk = (pos2 >= 0 && pos2 != pos3);
						} else {
							twiceOk = (pos2 >= 0);
						}
					}
					
					if (Number(str[i]) >= min) {
						min = Number(str[i]);
					} else {
						increaseOk = false;
					}
					
					i++;
				} while(i < str.length && increaseOk);
				
				//console.log(num, twiceOk, increaseOk);
				if (twiceOk && increaseOk) results.push(num);
			}			
		}
		
		console.log(results);
		return results.length;
	},
	
	part2: data => {
		return module.exports.part1(data, true);
	}
};
