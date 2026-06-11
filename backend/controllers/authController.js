const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.login = (req, res) => {
  const { matricule, password } = req.body;

  userModel.findUserByMatricule(matricule, password, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const user = results[0];

    const token = jwt.sign(
      { id: user.id, role: user.role, matricule: user.matricule },
      "SECRET_KEY",
      {
        expiresIn: "3h",
      },
    );

    res.json({ token });
  });
};

exports.getProfile = (req, res) => {
  const user_id = req.body.id;
  userModel.getUserById(user_id, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
};

exports.recherche = (req, res) => {
  const { matricule } = req.query;
  userModel.chercheUser(matricule, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};

exports.CreateUser = (req, res) => {
  const {
    nom,
    postnom,
    prenom,
    email,
    date_naissance,
    matricule,
    password,
    classe,
  } = req.body;
  userModel.createUser(
    nom,
    postnom,
    prenom,
    email,
    date_naissance,
    matricule,
    password,
    classe,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(result);
    },
  );
};

exports.GetAllusers = (req, res) => {
  userModel.getAllUser((err, result) => {
    if (err) {
      res.status(500).json(err);
    }
    res.json(result);
  });
};

exports.getAllClasses = (req, res) => {
  userModel.getClasse((err, result) => {
    if (err) {
      res.status(500).json(err);
    }
    res.json(result);
  });
};

exports.getEtudiants = (req, res) => {
  userModel.getEtudiant((err, result) => {
    if (err) {
      res.status(500).json(err);
    }
    res.json(result);
  });
};
