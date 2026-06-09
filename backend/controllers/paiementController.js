const db = require("../db/db");
const paiementModel = require("../models/paiementModel");
console.log("ROUTE ajouterPaiement appelée");

exports.ajouterPaiement = (req, res) => {
  const { user_id, montant, motif, recu_id } = req.body;
  paiementModel.nouvelPaiement(
    user_id,
    montant,
    motif,
    recu_id,
    (err, result) => {
      console.log(err);
      if (err) {
        return res.status(500).json(req.body);
      } else {
        res.json({ message: "Paiement enregistré" });
        console.log(req.body);
      }
    },
  );
};
exports.getPaiementUser = (req, res) => {
  const user_id = req.body.user_id;
  paiementModel.getPaiementByUser(user_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
exports.getMonPaiements = (req, res) => {
  const user_id = req.body.user_id;
  paiementModel.getPaiementsByUser(user_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
exports.getAllPaiements = (req, res) => {
  paiementModel((err, result) => {
    if (err) {
      return res.status(500).json();
    }
    res.json(result);
  });
};

exports.getFraisUser = (req, res) => {
  const user_id = req.params.id;
  paiementModel.getFraisUser(user_id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};
exports.recu = (req, res) => {
  const { user_id } = req.body;

  paiementModel.CreateRecu(user_id, (err, result) => {
    if (err) {
      console.log("Erreur création reçu:", err);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création du reçu",
      });
    }

    res.json({
      success: true,
      recu_id: result,
    });
  });
};

exports.getRecuId = (req, res) => {
  const { recu_id } = req.body;
  paiementModel.getRecuId(recu_id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du reçu",
      });
    }
    res.json({
      success: true,
      data: result,
    });
  });
};
