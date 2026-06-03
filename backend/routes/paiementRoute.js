const express = require("express");
const router = express.Router();

const paiementController = require("../controllers/paiementController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// caisse
router.post("/payer",auth, role("caissier"), paiementController.ajouterPaiement );
router.post("/fraisUser", auth, role("caissier"), paiementController.getFraisUser);
router.get("/paiement/:id", auth, role("caissier"), paiementController.getPaiementUser);

//etudiant
router.get("/mes_paiements", auth, role("etudiant"), paiementController.getMonPaiements);

//directeur finacier
router.get("/paiments", auth, role("directeur"), paiementController.getAllPaiements);

module.exports = router;