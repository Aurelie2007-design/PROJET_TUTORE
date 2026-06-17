import { apiFetch } from "../../../js/api.js";

document.getElementById("formFrais").addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const montant = document.getElementById("montant").value;

  if (!description || !montant) {
    alert("Remplis tous les champs !");
    return;
  }

  apiFetch("/nouvelleDepense", {
    method: "POST",
    body: JSON.stringify({
      description: description,
      montant: montant,
    }),
  });
  alert("Frais créé avec succès");
  document.getElementById("description").value = "";
  document.getElementById("montant").value = "";
});

async function afficher() {
  const data = await apiFetch("/depenseDuJour");
  console.log(data, "jj");
}

async function chargerDepenses() {
  const data = await apiFetch("/listeDepenseJour");
  const total = await apiFetch("/depenseTotal");
  const donnee = await apiFetch("/depenseDuJour");
  console.log(donnee);

  const container = document.getElementById("listeDepenses");
}

chargerDepenses();
