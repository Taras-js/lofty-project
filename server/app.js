const express = require('express');
const cors = require('cors');
const config = require("config");
const {url_addresses} = require("./queue/url_addresses")
require('dotenv').config();
const app = express();
const PORT = config.get("port") || 8000;
const routes = require("./settings/routes");
routes(app);
app.use(cors());
app.use(express.json());

(async function(){
    try {
        app.listen(PORT, async () => {
            try {
                await url_addresses()
                console.log(`App is started on port ${PORT}...`)
            } catch (error) {
                console.log(`error:`, error);
            }
        });

    } catch (e) {
        console.log("server error", e.message);
        process.exit(1);
    }
})()

