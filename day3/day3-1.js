const { getFile } = require('../utility/get-file');

const input = getFile('day3/input.txt');
const rows = input.split('\n');
// assuming symbol if not number or .
const symbolRegex = /[^0-9\.]/g;

/*
 * {
 *   y: {
 *     x: true
 *   }
 * }
*/
const symbolCoordinates = {}
rows.forEach((row, y) => {
	let result;
	let lastIndex = -1;
	if (!symbolCoordinates[y]) symbolCoordinates[y] = {};
	while ((result = symbolRegex.exec(row))) {
		const x = symbolRegex.lastIndex-1;
		symbolCoordinates[y][x] = true;
	}
})

// test coordinates
// for (var y in symbolCoordinates) {
// 	const cols = symbolCoordinates[y];
// 	for (var x in cols) {
// 		console.log(rows[y][x])
// 	}
// }


// get numbers for each row
const numRegex = /[0-9]+/g;
let sum = 0;
rows.forEach((row, y) => {
	let result;
	while ((result = numRegex.exec(row))) {
		const numberStr = result[0];
		const startingXCoord = result.index;
		// see if any symbol touches the number
		// check left and right
		const hasLeft = symbolCoordinates[y]?.[startingXCoord-1]
		const hasRight = symbolCoordinates[y]?.[startingXCoord + numberStr.length]

		// check diags
		const hasDiagonals = symbolCoordinates[y-1]?.[startingXCoord-1] || symbolCoordinates[y-1]?.[startingXCoord+numberStr.length]
			|| symbolCoordinates[y+1]?.[startingXCoord-1] || symbolCoordinates[y+1]?.[startingXCoord+numberStr.length];

		// check up and down
		let hasUpOrDown = false;
		for (var c = 0; c <= numberStr.length - 1; c++) {
			const x = c + startingXCoord;
			if (hasUpOrDown) break;

			if (symbolCoordinates[y-1]?.[x] || symbolCoordinates[y+1]?.[x]) {
				hasUpOrDown = true;
			}
		}


		if (hasLeft || hasRight || hasDiagonals || hasUpOrDown) {
			sum += Number(numberStr);
		}
	}
})

console.log('sum', sum)