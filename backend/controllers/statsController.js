const statsModel = require("../models/statsModel");

exports.statsJour = (req, res) => {
  statsModel.getStatsJour((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
};

exports.paiementsJour = (req, res) => {
  statsModel.getPaiementsJour((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

exports.statsSemaine = (req, res) => {
  statsModel.getStatsSemaine((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

exports.paiementsDetails = (req, res) => {
  statsModel.getPaiementsJourDetails((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

exports.recette = (req, res) => {
  statsModel.getRecette((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

exports.recetteJour = (req, res) => {
  statsModel.getRecetteJour((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

exports.statsJour = (req, res) => {
  statsModel.getStats((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
