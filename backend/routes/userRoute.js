const express = require("express");
const router = express.Router();

const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const authContoller = require("../controllers/authController");

router.get("/recherche", auth, role("caissier"), authContoller.recherche);
router.post("/profil", authContoller.getProfile);

// routes caissiers

router.post("/create-user", auth, role("directeur"), authContoller.CreateUser);

router.get("/getAllUsers", auth, role("directeur"), authContoller.GetAllusers);
router.get(
  "/getAllClasses",
  auth,
  role("directeur"),
  authContoller.getAllClasses,
);

router.get(
  "/getEtudiants",

  authContoller.getEtudiants,
);

module.exports = router;
