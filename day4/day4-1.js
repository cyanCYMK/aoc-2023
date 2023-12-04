const { getFile } = require('../utility/get-file');
const rawInput = getFile('day4/input.txt');
const rows = rawInput.split('\n').filter(row => !!row).map(row => row.split(': ')[1].split(' | ').map(num => num.split(' ').filter(cell => !!cell)))

let pointsTotal = 0;
rows.forEach(row => {
	let gamePoints = 0;
	let hasAtLeast1Match = false;
	const winningNumbers = row[0];
	const numbersInHand = row[1];
	numbersInHand.forEach(number => {
		if (winningNumbers.includes(number)) {
			if (hasAtLeast1Match) {
				gamePoints *= 2;
			} else {
				hasAtLeast1Match = true;
				gamePoints = 1;
			}
		}
	})
	pointsTotal += gamePoints;
})

console.log('sum', pointsTotal)