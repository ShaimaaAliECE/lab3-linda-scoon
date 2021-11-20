const sql = require("mysql");

function getConnection() {
  let conn = mysql.createConnection({
    host: "35.194.56.78",
    username: "root",
    password: "ping123",
    database: "DoodleAppDB",
  });
  conn.connect();
  return conn;
}
module.exports = getConnection;
