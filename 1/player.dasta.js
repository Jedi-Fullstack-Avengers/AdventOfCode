const part1 = array => array.reduce((accumulator, current) => accumulator + (Math.floor(current / 3) - 2), 0);
const part2 = array =>
	  array.reduce((accumulator, current) => {
		const result = Math.floor(current / 3) - 2;
		if (result < 6) return accumulator + result;
		return accumulator + result + part2([result]);
	  }, 0);
	  
module.exports = {
	part1, part2
};
	 