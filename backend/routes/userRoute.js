const express = require("express");
const router = express.Router();

const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const authContoller = require("../controllers/authController");

router.get("/recherche", auth, role("caissier"), authContoller.recherche);
router.post("/profil", authContoller.getProfile);

module.exports = router;
