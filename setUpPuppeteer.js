const puppeteer = require("puppeteer");
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

// const args = process.env.DISABLE_CHROMIUM_SANDBOX ? ["--no-sandbox", "--disable-setuid-sandbox"] : []; // For Travis CI 
const args = true ? ["--no-sandbox", "--disable-setuid-sandbox"] : []; // For Travis CI 
console.log('os temp dir ', os.tmpdir());
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
console.log('DIR ', DIR);

module.exports = async function(){
	console.log('set up HERE');
	const browser = await puppeteer.launch({ headless: true, args });
	this.global.browser = browser;
	console.log('yeh here');
	await mkdirp.sync(DIR);
	await fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};