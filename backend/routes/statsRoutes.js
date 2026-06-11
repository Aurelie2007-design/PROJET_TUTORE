const express = require("express");
const router = express.Router();
const controller = require("../controllers/statsController");

router.get("/stats/jour", controller.statsJour);
router.get("/paiements/jour", controller.paiementsJour);
router.get("/stats/semaine", controller.statsSemaine);
router.get("/paiments/jour_details", controller.paiementsDetails);
router.get("/recette/total", controller.recette);
router.get("/recette/jour", controller.recetteJour);

module.exports = router;
