let mysql = require("mysql2");

let db = mysql.createPool({
  host: "mysql-db",
  user: "root",
  password: "",
  database: "db_tugas",
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
  debug: false,
});

db.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = db;
