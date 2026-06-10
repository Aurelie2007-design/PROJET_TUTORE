const db = require("../db/db");

exports.getStatsJour = (callback) => {
  db.query(
    `
    SELECT 
    COUNT(DISTINCT user_id) AS nb_etudiants,
    SUM(montant) AS total_jour,
    SUM(montant)/COUNT(DISTINCT user_id) AS moyenne
    FROM paiements
    WHERE DATE(date_paiement) = CURDATE()
  `,
    callback,
  );
};

exports.getPaiementsJour = (callback) => {
  db.query(
    `
    SELECT 
    u.nom, 
    u.postnom, 
    u.prenom,
    p.recu_id, 
    c.nom AS classe, 
    TIME(p.date_paiement) AS heure, 
    SUM(p.montant) AS total
    FROM paiements p 
    JOIN users u ON u.id = p.user_id 
    LEFT JOIN classes c ON c.nom = u.classe 
    WHERE DATE(p.date_paiement) = CURDATE() 
    GROUP BY recu_id 
    ORDER BY p.date_paiement DESC;
  `,
    callback,
  );
};
exports.getPaiementsJourDetails = (callback) => {
  db.query(
    `
      SELECT 
      p.recu_id,
      u.nom,
      u.postnom,
      u.prenom,
      p.montant,
      f.nom AS motif,
      TIME(p.date_paiement) AS heure
      FROM paiements p
      JOIN users u ON u.id = p.user_id
      JOIN frais f ON f.id = p.frais_id 
      WHERE DATE(p.date_paiement) = CURDATE()
      ORDER BY p.recu_id, p.date_paiement;
  `,
    callback,
  );
};

exports.getStatsSemaine = (callback) => {
  db.query(
    `
    SELECT 
    d.jour,
    COALESCE(SUM(p.montant), 0) AS total
    FROM (
    SELECT CURDATE() - INTERVAL 6 DAY AS jour
    UNION ALL SELECT CURDATE() - INTERVAL 5 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 4 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 3 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 2 DAY
    UNION ALL SELECT CURDATE() - INTERVAL 1 DAY
    ) d
    LEFT JOIN paiements p 
    ON DATE(p.date_paiement) = d.jour
    GROUP BY d.jour
    ORDER BY d.jour ASC
    `,
    callback,
  );
};

// UNION ALL SELECT CURDATE()
