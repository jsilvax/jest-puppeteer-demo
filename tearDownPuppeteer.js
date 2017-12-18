const puppeteer = require('puppeteer');
const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

function rimRaf(DIR){
	return new Promise((resolve, reject) => {
		rimraf(DIR, () => {
			resolve();
		});
	});
}

module.exports = function() {
	return new Promise(async function(resolve, reject){
	    console.log('Teardown Puppeteer Environment.');
	    console.time('pup')
	    await global.browser.close();
	    console.timeEnd('pup')
	    console.time('rimraf');
	   	await rimRaf(DIR);
	   	console.timeEnd('rimraf');
	   	resolve();
	});
}