const puppeteer = require("puppeteer");
async function screenshot_my_site () {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://taras-server.ru");

    await page.waitForSelector(".section");
    await page.click('.burger__menu');
    await page.setViewport({
        width: 1600,
        height: 1000
    })
    await page.click('.button')
    // ".MMImage-Origin"
    await page.waitForSelector('.section');
    // Screenshot
    await page.screenshot({path: "screenshots/two.png"});
    // Pdf
    await page.pdf({path: "screenshots/two.pdf"});


    await browser.close()
}
module.exports = {
    screenshot_my_site
}
