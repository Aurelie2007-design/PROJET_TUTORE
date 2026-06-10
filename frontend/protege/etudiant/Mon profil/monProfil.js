import { apiFetch } from "../../../js/api.js";

const token = localStorage.getItem("token");

const terme = JSON.parse(atob(token.split(".")[1]));
const matricule = terme.matricule;
const user_id = terme.id;

async function getData() {
  try {
    const data = await apiFetch("/profil", {
      method: "POST",
      body: JSON.stringify({ id: user_id }),
    });
    console.log(data, "data");
    return data;
  } catch (error) {
    console.log(error, "erreur");
    return [];
  }
}
async function afficher(data) {
  try {
    const container = document.getElementById("profil");
    container.innerHTML = `
                <p><strong>Nom :</strong> ${data.nom}</p>
                <p><strong>PostNom :</strong> ${data.postnom}</p>
                <p><strong>Prenom :</strong> ${data.prenom}</p>
                <p><strong>Classe :</strong> ${data.classe}</p>
                <p><strong>Faculte :</strong> TECHONLOGIES</p>
                <p><strong>Email :</strong> ${data.email}</p>
                <p><strong>DateNaissance :</strong> ${data.date_naissance}</p>
                <p><strong>Matricule :</strong> ${data.matricule}</p>
                `;
  } catch (error) {
    console.log(error, "erreur");
    return [];
  }
}
async function init() {
  const data = await getData();
  afficher(data);
  console.log(data);
}

init();
