const {download_images} = require("./scripts/download-images")
const {screenshot} = require("./scripts/screenshot")

async function start_puppeteer() {
    await screenshot();
    await download_images();
}

module.exports = {
    start_puppeteer
}
