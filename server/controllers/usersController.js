const response = require("./../response");
const db = require("./../settings/database");

exports.users = async (req, res) => {
    const sql =
        "SELECT id, ntaname AS name, ABS(area) AS area, plots FROM alles_districts ORDER BY id";
    await db.query(sql, async (error, rows, fields) => {
        if (error) {
            console.log("Error", error);
        } else {
            response.status(rows, res);
            console.log(rows, res)
        }
    });
};
