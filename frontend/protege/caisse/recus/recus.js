import { apiFetch } from "../../../js/api.js";

const params = new URLSearchParams(window.location.search);
const recu_id = params.get("id");
console.log("Reçu ID:", recu_id);

if (!recu_id) {
  alert("Aucun reçu trouvé.");
  window.location.href = "../paiements/paiements.html";
}

async function loadRecu(recu_id) {
  const res = await apiFetch("/getRecuId", {
    method: "POST",
    body: JSON.stringify({ recu_id }),
  });

  const container = document.getElementById("recu");
  console.log("Reçu data:", res);

  let total = 0;

  res.data.forEach((p) => {
    total += parseFloat(p.montant);

    container.innerHTML += `
                    <div class="left">
                      <p>${p.nom}</p>
                    </div>
                    <div class="right">
                      <p>${p.montant}$</p>
                    </div>
    `;
  });

  container.innerHTML += `
                    <div class="left">
                      <p>Total:</p>
                    </div>
                    <div class="right">
                      <p>${total}$</p>
                    </div>`;
  const nom = document.getElementById("nom");
  console.log(res);
  nom.innerHTML = `<div class="left">
                      <p>Nom d'etudiant:</p>
                    </div>
                    <div class="right">
                      <p>${res.data[0].user_nom} ${res.data[0].postnom} ${res.data[0].prenom}</p>
                    </div>`;

  const classe = document.getElementById("classe");
  classe.innerHTML = `<div class="left">
                      <p>Classe:</p>
                    </div>
                    <div class="right">
                      <p>${res.data[0].classe}</p>
                    </div>`;

  const matricule = document.getElementById("matricule");
  matricule.innerHTML = `<div class="left">
                      <p>Matricule:</p>
                    </div>
                    <div class="right">
                      <p>${res.data[0].matricule}</p>
                    </div>`;

  const date = document.getElementById("date");
  const datePaiement = new Date(res.data[0].date);
  date.innerHTML = `<div class="left">
                      <p>Date:</p>
                    </div>
                    <div class="right">
                      <p>${datePaiement.toLocaleString()}</p>
                    </div>`;
  genererQR(
    res.data[0].matricule,
    res.data[0].user_nom,
    res.data[0].postnom,
    total,
    datePaiement.toLocaleString(),
  );
}

function genererQR(matricule, nom, postnom, montant, date) {
  const contenuQR = `
            ID: ${recu_id}
            Nom: ${nom} ${postnom}
            Montant: ${montant}$
            Date: ${date}
          `;

  document.getElementById("qrCode").innerHTML = "";

  new QRCode(document.getElementById("qrCode"), {
    text: contenuQR,
    width: 100,
    height: 100,
  });
}
document.getElementById("telecharger").addEventListener("click", imprimer);
function imprimer() {
  window.print();
  window.location.href = `../tableauDeBord/tableauDeBord.html`;
}

window.onload = () => {
  loadRecu(recu_id);
};
