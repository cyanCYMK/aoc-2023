const { parseInputIntoGames } = require('./parse-input-into-games');
const { getFile } = require('../utility/get-file');

const AVAILABLE_CUBES = {
	red: 12,
	green: 13,
	blue: 14,
};


function isValidGameWithAvailableCubes(game) {
	const hasAnyInvalidRounds = game.some((round) => {
		const {red, green, blue} = round
		if (Number.isInteger(red) && red > AVAILABLE_CUBES.red) return true;
		if (Number.isInteger(green) && green > AVAILABLE_CUBES.green) return true;
		if (Number.isInteger(blue) && blue > AVAILABLE_CUBES.blue) return true;
		return false;
	})

	return !hasAnyInvalidRounds;
}

function getSumOfValidGameIds(games) {
	return games.reduce((sum, game, index) => {
		if (isValidGameWithAvailableCubes(game)) {
			const gameId = index + 1
			return sum + gameId;
		}
		return sum;
	}, 0)
}

// actual execution
const games = parseInputIntoGames(getFile('day2/input.txt'));
const result = getSumOfValidGameIds(games);
console.log(result);
