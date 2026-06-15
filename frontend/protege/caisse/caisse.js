const token = localStorage.getItem("token");
if (!token) {
  alert("access refuse");
  window.location.href = "../../../public/login/login.html";
} else {
  // console.log(JSON.parse(atob(token.split('.')[1])).role)
  const role = JSON.parse(atob(token.split(".")[1])).role;
  if (role !== "caissier") {
    alert("vous ne pouver voir la page");
    if (role == "directeur") {
      window.location.href = "../../finance/tableauDeBord/tableauDeBord.html";
    } else {
      window.location.href = "../../etudiant/dashboard/dashboard.html";
    }
  }
}

const links = document.getElementsByClassName("link");
const myTableLinks = Array.from(links);
myTableLinks.forEach((i) => {
  const id = i.getAttribute("id");
  i.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = `../${id}/${id}.html`;
  });
});

const themeToggleButton = document.getElementById("changetheme");
const body = document.body;

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "lighttheme");
} else {
}
body.classList.add(localStorage.getItem("theme"));
themeToggleButton.addEventListener("click", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "lighttheme") {
    body.classList.remove("lighttheme");
    body.classList.add("darktheme");
    localStorage.setItem("theme", "darktheme");
  } else {
    body.classList.remove("darktheme");
    body.classList.add("lighttheme");
    localStorage.setItem("theme", "lighttheme");
  }
});

const today = new Date();

const divDate = document.getElementById("today");
divDate.innerHTML = `${today.toLocaleDateString("fr-FR", {
  weekday: "long",
  timeZone: "UTC",
})} ${new Intl.DateTimeFormat("fr-FR").format(today)}`;

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location = "../../../public/login/login.html";
});
