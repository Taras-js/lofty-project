const {Pool, Client} = require('pg')
require('dotenv').config();
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    connectionLimit: 10,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE
})
const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const createDatabase = async () => {
    try {
        await client.connect();
        await client.query(`CREATE DATABASE lofty`);
        return true;
    } catch (error) {
        // console.error(error.stack);
        // console.log('Database not created');
        return false;

    } finally {
        await client.end();
    }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database lofty created...');
    }
})
const createTableUrl = "create TABLE lofty_urls(id SERIAL PRIMARY KEY, url_address TEXT, width INTEGER, height INTEGER, created TIMESTAMP)"
const createTableCookies = "create TABLE lofty_cookies(\n" +
    "    id SERIAL PRIMARY KEY,\n" +
    "    name_cookies VARCHAR(255),\n" +
    "    value_cookies TEXT,\n" +
    "    domain VARCHAR(255),\n" +
    "    path_cookies VARCHAR(255),\n" +
    "    expires REAL,\n" +
    "    size INTEGER,\n" +
    "    http_only BOOLEAN,\n" +
    "    secure BOOLEAN,\n" +
    "    session_cookies BOOLEAN,\n" +
    "    same_site VARCHAR(20),\n" +
    "    same_party BOOLEAN,\n" +
    "    source_scheme VARCHAR(20),\n" +
    "    source_port INTEGER,\n" +
    "    url_id INTEGER,\n" +
    "    FOREIGN KEY (url_id) REFERENCES lofty_urls (id)\n" +
    ")"
setTimeout(() => {
    pool.query(createTableUrl, (err, res) => {

        if(err){
            return err
        } else {
            console.log(`Table lofty_urls created...`)
        }
    })
}, 1000)
setTimeout(() => {
    pool.query(createTableCookies, (err, res) => {
        if(err){
            return err
        } else {
            console.log('Table lofty_cookies created...');
        }
    })
}, 3000)


module.exports = {pool: pool}


