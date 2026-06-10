import { apiFetch } from "../../../js/api.js";

const token = localStorage.getItem("token");

const terme = JSON.parse(atob(token.split(".")[1]));
console.log(terme);
const matricule = terme.matricule;
const user_id = terme.id;

const fraisUser = async function (user_id) {
  try {
    const data = await apiFetch("/mes_paiements", {
      method: "POST",
      body: JSON.stringify({ user_id: user_id }),
    });
    const tableau = {};
    const fraisMap = {};
    const frais = {};
    let fraisReste = 0;
    let total = 0;
    let maxFrais = 0;

    const container = document.getElementById("frais_container");
    const div_frais = document.getElementById("frais");
    const info = document.getElementById("info");
    const div_reste = document.getElementById("solde_restant");
    const div_total = document.getElementById("solde_total");
    const div_totalFrais = document.getElementById("frais_total");
    const div_pourcent = document.getElementById("pourcent");

    container.innerHTML = "";
    div_frais.innerHTML = "";
    info.innerHTML = "";
    div_reste.innerHTML = "";
    div_total.innerHTML = "";
    div_totalFrais.innerHTML = "";
    div_pourcent.innerHTML = "";
    console.log("data", data);
    data.forEach((i) => {
      const cleanNom = i.frais_nom.trim().replace(/\s+/g, " ");
      const totalPaye = i.total_paye;
      console.log(i.total_paye);
      const montantTotal = i.frais_montant;
      const reste = montantTotal - totalPaye;
      fraisReste += reste;
      total = total + parseInt(totalPaye, 10);
      maxFrais += parseInt(montantTotal, 10);
      tableau[i.id] = totalPaye;

      fraisMap[i.frais_nom] = {
        montant: montantTotal,
      };
      fraisMap["id"] = i.id;

      div_frais.innerHTML += `
        <p><strong>${i.frais_nom} :</strong>${montantTotal}$</p>
      `;
    });
    const pourcent = (total / maxFrais) * 100;
    info.innerHTML += `
    <p><strong>NOM : </strong>${data[0].user_nom}</p>
    <p><strong>POSTNOM : </strong>${data[0].postnom}</p>
    <p><strong>PRENOM : </strong>${data[0].prenom}</p>
    <p><strong>matricule : </strong>${matricule}</p>
    `;
    div_reste.innerHTML = `${fraisReste}$`;
    div_total.innerHTML = `${total}$`;
    div_totalFrais.innerHTML = `${maxFrais}$`;
    div_pourcent.innerHTML = `${parseInt(pourcent, 10)}%`;
    console.log(total);
    return { tableau, fraisMap };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
fraisUser(user_id);
