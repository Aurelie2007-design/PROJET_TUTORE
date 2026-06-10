const db = require("../db/db");

const nouvelPaiement = (user_id, montant, motif, recu_id, callback) => {
  db.query(
    `INSERT INTO paiements (user_id, montant, motif, frais_id, recu_id)
    VALUES (?, ?, ?, ?, ?)`,
    [user_id, montant, motif, motif, recu_id],
    callback,
  );
};

const getStatSemaines = (callback) => {
  db.query(
    `SELECT 
    d.jour,
    COALESCE(SUM(p.montant), 0) AS total
    FROM (
    SELECT CURDATE() - INTERVAL 6 DAY AS jour
    UNION ALL SELECT CURDATE() - INTERVAL 5 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 4 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 3 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 2 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 1 DAY
    UNION ALL SELECT CURDATE()
    ) d
    LEFT JOIN paiements p 
    ON DATE(p.date_paiement) = d.jour
    GROUP BY d.jour
    ORDER BY d.jour ASC;`,
    callback,
  );
};

const createPaiement = (user_id, montant, motif, recu_id, callback) => {
  db.query(
    `INSERT INTO paiements (user_id, montant, motif, frais_id, recu_id)
    SELECT ?, ?, ?, id, ?
    FROM frais
    WHERE id = ?;
    `,
    [user_id, montant, motif, motif, recu_id],
    callback,
  );

  console.log("Données reçues pour le paiement:", { user_id, montant, motif });
};

const getAllPaiements = (callback) => {
  db.query(
    `SELECT p.*, u.nom, u.prenom, u.matricule 
        FROM paiements p 
        JOIN users u ON p.user_id = u.id
     ORDER BY date_paiement DESC`,
    callback,
  );
};
const getMesPaiement = (user_id, callback) => {
  db.query(
    ` SELECT 
          p.recu_id,
          u.nom,
          u.postnom,
          u.prenom,
          p.montant,
          f.nom AS motif,
          p.date_paiement AS heure
          FROM paiements p
          JOIN users u ON u.id = p.user_id
          JOIN frais f ON f.id = p.frais_id
          WHERE p.user_id = (?)
          ORDER BY p.recu_id, p.date_paiement;
        `,
    [user_id],
    callback,
  );
};

const getPaiementByUser = (user_id, callback) => {
  db.query(
    `SELECT 
        u.nom AS user_nom,
        u.postnom,
        u.prenom,
        f.nom AS frais_nom,
        f.montant AS frais_montant,
        p.montant,
        f.id,
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
        GROUP BY f.id`,
    [user_id],
    callback,
  );
};

const CreateRecu = (user_id, callback) => {
  db.query(
    "INSERT INTO recus (user_id) VALUES (?)",
    [user_id],
    (err, result) => {
      if (err) return callback(err);

      callback(null, result.insertId);
    },
  );
};
const getRecuId = (recu_id, callback) => {
  db.query(
    `SELECT
    u.nom AS user_nom,
    u.postnom,
    u.prenom,
    u.classe,
    u.matricule, 
    p.montant,
    r.date,
    f.nom
    FROM paiements p
    JOIN frais f ON f.id = p.frais_id
    JOIN users u ON u.id = p.user_id
    JOIN recus r ON r.id = p.recu_id
    WHERE p.recu_id = ?  `,
    [recu_id],
    callback,
  );
};

const getUserPaiement = (user_id, callback) => {
  db.query(
    `
    SELECT 
        u.nom AS user_nom,
        u.postnom,
        u.prenom,
        f.nom AS frais_nom,
        f.montant AS frais_montant,
        p.montant,
        f.id,
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
        GROUP BY f.id`,
    [user_id],
    callback,
  );
};

module.exports = {
  getAllPaiements,
  getPaiementByUser,
  createPaiement,
  nouvelPaiement,
  getMesPaiement,
  CreateRecu,
  getRecuId,
  getStatSemaines,
  getUserPaiement,
};
