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

exports.getFile = getFile;