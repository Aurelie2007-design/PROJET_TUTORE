// controllers/fraisController.js
const db = require("../db");

exports.createFrais = (req, res) => {
  const { nom, montant, description, classes } = req.body;

  if (!nom || !montant || !classes || classes.length === 0) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  // 1. Inserer le frais
  const sqlFrais = "INSERT INTO frais (nom, montant, description) VALUES (?, ?, ?)";

  db.query(sqlFrais, [nom, montant, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur insertion frais" });
    }

    const fraisId = result.insertId;

    // 2. Inserer dans frais_classes
    const values = classes.map((classeId) => [fraisId, classeId]);

    const sqlPivot = "INSERT INTO frais_classes (frais_id, classe_id) VALUES ?";

    db.query(sqlPivot, [values], (err2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ message: "Erreur liaison classes" });
      }

      res.status(201).json({
        message: "Frais créé avec succès",
        frais_id: fraisId
      });
    });
  });
};


exports.getPaiementsEtudiant = (req, res) => {
  const userId = req.params.id;

  const detailsQuery = `...`; // (la première requête)
  const totalQuery = `...`;   // (la deuxième requête)

  db.query(detailsQuery, [userId], (err, details) => {
    if (err) return res.status(500).json(err);

    db.query(totalQuery, [userId], (err2, total) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        details,
        total: total[0]
      });
    });
  });
};

const exampleResponse = {
  "details": [
    {
      "frais_id": 1,
      "nom": "Inscription",
      "montant_total": 50,
      "montant_paye": 20,
      "reste": 30,
      "pourcentage": 40
    },
    {
      "frais_id": 2,
      "nom": "Examen",
      "montant_total": 30,
      "montant_paye": 0,
      "reste": 30,
      "pourcentage": 0
    }
  ],
  "total": {
    "total_a_payer": 80,
    "total_paye": 20,
    "pourcentage_total": 25
  }
}

const data_fuctif = [
  {
    "frais_id": 1,
    "nom": "Inscription",
    "montant": 50,
    "montant_paye": 20,
    "reste": 30
  },
  {
    "frais_id": 2,
    "nom": "Examen",
    "montant": 30,
    "montant_paye": 0,
    "reste": 30
  }
]

// <label>
//   <input type="checkbox" value="1">
//   Inscription (reste: 30$)
// </label>

// <label>
//   <input type="checkbox" value="2">
//   Examen (reste: 30$)
// </label>


{/* <input type="checkbox" value="1" disabled> Déjà payé */}

exports.getFraisEtudiant = (req, res) => {
  const userId = req.params.id;

  const query = `...`; // la requête ci-dessus

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};