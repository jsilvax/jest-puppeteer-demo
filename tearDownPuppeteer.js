const puppeteer = require('puppeteer');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
    await global.__BROWSER__.close();
   	await rimraf.sync(DIR);
}