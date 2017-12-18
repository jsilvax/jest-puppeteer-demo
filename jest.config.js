const path = require('path');

module.exports = {
	"globalSetup": path.join(__dirname, "/setUpPuppeteer.js"),
	"globalTeardown": path.join(__dirname, "/tearDownPuppeteer.js"),
	"testEnvironment": "./CustomNodeEnvironment.js"
};