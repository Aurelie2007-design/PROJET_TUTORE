import { apiFetch } from "../../../js/api.js";

async function getData() {
  try {
    const data = await apiFetch("/recette/jour");
    const donnee = await apiFetch("/recette/total");
    const nombre = await apiFetch("/getEtudiants", { method: "GET" });
    console.log(data, donnee, nombre);
    const total = document.getElementById("total");
    const recetteJour = document.getElementById("jour");
    const nombreEtudiants = document.getElementById("nombre");
    const moyenne = document.getElementById("moyenne");

    total.innerHTML = `${donnee[0].total}$ `;
    recetteJour.innerHTML = `${data[0].total_jour || 0}$`;
    nombreEtudiants.innerHTML = `${nombre.length}  etudiants inscrits`;
    moyenne.innerHTML = `${donnee[0].total / nombre.length}$`;
  } catch (error) {
    console.log(error);
  }
}

getData();

async function getStatSemaine() {
  try {
    const data = await apiFetch(`/stats/semaine`);
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
      // console.log(i, data[i].total);
      // console.log(i, nomJour);
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
  } catch (err) {
    console.log(err);
  }
}

getStatSemaine();
