import waitForResponse from '../helpers/waitForResponse';

let page;

beforeAll(async () => {
    page = await browser.newPage();
});

afterAll(async () => {
    await page.close();
});

test('should lazy load new list items', async () => {
        const selector = '[data-hook="dynamic-list"]';
        const firstDynamicEl = `${selector} > div:nth-child(21)`;
        const requestUrl = 'http://m.eonline.com/us/category/dynamicList/lady_gaga/json?page=2&pageSize=20';
        const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25';

        // Emulate an iPhone
        await page.emulate({
            viewport: {
                width: 375,
                height: 667,
                isMobile: true
            },
            userAgent
        });

        await page.goto('http://m.eonline.com/news/lady_gaga', {
            waitUntil: 'domcontentloaded'
        });

        // Get the initial number of list elements
        const numOfItems = await page.$eval(selector, el => el.children.length);

        // Scroll to the bottom of the page
        await page.evaluate(() => {
            window.scrollTo(0, document.querySelector('footer').offsetTop);
        });

        let { data } = await waitForResponse(page, requestUrl);

        // Wait for the 21st list element to dynamically be inserted
        await page.waitForSelector(firstDynamicEl);

        // Get the new number of lazyloaded items in the list
        const numWithLazyLoadedItems = await page.$eval(selector, el => el.children.length);

        // Grab the href of the 21st list element's link
        const href = await page.$eval(`${firstDynamicEl} a`, el => el.href);

        // Make assertions
        expect.assertions(2);
        expect(numWithLazyLoadedItems).toBeGreaterThan(numOfItems);
        expect(href).toContain(data[0].uri);
    },
    10000
);
