import {apiFetch} from "../../../js/api.js";

document.getElementById("chercher").addEventListener("click", chercher);
function chercher(){
    const terme = document.getElementById("matricule").value;
     apiFetch(`/search?matricule=${terme}`)
  .then(data => {
    const list = document.getElementById("result");
    list.innerHTML = "";

    data.forEach(u => {
      const li = document.createElement("li");
      li.innerText = `${u.nom} ${u.prenom} (${u.matricule})`;

      li.onclick = () => {
        localStorage.setItem("selectedUser", JSON.stringify(u));
        window.location.href = "paiement.html";
      };

      list.appendChild(li);
    });
  });
}