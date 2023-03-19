const puppeteer = require("puppeteer");
async function start_puppeteer () {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://yandex.ru/images/search?text=%D0%B7%D0%B2%D0%B5%D1%80%D0%B8");

    await page.waitForSelector('.serp-item__link');
    await page.click('.serp-item__link');
    await page.setViewport({
        width: 1200,
        height: 800
    })
    // ".MMImage-Origin"
    await page.waitForSelector('.MMImage-Origin');
    await page.screenshot({path: "screenshots/one.png"})
}
module.exports = {
    start_puppeteer
}
