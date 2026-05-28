const db = require("../db/db");
const paiementModel = require("../models/paiementModel");

exports.ajouterPaiement = (req, res)=>{
//     const {user_id, montant, motif} = req.body;
//     paiementModel.nouvelPaiement(user_id, montant, motif, (err, result) => {
//     if (err) return res.status(500).json(err);

//     res.json({ message: "Paiement enregistré" });
//   });
 const { user_id, montant, motif } = req.body;

  paiementModel.createPaiement(user_id, montant, motif, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Paiement enregistré" });
  });
}
exports.getPaiementUser = (req, res)=>{
    const user_id = req.params.id;
    paiementModel.getPaiementByUser(req.user_id, (err, result)=>{
        if (err) return res.status(500).json();
        res.json(result);
    });
};
exports.getMonPaiements = (req, res) => {
  paiementModel.getPaiementsByUser(req.user.id, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
exports.getAllPaiements = (req, res)=>{
    paiementModel((err, result)=>{
        if(err){
            return res.status(500).json();
        }
        res.json(result);
    });
}


