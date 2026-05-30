const express = require("express");
const router = express.Router();


// const role = require("../middleware/roleMiddleware");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const authContoller = require("../controllers/authController");

router.get("/recherche", authContoller.recherche);

module.exports = router;
