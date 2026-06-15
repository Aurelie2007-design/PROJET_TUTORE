const db = require("../db/db");

const findUserByMatricule = (matricule, password, callback) => {
  db.query(
    "SELECT * FROM users WHERE matricule=? AND password=? AND status = ?",
    [matricule, password, "actif"],
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

const getAllUser = (callback) => {
  db.query(
    `SELECT id,nom, prenom, postnom, status, email, role FROM users `,
    callback,
  );
};

const createUser = (
  nom,
  postnom,
  prenom,
  email,
  date_naissance,
  matricule,
  password,
  classe_id,
  callback,
) => {
  db.query(
    `
    INSERT INTO users (nom, postnom, prenom, email, date_naissance, matricule, password, role, classe_id) VALUES (?,?,?,?,?,?,?,?,?)
    `,
    [
      nom,
      postnom,
      prenom,
      email,
      date_naissance,
      matricule,
      password,
      "etudiant",
      classe_id,
    ],
    callback,
  );
};

const getClasse = (callback) => {
  db.query(`SELECT id, nom FROM classes`, callback);
};

const getEtudiant = (callback) => {
  db.query(`SELECT id FROM users WHERE role = (?) `, ["etudiant"], callback);
};

module.exports = {
  findUserByMatricule,
  getUserById,
  chercheUser,
  createUser,
  getAllUser,
  getClasse,
  getEtudiant,
};
