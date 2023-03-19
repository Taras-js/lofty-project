const puppeteer = require("puppeteer");
const fs = require("fs")
const https = require("https")

async function download_images() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    let images = await page.evaluate(() => {
        let elements = document.querySelectorAll(".serp-item__thumb")
        return Object.values(elements).map(i => ({
                src: i.src,
                alt: i.alt
            })
        )
    })
    if (images && images.length) {
        console.log("images:", images.length)
        fs.writeFile("data/images.json", JSON.stringify(images, null, ' '), err => {
            if (err) return err;
            console.log("images > img")
        })
        images.forEach((image, index) => {
            const file = fs.createWriteStream(`images/${index}.webp`)
            const reguest = https.get(image.src, response => {
                response.pipe(file)
            })
        })
    }

    await browser.close()

}

module.exports = {
    download_images
}
