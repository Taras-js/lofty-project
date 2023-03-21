const puppeteer = require("puppeteer");
const {pool} = require("./../../settings/database")
const moment = require("moment")

async function output_viewport_cookies(newUrl) {

    if (newUrl.includes("https://")) {
        const yesterday = moment().subtract(1, "day")
        const findOne = "SELECT url_address, created FROM lofty_urls " +
            "WHERE url_address = $1 AND DATE(created) > $2"
        const unique = await pool.query(findOne, [newUrl, yesterday])
        // console.log("unique:", unique)
        if (unique.rowCount > 0) {
            console.log(`Данный url(${newUrl}) уже использовался сегодня!`)
        } else {


            const browser = await puppeteer.launch({
                headless: true,
                executablePath: '/usr/bin/chromium-browser',
                args: [
                    '--no-sandbox',
                    '--disable-gpu',
                ]
            });
            console.log('Opening the browser...');
            const page = await browser.newPage();
            await page.goto(newUrl, { waitUntil: 'load' });
            let id
            const created = moment().format()
            const viewport = await page.viewport()
            if (viewport) {
                console.log("width:", viewport.width)
                console.log("height:", viewport.height)
                const insertData = "INSERT INTO lofty_urls(" +
                    "url_address, " +
                    "width, height, " +
                    "created) values($1, $2, $3, $4) RETURNING *"
                const url = await pool.query(insertData, [
                    newUrl,
                    viewport.width,
                    viewport.height,
                    created
                ])
                // console.log('insertData:', url.rows[0])
                id = url.rows[0].id
            }
            const cookies = await page.cookies()
            if (cookies) {
                console.log("cookies:", cookies)
                if (cookies.length) {
                    cookies.map(async i => {
                        const insertData = "INSERT INTO lofty_cookies(" +
                            "name_cookies, " +
                            "value_cookies, " +
                            "domain, " +
                            "path_cookies, " +
                            "expires, " +
                            "size, " +
                            "http_only, " +
                            "secure, " +
                            "session_cookies, " +
                            "same_site, " +
                            "same_party, " +
                            "source_scheme, " +
                            "source_port, " +
                            "url_id" +
                            ") values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) " +
                            "RETURNING *"
                        await pool.query(insertData, [
                            i.name,
                            i.value,
                            i.domain,
                            i.path,
                            i.expires,
                            i.size,
                            i.httpOnly,
                            i.secure,
                            i.session,
                            i.sameSite,
                            i.sameParty,
                            i.sourceScheme,
                            i.sourcePort || 443,
                            id
                        ])
                    })
                }
            }
            await page.close();
            await browser.close()
        }
    } else {
        console.log(`Отправленный адрес(${newUrl}) не соответствует требованиям к url!`)
    }
}

module.exports = {
    output_viewport_cookies
}
