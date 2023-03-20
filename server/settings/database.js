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

// const createDatabase = async () => {
//     try {
//         await client.connect();
//         await client.query(`CREATE DATABASE lofty2`);
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await client.end();
//     }
// };
//
// createDatabase().then((result) => {
//     if (result) {
//         console.log('Database created');
//     }
// })
const createTableUrl = "create TABLE update(id SERIAL PRIMARY KEY,url_address TEXT, width INTEGER, height INTEGER, created TIMESTAMP)"
const createTableCookies = "create TABLE cookies_update(\n" +
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
    "    FOREIGN KEY (url_id) REFERENCES update (id)\n" +
    ")"

// pool.query(createTableUrl, (err, res) => {
//
//     if(err){
//         return err
//     } else {
//         console.log(res)
//     }
//     pool.end()
// })
// pool.query(createTableCookies, (err, res) => {
//     if(err){
//         return err
//     } else {
//         console.log(res)
//     }
//     pool.end()
// })

// connection.connect((error) => {
//   if (error) {
//     return console.log("Error connecting to database mySql");
//   } else {
//     // plotsJson.features.map(item => {
//     //   if(item.geometry.coordinates[1] !== undefined) {
//     //     const element = item.geometry.coordinates[0]
//     //     const element2 = item.geometry.coordinates[1]
//     //     const firstPolygon = element.flat(1).map(i => i.join(' '))
//     //     const twoPolygon = element2.flat(1).map(i => i.join(' '))
//     //     connection.query("INSERT INTO `geoplots`(`id`, `bbl`, `coord`, `shape_area`)  " +
//     //       "VALUES(NULL, '" +item.properties.bbl + "', " +
//     //       "ST_GeomFromText('MULTIPOLYGON(((" + firstPolygon + "),(" + twoPolygon + ")))',4326), 0)")
//     //     }
//     //       else if(item.geometry.coordinates.flat(2)[0] !== item.geometry.coordinates.flat(2)[item.geometry.coordinates.flat(2).length - 1])
//     //    {
//     //     let element = item.geometry.coordinates.flat(2)
//     //       const firstElement = item.geometry.coordinates.flat(2)[0]
//     //      element.push(firstElement)
//     //       const firstPolygon = element.map(i => i.join(' '))
//     //   connection.query("INSERT INTO `geoplots`(`id`, `bbl`, `coord`, `shape_area`)  " +
//     //         "VALUES(NULL, '" +item.properties.bbl + "', " +
//     //     "ST_GeomFromText('MULTIPOLYGON(((" + firstPolygon + ")))',4326), 0)")
//     //   }
//     //         })
//     // districtsJson.features.map(item => {
//     //   if(item.geometry.coordinates[1] !== undefined) {
//     //     const element = item.geometry.coordinates[0]
//     //     const element2 = item.geometry.coordinates[1]
//     //     const sql = "SELECT SUM(MBRContains(geodistricts.coordinates, geoplots.coord)) AS sum FROM geodistricts, geoplots WHERE id === geodistricts.id GROUP BY geodistricts.id";
//     //     const firstPolygon = element.flat(1).map(i => i.join(' '))
//     //     const twoPolygon = element2.flat(1).map(i => i.join(' '))
//     //     connection.query("INSERT INTO `geodistricts`(`id`, `ntacode`, `shape_area`, " +
//     //       "`county_fips`, `ntaname`, `shape_leng`, `boro_name`, `boro_code`, `coordinates`)  " +
//     //       "VALUES(NULL, '" + item.properties.ntacode + "'," +
//     //       "'" + item.properties.shape_area + "'," +
//     //       "'" + item.properties.county_fips + "'," +
//     //       "\'" + item.properties.ntaname.replace(/'/g) + "'\,  " +
//     //       "'" + item.properties.shape_leng + "'," +
//     //       "'" + item.properties.boro_name + "'," +
//     //       "'" + item.properties.boro_code + "'," +
//     // //       "(SELECT COUNT(*) FROM geodistricts  JOIN geoplots WHERE ST_Contains(geodistricts.coordinates, geoplots.coord))," +
//     //       "ST_GeomFromText('MULTIPOLYGON(((" + firstPolygon + "),(" + twoPolygon + ")))',4326))")
//     //     }
//     //       else if(item.geometry.coordinates.flat(2)[0] !== item.geometry.coordinates.flat(2)[item.geometry.coordinates.flat(2).length - 1])
//     //    {
//     //     let element = item.geometry.coordinates.flat(2)
//     //       const firstElement = item.geometry.coordinates.flat(2)[0]
//     //      element.push(firstElement)
//     // //      const sql = "SELECT SUM(MBRContains(geodistricts.coordinates, geoplots.coord)) AS sum FROM geodistricts, geoplots GROUP BY geodistricts.id";
//     // //
//     //      const firstPolygon = element.map(i => i.join(' '))
//     //      connection.query("INSERT INTO `geodistricts`(`id`, `ntacode`, `shape_area`, " +
//     //        "`county_fips`, `ntaname`, `shape_leng`, `boro_name`, `boro_code`, `coordinates`)  " +
//     //        "VALUES(NULL, '" + item.properties.ntacode + "'," +
//     //        "'" + item.properties.shape_area + "'," +
//     //        "'" + item.properties.county_fips + "'," +
//     //        "\'" + item.properties.ntaname.replace(/'/g) + "'\,  " +
//     //        "'" + item.properties.shape_leng + "'," +
//     //        "'" + item.properties.boro_name + "'," +
//     //        "'" + item.properties.boro_code + "'," +
//     // //        "(SELECT COUNT(*) FROM geodistricts  JOIN geoplots WHERE ST_Contains(geodistricts.coordinates, geoplots.coord))," +
//     //        "ST_GeomFromText('MULTIPOLYGON(((" + firstPolygon + ")))',4326))")
//     //    }
//     //         })
//
//     // districtsJson.features.map(item => {
//     //   connection.query("INSERT INTO `geodistricts`(`id`, `ntacode`, `shape_area`, " +
//     //     "`county_fips`, `ntaname`, `shape_leng`, `boro_name`, `boro_code`, `coordinates`, `plots`)  " +
//     //     "VALUES(NULL, '" + item.properties.ntacode + "'," +
//     //     "'" + item.properties.shape_area + "'," +
//     //     "'" + item.properties.county_fips + "'," +
//     //     "\'" + item.properties.ntaname.replace(/'/g) + "'\,  " +
//     //     "'" + item.properties.shape_leng + "'," +
//     //     "'" + item.properties.boro_name + "'," +
//     //     "'" + item.properties.boro_code + "'," +
//     // "SUM(ST_Contains(geodistricts.coordinates, geoplots.coord)) FROM geodistricts, geoplots" +
//     //     "ST_GeomFromText('POLYGON((" + item.geometry.coordinates.flat(2).map(i => i.join(' ')) + "))',4326))")
//     //   })
//
//     return console.log("Database connection was successful");
//   }
// });
module.exports = {pool: pool}


