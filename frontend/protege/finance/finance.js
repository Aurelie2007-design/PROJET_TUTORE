const token = localStorage.getItem("token");
if (!token) {
  alert("access refuse");
  window.location.href = "../../../public/login/login.html";
} else {
  console.log(JSON.parse(atob(token.split(".")[1])).role);
  const role = JSON.parse(atob(token.split(".")[1])).role;
  if (role !== "directeur") {
    alert("vous ne pouver voir la page");
    if (role == "caisse") {
      window.location.href = "../../caisse/tableauDeBord/tableauDeBord.html";
    } else {
      window.location.href = "../../etudiant/dashBoard/dashBoard.html";
    }
  }
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location = "../../../public/login/login.html";
});

const today = new Date();

const divDate = document.getElementById("today");
divDate.innerHTML = `${today.toLocaleDateString("fr-FR", {
  weekday: "long",
  timeZone: "UTC",
})} ${new Intl.DateTimeFormat("fr-FR").format(today)}`;
