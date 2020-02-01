const fs = require('fs')
const path = require('path')

const joinjson = (...args) => {
	// Receives local file system directory as arg
	const dir = args[0] || process.argv[2]
	const rawData = getDataFromFiles(dir);
	writeFile(dir, rawData);
}

function getDataFromFiles(dir) {
	// Loads multiple JSON files as strings into a single variable
	const fileNames = fs.readdirSync(dir);
	var data = "[";
	var i = 0;
	console.log("Files joined:");
	fileNames.forEach(fileName => {
		console.log(fileName);
		// Process JSON file only if it's not zero length
		var stats = fs.statSync(`${dir}${fileName}`);
		var fSize = stats["size"];
		if (fSize > 0) {
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