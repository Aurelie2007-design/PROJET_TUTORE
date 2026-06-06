const db = require("../db/db");
const paiementModel = require("../models/paiementModel");
console.log("ROUTE ajouterPaiement appelée");

exports.ajouterPaiement = (req, res) => {
  const { user_id, montant, motif } = req.body;
  paiementModel.createPaiement(user_id, montant, motif, (err, result) => {
    console.log(err);
    if (err) {
      return res.status(500).json(req.body);
    } else {
      res.json({ message: "Paiement enregistré" });
      console.log(req.body);
    }
  });
};
exports.getPaiementUser = (req, res) => {
  const user_id = req.body.user_id;
  paiementModel.getPaiementByUser(user_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
exports.getMonPaiements = (req, res) => {
  paiementModel.getPaiementsByUser(req.user.id, (err, result) => {
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
exports.checkMax = (req, res) => {
  const { frais, user_id } = req.body;
  paiementModel.checkMax(frais, user_id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};
