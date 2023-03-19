const express = require('express');
const cors = require('cors');
const config = require("config");
const path = require("path");
const app = express();
const PORT = config.get("port") || 8000;
app.use(cors());
app.use(express.json());


app.get('/api/code', async (req, res) => {
    try {
        // return res.status(200).json({code});
    } catch (e) {
        // return res.status(500).json({})
    }
})

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'build')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//     })
// }
async function start () {
    try {
        app.listen(PORT, async () => {
            try {
                console.log(`App is started on port ${PORT}...`)
            } catch (error) {
                console.log(`error:`, error);
            }
        });

    } catch (e) {
        console.log("server error", e.message);
        process.exit(1);
    }
}

start();
