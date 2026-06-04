import { apiFetch } from "../../../js/api.js";


function logout(){
    // localStorage.removeItem("token");
}


const user = JSON.parse(localStorage.getItem("selectedUser"));
if (!user) {
  alert("Rechercher d'abord un etudiant");
  window.location.href = "../recherche/recherche.html";
}
const logBtn = document.getElementById("logout");

// logBtn.addEventListener("click", logout());
const max_frais=(frais, montant)=>{
  apiFetch("/max_frais", {
    method: "POST",
    body: JSON.stringify({
      montant, frais
    })
  }).then(data =>{
    console.log((data = true));
    return data;
  }).catch(err=>{
    console.log("une erreur est survenue ", err)
  })
};

document.getElementById("payer").addEventListener("click", payer);
function payer() {
  const montant = document.getElementById("montant").value;
  const motif = document.getElementById("select").value;
  const boite = document.getElementById("parent");
  const i = max_frais(motif, montant);
  if (i != false){
    apiFetch("/payer", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        montant,
        motif
      })
    })
    .then(data => {
      alert(data.message);
      document.getElementById("montant").value = "";
      document.getElementById("motif").value = "";
      localStorage.removeItem("selectedUser")
    })  .catch(error => {
      console.log("une erreur est survenue", error);
      })
  }else{
    // boite.getElementById("error").innerText = `Enter un`;
    alert("le montant depasse les frais");
  }
};

const fraisUser = function(){
  apiFetch("/paiements", {
    method: "POST",
    body: JSON.stringify({
      user_id: user.id
    })
  }).then(data => {
    console.log("frais de l'utilisateur", data);
    for (let i = 0; i < data.length; i++) {
      const elements = data[i];
      // console.log(elements);
    }
    const tableau = {};
    const frais_user = [];
    data.forEach(i => {
      if (!tableau[i.frais_nom]) {
        if (i.montant == null) {
          tableau[i.frais_nom] = 0;
        }else{
          tableau[i.frais_nom] = i.montant;
        }
      }else{
        tableau[i.frais_nom] += i.montant; 
      }
        frais_user.push(i.frais_nom);
      
    });
    const boite = document.getElementById("nom");
    const etudiant_frais = document.getElementById("etudiant");
    const mon_select = document.getElementById("select");
    boite.innerHTML += `<p>${data[1].user_nom}  ${data[1].postnom}  ${data[1].prenom}</p>`
    data.forEach(i=>{
      etudiant_frais.innerHTML += `
                            <div class="content1">
                                <div class="left">
                                    <p>${i.frais_nom}</p>
                                </div>
                                <div class="right">
                                <div class="millieu">
                                    <p>${i.frais_montant}$</p>
                                </div>
                                <div class="millieu">
                                    <p>${tableau[i.frais_nom]}$</p>
                                </div>
                                <div class="reste">
                                    <p>${i.reste}$</p>
                                </div>
                                <div class="">
                                    <p>${(tableau[i.frais_nom] / i.frais_montant) * 100}%</p>
                                </div>
                                </div>
                            </div>
      `;
    });
    for (let i = 0; i < frais_user.length; i++) {
      const element = frais_user[i];
      mon_select.innerHTML += `
        <option value="${element}">${element}</option>
      `
      
    }

  })
    
  .catch(err=>{
    console.log("une erreur est survenue", err);
  })};

fraisUser();

document.getElementById("changer_etudiant").addEventListener("click", ()=>{
  localStorage.removeItem("selectedUser");
  window.location.href = "../recherche/recherche.html";
})
