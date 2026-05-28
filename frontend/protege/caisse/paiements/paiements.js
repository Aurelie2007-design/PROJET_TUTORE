import { apiFetch } from "../../../js/api.js";


const user = JSON.parse(localStorage.getItem("selectedUser"));




document.getElementById("payer").addEventListener("click", payer);

function payer() {
  const montant = document.getElementById("montant").value;
  const motif = document.getElementById("motif").value;

  apiFetch("/payer", {
    method: "POST",
    body: JSON.stringify({
      user_id: user.id,
      montant,
      motif
    })
  })
  .then(res => {
    alert("Paiement enregistré");
  });
}