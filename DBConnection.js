const sql = require("mysql");

function getConnection() {
  let conn = sql.createConnection({
    host: "35.194.56.78",
    user: "root",
    password: "ping123",
    database: "DoodleAppDB",
  });
  conn.connect();
  return conn;
}
module.exports = getConnection;
