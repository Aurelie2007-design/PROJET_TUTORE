import { apiFetch } from "../../../js/api.js";

document.getElementById("chercher").addEventListener("click", look);
const token = localStorage.getItem("token");

async function look() {
  const terme = document.getElementById("matricule").value;
  const list = document.getElementById("resultat");

  list.innerHTML = "";
  if (terme === null) {
    alert("enter un matricule pour commencer la recherche");
  } else {
    try {
      const data = await apiFetch(`/recherche?matricule=${terme}`);

      if (data.message) {
        list.innerHTML = `<div class='erreur'>${data.message}</div>`;
        return;
      }

      if (!Array.isArray(data)) {
        console.log("format inattendu :", data);
        list.innerText = "Erreur de format des données";
        return;
      }

      if (data.length === 0) {
        list.innerHTML = "<div class='erreur'>Aucun résultat trouvé</div>";
        return;
      }

      data.forEach((u) => {
        const div = document.createElement("div");
        div.classList.add("etudiant");

        div.innerHTML = `
        <div class="profile">
          <img src="../../../public/assets/profile.jpg">
          <div class="info">
            <h3>${u.nom} ${u.prenom}</h3>
            <p>Classe: FSTA Genie INFO L1</p>
            <p>Matricule : ${u.matricule}</p>
            <p>Sexe: F</p>
          </div> 
        </div>
        <div>
          <p>Jour de paiement</p>
          <p>le 20/12/2025</p>
        </div>
        <div>
          <p>Pourcentage</p>
          <p>70%</p>
        </div>
        <div>
          <p>Accès à la salle</p>
          <p>OUI</p>
        </div>
      `;

        div.onclick = () => {
          localStorage.setItem("selectedUser", JSON.stringify(u));
          window.location.href = "../paiements/paiements.html";
        };

        list.appendChild(div);
      });
    } catch (error) {
      console.log("une erreur est survenue", error);
      list.innerText = "Erreur lors de la requête";
    }
  }
}
