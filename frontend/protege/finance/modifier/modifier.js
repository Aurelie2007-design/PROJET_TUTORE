import { apiFetch } from "../../../js/api.js";

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

function loadUser() {
  apiFetch(`/modify`, {
    method: "POST",
    body: JSON.stringify({ id: userId }),
  })
    .then((user) => {
      console.log(user);
      document.getElementById("nom").value = user[0].nom;
      document.getElementById("prenom").value = user[0].prenom;
      document.getElementById("postnom").value = user[0].postnom;
      document.getElementById("email").value = user[0].email;
      document.getElementById("password").value = user[0].password;
      document.getElementById("date_naissance").value = user[0].date_naissance;
    })
    .catch((err) => console.error(err));
}

loadUser();

document.getElementById("formEdit").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    postnom: document.getElementById("postnom").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    date_naissance: document.getElementById("date_naissance").value,
    id: userId,
  };

  apiFetch(`/updateUser`, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(() => {
      alert("Utilisateur modifié");

      window.location.href = "../utilisateurs/utilisateurs.html";
    })
    .catch((err) => console.error(err));
});
