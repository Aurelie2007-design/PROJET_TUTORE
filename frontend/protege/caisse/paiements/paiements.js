import { apiFetch } from "../../../js/api.js";


function logout(){
    // localStorage.removeItem("token");
}


const user = JSON.parse(localStorage.getItem("selectedUser"));
const logBtn = document.getElementById("logout");


document.getElementById("payer").addEventListener("click", payer);
logBtn.addEventListener("click", logout());
function payer() {
  const montant = document.getElementById("montant").value;
  const motif = document.getElementById("motif").value;

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
  })  .catch(error => {
    console.log("une erreur est survenue", error);
    })}
