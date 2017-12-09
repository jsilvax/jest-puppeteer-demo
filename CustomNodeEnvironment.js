const puppeteer = require("puppeteer");
const NodeEnvironment = require("jest-environment-node");
const args = process.env.DISABLE_CHROMIUM_SANDBOX ? ["--no-sandbox"] : []; // For Travis CI 

/**
 * @class CustomNodeEnvironment
 * @description A custom Node Environment that sets up, and tearsdown puppeteer
 */
class CustomNodeEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
    }

    async setUpPuppeteer() {
        this.browser = await puppeteer.launch({ headless: true, args });
        this.global.page = await this.browser.newPage();
    }
    async tearDownPuppeteer() {
        this.browser.close();
        delete this.global.page;
    }
    async setup() {
        await super.setup();
        await this.setUpPuppeteer();
    }
    async teardown() {
        await this.tearDownPuppeteer();
        await super.teardown();
    }
}
module.exports = CustomNodeEnvironment;
