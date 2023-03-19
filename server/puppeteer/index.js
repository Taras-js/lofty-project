const {download_images} = require("./scripts/download-images")
const {screenshot} = require("./scripts/screenshot")
const {screenshot_my_site} = require("./scripts/scrrenshot-my-site")
async function start_puppeteer() {
    // await screenshot();
    // await download_images();
    await screenshot_my_site();
}

module.exports = {
    start_puppeteer
}
