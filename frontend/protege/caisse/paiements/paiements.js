import { apiFetch } from "../../../js/api.js";

const user = JSON.parse(localStorage.getItem("selectedUser"));
if (!user) {
  alert("Rechercher d'abord un etudiant");
  window.location.href = "../recherche/recherche.html";
}

async function startRecu() {
  const res = await apiFetch("/recu", {
    method: "POST",
    body: JSON.stringify({ user_id: user.id }),
  });

  currentRecuId = res.recu_id;

  alert(currentRecuId);
}
function finishRecu() {
  if (!currentRecuId) {
    alert("Aucun reçu actif");
    return;
  }
  localStorage.removeItem("selectedUser");
  window.location.href = `../recus/recus.html?id=${currentRecuId}`;
}

const fraisUser = async function () {
  try {
    const data = await apiFetch("/paiements", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id }),
    });
    const tableau = {};
    const fraisMap = {};

    const container = document.getElementById("frais_container");
    const select = document.getElementById("select");
    const name = document.getElementById("student_name");

    container.innerHTML = "";
    select.innerHTML = "";
    console.log("data", data);
    data.forEach((i) => {
      const cleanNom = i.frais_nom.trim().replace(/\s+/g, " ");
      const totalPaye = i.total_paye;
      const montantTotal = i.frais_montant;
      const reste = montantTotal - totalPaye;
      tableau[i.id] = totalPaye;

      fraisMap[i.id] = {
        montant: montantTotal,
      };
      fraisMap["id"] = i.id;

      container.innerHTML += `
      <div class="content1">
      <div class="left">${cleanNom}</div>
      <div class="right">
      <div>${montantTotal}$</div>
      <div>${totalPaye}$</div>
      <div>${reste}$</div>
      <div>${((totalPaye / montantTotal) * 100).toFixed(1)}%</div>
      </div>
      </div>
      `;

      if (reste > 0) {
        select.innerHTML += `<option value="${i.id}" id="">${cleanNom}</option>`;
      }
    });

    return { tableau, fraisMap };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
async function payer() {
  const montantInput = document.getElementById("montant");
  const select = document.getElementById("select");
  const button = document.getElementById("payer");

  const montant = parseInt(montantInput.value, 10);

  const motif = parseInt(select.value, 10);

  console.log(motif);
  if (!montant || montant <= 0) {
    alert("Montant invalide");
    return;
  }

  try {
    button.disabled = true;

    const { tableau, fraisMap } = await fraisUser();
    console.log("tableau", tableau);
    const totalPaye = tableau[motif] || 0;
    const montantTotal = fraisMap[motif].montant;
    const reste = montantTotal - totalPaye;

    if (montant > reste) {
      alert(`Il reste seulement ${reste}$`);
      return;
    }

    if (!confirm(`Payer ${montant}$ pour ${motif} ?`)) {
      return;
    }
    await apiFetch("/payer", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        montant,
        motif,
        recu_id: currentRecuId,
      }),
    });

    const updated = await fraisUser();

    let toutPaye = true;

    Object.keys(updated.fraisMap).forEach((nom) => {
      const total = updated.tableau[nom];
      const max = updated.fraisMap[nom].montant;
      console.log(nom);

      if (total < max) {
        toutPaye = false;
      }
    });

    if (toutPaye) {
      alert("Tous les frais sont payés ✅");
    }

    montantInput.value = "";
  } catch (err) {
    console.log("Erreur paiement", err);
  } finally {
    button.disabled = false;
  }
}

document.getElementById("changer_etudiant").addEventListener("click", () => {
  localStorage.removeItem("selectedUser");
  window.location.href = "../recherche/recherche.html";
});

const logBtn = document.getElementById("logout");
let currentRecuId = null;
const startRecuBtn = document.getElementById("start_recu");
startRecuBtn.addEventListener("click", startRecu);
const endRecu = document.getElementById("finish_recu");
endRecu.addEventListener("click", finishRecu);
document.getElementById("payer").addEventListener("click", payer);
fraisUser();
