import { apiFetch } from "../../../js/api.js";

async function getTotal() {
  try {
    const data = await apiFetch(`/stats/jour`, { method: "GET" });

    const div1 = document.getElementById("content1");
    div1.innerText = `${data.total_jour || 0}$`;
    const div2 = document.getElementById("content2");
    div2.innerText = `${data.moyenne || 0}$`;
    const div3 = document.getElementById("content3");
    div3.innerText = `${data.nb_etudiants || 0}$`;
  } catch (error) {
    console.log(error);
  }
}
getTotal();

async function getPaiementsJour() {
  try {
    const data = await apiFetch(`/paiements/jour`);
    const div = document.getElementById("boite");
    const bouton = document.getElementById("voir-plus");
    console.log(data);
    if (data.length == 0) {
      div.innerHTML = `<div id="vide">Aucun paiement enregistre</div>`;
    } else {
      data.forEach((element) => {
        div.innerHTML += `
                  <div class="etudiant">
                    <div class="profile">
                      <img src="../../../public/assets/profile.jpg" />
                      <div class="indentite">
                        <h4>${element.nom} ${element.postnom} ${element.prenom}</h4>
                        <p>${element.heure}</p>
                      </div>
                    </div>

                    <div class="info">
                      <h5>${element.total}$</h5>
                      <p>${element.classe}</p>
                    </div>
                  </div>
      `;
      });
    }
    bouton.addEventListener("click", () => {
      window.location.href = "../rapport/rapport.html";
    });
  } catch (error) {
    console.log(error);
  }
}
getPaiementsJour();

async function getStatSemaine() {
  try {
    const data = await apiFetch(`/stats/semaine`);
    console.log(data, "data");
    const tableau = {};
    const labels = [];
    const values = [];
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].jour);
      const nomJour = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        timeZone: "UTC",
      });
      tableau[nomJour] = data[i].total;
      labels.push(nomJour);
      values.push(data[i].total);
      console.log(i, data[i].total);
      console.log(i, nomJour);
    }
    const jours = [
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
      "dimanche",
    ];

    const formattedData = jours.map((jour) => ({
      jour,
      total: parseFloat(tableau[jour] || 0),
    }));

    console.log(values);
    new Chart(document.getElementById("chart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Recette semaine",
            data: values,
          },
        ],
      },
    });
    console.log(values);
  } catch (err) {
    console.log(err);
  }
}

getStatSemaine();
