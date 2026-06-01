import {apiFetch} from "../../../js/api.js";

document.getElementById("chercher").addEventListener("click", look);
const token = localStorage.getItem("token");
function chercher(){
    const terme = document.getElementById("matricule").value;
    apiFetch(`/recherche?matricule=${terme}`)
    .then(data => {
      const list = document.getElementById("result");
      list.innerHTML = "";
      if(!data){
        list.innerText= "";
        console.log("aucun utilisateur trouve");
      } else{
        
        data.forEach(u => {
          const li = document.createElement("li");
          li.innerText = `${u.nom} ${u.prenom} (${u.matricule})`;
    
          li.onclick = () => {
            localStorage.setItem("selectedUser", JSON.stringify(u));
            window.location.href = "../paiements/paiements.html";
          };
          list.appendChild(li);
      });
      }
  }).catch(error => {
    console.log("une erreur est survenue");
  })
  ;
}

function look(){
    const terme = document.getElementById("matricule").value;
    apiFetch(`/recherche?matricule=${terme}`)
    .then(data => {
      const list = document.getElementById("resultat");
      list.innerHTML = "";
      if(!data){
        // list.innerText= "";
        console.log("aucun utilisateur trouve");
        list.innerText= "aucun resulat trouve";
      } else{
        
        data.forEach(u => {
          // const li = document.createElement("li");
          // li.innerText = `${u.nom} ${u.prenom} (${u.matricule})`;
          const div = document.createElement("div");
          div.classList.add("etudiant");

          div.innerHTML =`
          <div class="profile">
          <img src="../../../public/assets/profile.jpg" alt="" srcset="">
          <div class="info">
          <h3 id="nom">${u.nom} ${u.prenom}</h3>
          <p>Classe: FSTA Genie INFO L1</p>
          <p>matricule :<span id="matricule">${u.matricule}</span> </p>
          <p>sexe: F</p>
          </div> 
          </div>
          <div class="">
          <p>Jour de paiement</p>
          <p>le 20/12.2025</p>
          </div>
          <div class="">
          <p>Pourcentage</p>
          <p>70%</p>
          </div>
          <div class="">
          <p>acces a la salle</p>
          <p>OUI</p>
          </div>
          
          `
          list.appendChild(div);
          
          // const etudiant = document.getElementById("etudiant");
          div.onclick = () => {
            localStorage.setItem("selectedUser", JSON.stringify(u));
            window.location.href = "../paiements/paiements.html";
          };
          list.appendChild(div);
      });
      }
  }).catch(error => {
    console.log("une erreur est survenue");
    console.log(error);
  })
  ;
}

