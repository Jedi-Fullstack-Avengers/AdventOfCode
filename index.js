const fs = require('fs');
const chalk = require('chalk');
const challengeDay = process.argv[2];

const { data } = require(`./${challengeDay}/data`);

//Cargar jugadores
const players = {};
const plPattern = 'player.';

fs.readdirSync(`./${challengeDay}/`).forEach(filename => {
	if (filename.indexOf(plPattern) == 0) {		
		const plName = filename.substr(plPattern.length).replace(/\.js/i, '');
		
		players[plName] = require(`./${challengeDay}/${filename}`);
	}
});

const msgLight = chalk.yellow;
const msgTitle = chalk.yellowBright;
//const warning = chalk.keyword('orange');

console.log(msgTitle("\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"));
console.log(msgTitle("RUNNING DAY " + challengeDay));
console.log(msgTitle("Players: "), Object.keys(players));
console.log(msgTitle("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n"));

const challengeParams = process.argv.slice(3);

const testPlayer = playerName => {
	const playerChallenge = players[playerName];
	const solutions = playerChallenge ? Object.keys(players[playerName]) : [];
	
	if (solutions.length > 0) {
		solutions.forEach(fnName => {
			if (fnName.indexOf("_") != 0) { //Las funciones que empiezan por "_" no se ejecutan
				const result = playerChallenge[fnName](data);
				const fullName = playerName + "." + fnName;
				const fillPoints = Array(30 - fullName.length).fill(".").join("");
				
				console.log(fullName + fillPoints + " returned " + msgLight(result));				
			}
		});	
	} else {
		console.log(playerName + " does not have solutions yet :(");
	}
};

console.log(msgLight("\nPLAYER RESULTS:"));
Object.keys(players).forEach(name => testPlayer(name));
//testPlayer("ruben");
//testPlayer("moni");
//testPlayer("raul");
//testPlayer("dani");
