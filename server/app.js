const express = require('express');
const cors = require('cors');
const config = require("config");
const {start_puppeteer} = require("./puppeteer")
const app = express();
const PORT = config.get("port") || 8000;
app.use(cors());
app.use(express.json());

(async function(){
    try {
        app.listen(PORT, async () => {
            try {
                console.log(`App is started on port ${PORT}...`)
                await start_puppeteer()
            } catch (error) {
                console.log(`error:`, error);
            }
        });

    } catch (e) {
        console.log("server error", e.message);
        process.exit(1);
    }
})()

