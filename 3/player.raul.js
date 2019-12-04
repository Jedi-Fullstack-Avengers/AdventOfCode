module.exports = {
	part1: data => {
		const wire1 = {path: data[0], x: 0, y: 0, sibling: null, map: {}};
		const wire2 = {path: data[1], x: 0, y: 0, sibling: null, map: {}};
		const crossings = {}; 
		let closest = null, fewest = null;

		wire1.sibling = wire2;
		wire2.sibling = wire1;
		
		[wire1, wire2].forEach(wire => {
			let steps = 0;
			
			wire.path.forEach(str => {
				const direction = str[0];
				const cells = Number(str.substr(1));
				let incX = (direction === 'R') ? 1 : (direction === 'L' ? -1 : 0);
				let incY = (direction === 'U') ? 1 : (direction === 'D' ? -1 : 0);
				
				for (let i=0; i<cells; i++) {
					wire.x += incX;
					wire.y += incY;
					steps++;
					
					const coords = wire.x + "," + wire.y;
					
					wire.map[coords] = steps;
					
					if (wire.sibling.map[coords]) {
						const distance = Math.abs(wire.x) + Math.abs(wire.y);
						
						if (!crossings[coords]) {
							crossings[coords] = steps + wire.sibling.map[coords];
							
							if (fewest === null || fewest > crossings[coords]) {
								fewest = crossings[coords];
							}
						}												
						
						if (closest === null || closest > distance) closest = distance;					
					}					
				}
			});			
		});
		
		//console.log(Object.keys(crossings).length);
		//console.log(Object.keys(wire1.map).length);
		//console.log(Object.keys(wire1.map).length);
		//console.log("FEWEST = ", fewest);
		return `CLOSEST: ${closest}, FEWEST: ${fewest}`;
	}
};
