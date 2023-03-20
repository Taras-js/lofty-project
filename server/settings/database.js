const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "root",
    connectionLimit: 10,
    host: "localhost",
    port: 5434,

    database: "districtsDB"
})

module.exports = pool


