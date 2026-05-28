module.exports = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      // return res.status(403).send("Accès refusé");
      return res.status(401).json({error: "Token invalide nhytresd"});
    }
    next();
  };
};