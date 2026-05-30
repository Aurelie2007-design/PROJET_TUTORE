module.exports = (role) => {
  return (req, res, next) => {
    // console.log("Role Middleware:", req.user.role, "Required Role:", role);
    if (req.user.role.trim().toLowerCase() != role.trim().toLowerCase()) {
      return res.status(401).json({error: "Token invalide"});
    }
    next();
  };
};