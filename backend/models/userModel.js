const db = require("../db/db");

const findUserByMatricule = (matricule, password, callback) => {
  db.query(
    "SELECT * FROM users WHERE matricule=? AND password=?",
    [matricule, password],
    callback
  );
};

const getUserById = (id, callback) => {
  db.query(
    "SELECT matricule, nom, postnom, prenom, classe, email, date_naissance, role FROM users WHERE id=?",
    [id],
    callback
  );
};

const chercheUser = (matricule, callback)=>{
  db.query(
    "SELECT id, nom, prenom, matricule FROM users WHERE matricule like (?) AND role='etudiant'",
    [`%${matricule}%`],
    callback
  )
}


module.exports = {
  findUserByMatricule,
  getUserById,
  chercheUser,
};