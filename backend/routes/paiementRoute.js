const express = require("express");
const router = express.Router();

const paiementController = require("../controllers/paiementController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// caisse
router.post(
  "/payer",
  auth,
  role("caissier"),
  paiementController.ajouterPaiement,
);
router.post(
  "/fraisUser",
  auth,
  role("caissier"),
  paiementController.getFraisUser,
);
router.post(
  "/paiements",
  auth,
  role("caissier"),
  paiementController.getPaiementUser,
);
router.post("/recu", auth, role("caissier"), paiementController.recu);

router.post("/getRecuId", auth, role("caissier"), paiementController.getRecuId);

router.get("/recu/:id", auth, role("caissier"), paiementController.getRecuId);

router.post("/getTotal/", auth, role("caissier", paiementController.total));

module.exports = router;

// user routes
router.post(
  "/mes_paiements",
  auth,
  role("etudiant"),
  paiementController.getUserPaiement,
);

router.post(
  "/mes_paiements_details",
  auth,
  role("etudiant"),
  paiementController.getMesPaiements,
);

// directeur routes
router.post(
  "/createFrais",
  auth,
  role("directeur"),
  paiementController.creerFrais,
);

router.get(
  "/fraisTotal",
  auth,
  role("directeur"),
  paiementController.fraisTotal,
);

router.get(
  "/etudiantEnOrdre",
  auth,
  role("directeur"),
  paiementController.etudiantEnOrdre,
);

router.get(
  "/fraisAttendu",
  auth,
  role("directeur"),
  paiementController.fraisAttendu,
);
