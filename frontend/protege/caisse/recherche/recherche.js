import {apiFetch} from "../../../js/api.js";

document.getElementById("chercher").addEventListener("click", chercher);
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