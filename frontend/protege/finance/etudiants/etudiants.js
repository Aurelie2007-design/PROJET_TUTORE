import { apiFetch } from "../../../js/api.js";

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
console.log(payload);
if (!token) {
  alert("access refuse");
  window.location.href = "../../../public/login/login.html";
} else {
  const role = JSON.parse(atob(token.split(".")[1])).role;
  if (role !== "directeur") {
    alert("vous ne pouver voir la page");
    if (role == "caissier") {
      window.location.href = "../../finance/tableauDeBord/tableauDeBord.html";
    } else {
      window.location.href = "../../etudiant/dashboard/dashboard.html";
    }
  }
}
async function getData() {
  try {
    const data = apiFetch("/getAllClasses");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

getData();

async function afficher() {
  try {
    const data = await getData();
    const div = document.getElementById("select");
    data.forEach((i) => {
      div.innerHTML += `<option value="${i.id}">${i.nom}</option>`;
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

afficher();

function generateMatricule() {
  return Math.floor(10000 + Math.random() * 90000); // 5 chiffres
}

function generateStrongPassword() {
  return Math.floor(10000000 + Math.random() * 90000000); // 8 chiffres
}

function generatePassword(length = 12) {
  const upper = "ABCDE@#FGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijk_lmnopqrstuvwxyz";
  const numbers = "0123%456789";

  const all = upper + lower + numbers;

  let password = "";

  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

document.getElementById("formUser").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (!email.includes("@")) {
    alert("Email invalide");
    return;
  }

  let nom = document.getElementById("nom").value;
  const postnom = document.getElementById("postnom").value;
  const prenom = document.getElementById("prenom").value;
  const date = document.getElementById("date_naissance").value;
  const select = document.getElementById("select").value;

  const user = {
    nom: nom,
    postnom: postnom,
    prenom: prenom,
    email: email,
    date_naissance: date,
    matricule: generateMatricule(),
    password: generatePassword(),
    classe: select,
  };

  console.log(user);

  document.getElementById("resultat").innerHTML = `
    <strong>Compte créé :</strong><br>
    Matricule : ${user.matricule} <br>
    Mot de passe : ${user.password}
  `;

  await apiFetch("/create-user", {
    method: "POST",
    body: JSON.stringify(user),
  });
});
