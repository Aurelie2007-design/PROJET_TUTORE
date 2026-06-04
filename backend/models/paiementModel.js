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

const getAllPaiements = (callback)=>{
    db.query(
        `SELECT p.*, u.nom, u.prenom, u.matricule 
        FROM paiements p 
        JOIN users u ON p.user_id = u.id
     ORDER BY date_paiement DESC`,
    callback
    );
};
const getFraisUser = (user_id, callback)=>{
    db.query(
        `SELECT f.nom FROM users u 
        JOIN classes c ON c.nom = u.classe  
        JOIN frais_classes fc ON fc.classe_id = c.id 
        JOIN frais f ON f.id = fc.frais_id 
        WHERE u.id = ?
        `,
        [user_id],
        callback
    )
};

const getPaiementByUser = (user_id, callback)=>{
    db.query(
        `SELECT 
        u.nom AS user_nom,
        u.postnom,
        u.prenom,
        f.nom AS frais_nom,
        f.montant AS frais_montant,
        p.montant,

        COALESCE(SUM(p.montant), 0) AS total_paye,

        (f.montant - COALESCE(SUM(p.montant), 0)) AS reste

        FROM users u 

        JOIN classes c ON c.nom = u.classe
        JOIN frais_classes fc ON fc.classe_id = c.id
        JOIN frais f ON f.id = fc.frais_id

        LEFT JOIN paiements p 
        ON p.frais_id = f.id 
        AND p.user_id = u.id

        WHERE u.id = ?

        GROUP BY f.id, u.postnom`,
        [user_id],
        callback
    );

};

const checkMax = (frais, callback)=>{
    db.query(
        `SELECT f.montant FROM frais f WHERE (nom) = (?) `,
        (frais),
        callback
    );
};





module.exports = {
    getAllPaiements,
    getPaiementByUser,
    // createPaiement,
    nouvelPaiement,
    getFraisUser,
    checkMax
};