const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ULPGL",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur connexion DB:", err);
  } else {
    console.log("Connecté à MySQL");
  }
});

module.exports = db;
