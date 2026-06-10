const db = require("../db/db");

const findUserByMatricule = (matricule, password, callback) => {
  db.query(
    "SELECT * FROM users WHERE matricule=? AND password=?",
    [matricule, password],
    callback,
  );
};

const getUserById = (id, callback) => {
  db.query(
    "SELECT matricule, nom, postnom, prenom, classe, email, date_naissance FROM users WHERE id=?",
    [id],
    callback,
  );
};

const chercheUser = (matricule, callback) => {
  db.query(
    "SELECT id, nom, prenom, matricule FROM users WHERE matricule like (?) AND role='etudiant'",
    [`%${matricule}%`],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, { message: "Aucun résultat trouvé" });
      }

      return callback(null, results);
    },
  );
};

module.exports = {
  findUserByMatricule,
  getUserById,
  chercheUser,
};
