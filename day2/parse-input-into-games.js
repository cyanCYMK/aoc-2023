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

exports.parseInputIntoGames = parseInputIntoGames