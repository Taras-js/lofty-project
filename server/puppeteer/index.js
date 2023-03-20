const {output_viewport_cookies} = require("./scripts/output_viewport_cookies")
const {screenshot} = require("./scripts/screenshot")
const {download_images} = require("./scripts/download-images")

async function start_puppeteer(msg) {
    const newUrl = msg.content.toString()
    console.log('newUrl:', newUrl)
    await output_viewport_cookies(newUrl)
}

module.exports = {
    start_puppeteer
}
