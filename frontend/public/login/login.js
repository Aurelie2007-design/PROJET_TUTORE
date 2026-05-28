function login() {
  const matricule = document.getElementById("matricule").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.innerText = "";

  // validation simple
  if (!matricule || !password) {
    error.innerText = "Remplis tous les champs";
    return;
  }

  if (password.length < 8) {
    error.innerText = "Mot de passe doit faire 8 caractères";
    return;
  }

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ matricule, password })
  })
  .then(res => res.json())
  .then(data => {

    if (!data.token) {
      error.innerText = "Identifiants incorrects";
      return;
    }

    // sauvegarde token
    localStorage.setItem("token", data.token);

    // décoder JWT
    const payload = JSON.parse(atob(data.token.split('.')[1]));

    redirectUser(payload.role);

  })
  .catch(() => {
    error.innerText = "Erreur serveur";
  });
}

function redirectUser(role) {
  if (role === "etudiant") {
    window.location.href = "../../protege/etudiant/dashboard/dashboard.html";
  }

  if (role === "caissier") {
    window.location.href = "../../protege/caisse/tableauDeBord/tableauDeBord.html";
  }

  if (role === "directeur") {
    window.location.href = "../../protege/finance/tableauDeBord/tableauDeBord.html";
  }
}