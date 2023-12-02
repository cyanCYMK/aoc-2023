const { getFile } = require('../utility/get-file');
const { parseInputIntoGames } = require('./parse-input-into-games');

function getMinimumNumberOfCubesPerGame(game) {
	let minRed = 0;
	let minGreen = 0;
	let minBlue = 0;
	game.forEach(({ red, green, blue }) => {
		if (red > minRed) minRed = red;
		if (green > minGreen) minGreen = green;
		if (blue > minBlue) minBlue = blue;
	});

	return {
		red: minRed,
		green: minGreen,
		blue: minBlue,
	}
}

function getPowerOfCubesPerCubeSet({red, green, blue}) {
	return red * green * blue;
}

function getPowerOfCubes(games) {
	return games.map(game => getMinimumNumberOfCubesPerGame(game)).map((cubeSet) => getPowerOfCubesPerCubeSet(cubeSet));
}


// actual execution
const games = parseInputIntoGames(getFile('day2/input.txt'));
const powerOfCubes = getPowerOfCubes(games);
const result = powerOfCubes.reduce((sum, power) => {
	return sum + power;
}, 0)
console.log(result)