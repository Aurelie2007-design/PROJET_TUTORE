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

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
      expiresIn: "3h",
    });

    res.json({ token });
  });
};

exports.getProfile = (req, res) => {
  userModel.getUserById(req.user.id, (err, result) => {
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
