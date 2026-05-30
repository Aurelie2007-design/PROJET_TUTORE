const db = require("../db/db");

const nouvelPaiement = (user_id, montant, motif, callback)=>{
    db.query(
        "INSERT INTO paiements (user_id, montant, motif) VALUES (?,?,?)",
        [user_id, montant, motif ],
        callback
    );

};
const createPaiement = (user_id, montant, motif, callback) => {
  db.query(
    "INSERT INTO paiements (user_id, montant, motif) VALUES (?, ?, ?)",
    [user_id, montant, motif],
    callback
  );
  console.log("Données reçues pour le paiement:", { user_id, montant, motif });
};
const getPaiementByUser = (user_id, callback)=>{
    db.query(
        "SELECT * FROM paiements WHERE user_id = ?",
        [user_id],
        callback
    );

}

const getAllPaiements = (callback)=>{
    db.query(
           `SELECT p.*, u.nom, u.prenom, u.matricule 
     FROM paiements p 
     JOIN users u ON p.user_id = u.id
     ORDER BY date_paiement DESC`,
    callback
    );
};

module.exports = {
    getAllPaiements,
    getPaiementByUser,
    // createPaiement,
    nouvelPaiement,
};