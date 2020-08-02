// Simple demo of joinjson routine
const joinjson = require('./src/joinjson')

const jsonOutput = joinjson("./tmp/reports/", true);
console.log(jsonOutput);