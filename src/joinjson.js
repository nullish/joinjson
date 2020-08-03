const fs = require('fs')
const path = require('path')

/* **
	* @param {string} dir - directory of JSON files
	* @param {boolean} writeout - TRUE if output should be written to a file.

*/
const joinjson = (...args) => {
	// Joins multiple JSON files into a single JSON fomrat string. Optionally written to a file.
	const dir = args[0] || process.argv[2]
	const rawData = getDataFromFiles(dir);
	// Act on argument to suppress file output
	if (args[1] || process.argv[2]) {
		writeFile(dir, rawData);
	}
	return JSON.parse(rawData);
}

function getDataFromFiles(dir) {
	// Loads multiple JSON files as strings into a single variable
	const fileNames = fs.readdirSync(dir);
	var data = "[";
	var i = 0;
	console.log("Files joined:");
	fileNames.forEach(fileName => {
		
		// Process JSON file only if it's not zero length
		var stats = fs.statSync(`${dir}${fileName}`);
		var fSize = stats["size"];
		if (fSize > 0 && fileName.match(/\.json$/g)) {
			console.log(fileName);
			var fileContents = JSON.parse(fs.readFileSync(`${dir}${fileName}`));
			var jString = JSON.stringify(fileContents);
			var jObj = `${jString},`;
			data += jObj;
		}
		i++;
	});
	// fix closing syntax
	data = data.replace(/,$/g, "]");
	return data;
}

function writeFile (dir, manifest) {
	// Receives a string and writes it to file in local file system
	const fileName = 'manifest.json'
	const filePath = path.join(dir, fileName)
	fs.writeFileSync(filePath, manifest)
}

module.exports = joinjson