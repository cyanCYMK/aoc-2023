const fs = require('fs'), path = require('path');

// Gets input txt file as string
function getFile(relativeFilePath) {
	const filePath = path.join(__dirname, relativeFilePath);
	const fileContents = fs.readFileSync(relativeFilePath, {encoding: 'utf8'}, (err, data) => {
		if (err) {
			console.error(err);
			return;
		};
	})
	return fileContents;
}

function parseInputIntoGames(input) {
	return input.split('\n').map((gameInput) => {
		const game = gameInput.replace(/Game [0-9]+: /, '').split(';')

		return game.map(round => {
			const red = Number(round.match(/([0-9]+) red/)?.[1]);
			const green = Number(round.match(/([0-9]+) green/)?.[1]);
			const blue = Number(round.match(/([0-9]+) blue/)?.[1]);

			return {
				red,
				green,
				blue,
			};
		}).filter(({red, green, blue}) => red || green || blue)
	}).filter(game => game.length)
}

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
