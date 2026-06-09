module.exports = (role) => {
  return (req, res, next) => {
    if (req.user.role.trim().toLowerCase() != role.trim().toLowerCase()) {
      return res.status(401).json({ error: "Token invalide" });
    }
    next();
  };
};
