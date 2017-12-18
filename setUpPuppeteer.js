const puppeteer = require("puppeteer");
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const args = process.env.DISABLE_CHROMIUM_SANDBOX ? ["--no-sandbox"] : []; // For Travis CI 
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function(){
	const browser = await puppeteer.launch({ headless: true, args });
	global.__BROWSER__ = browser;
	mkdirp.sync(DIR);
	fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};