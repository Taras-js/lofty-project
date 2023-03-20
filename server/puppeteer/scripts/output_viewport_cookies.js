const puppeteer = require("puppeteer");

async function output_viewport_cookies(newUrl) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(newUrl);
    const viewport = await page.viewport()
    if (viewport) {
        console.log("width:", viewport.width)
        console.log("height:", viewport.height)
    }
    const cookies = await page.cookies()
    if (cookies) {
        console.log("cookies:", cookies)
    }
    await browser.close()
}

module.exports = {
    output_viewport_cookies
}
