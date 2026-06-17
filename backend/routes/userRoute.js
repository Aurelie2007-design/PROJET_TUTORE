const express = require("express");
const router = express.Router();

const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const authContoller = require("../controllers/authController");

router.get("/recherche", auth, role("caissier"), authContoller.recherche);
router.post("/profil", authContoller.getProfile);

// routes directeur

router.post("/create-user", auth, role("directeur"), authContoller.CreateUser);
router.post("/create-caissier", auth, role("directeur"), authContoller.Admin);

router.get("/getAllUsers", auth, role("directeur"), authContoller.GetAllusers);
router.get(
  "/getAllClasses",
  auth,
  role("directeur"),
  authContoller.getAllClasses,
);

router.get("/getEtudiants", authContoller.getEtudiants);

router.post(
  "/modify",
  auth,
  role("directeur"),
  authContoller.getUserDataToModify,
);

router.post("/updateUser", auth, role("directeur"), authContoller.updateUser);

router.post("/deleteUser", auth, role("directeur"), authContoller.deleteUser);
router.post(
  "/changerStatus",
  auth,
  role("directeur"),
  authContoller.changerStatus,
);

module.exports = router;
