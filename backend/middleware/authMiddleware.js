const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ error: "Token requis" });
  }

  const parts = header.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Format token invalide" });
  }

  const token = parts[1];

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token invalide" });
    }

    req.user = decoded;
    next();
  });
};
