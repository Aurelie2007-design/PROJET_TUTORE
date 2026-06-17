import { apiFetch } from "../../../js/api.js";

async function getData() {
  try {
    const data = await apiFetch("/recette/jour");
    const donnee = await apiFetch("/recette/total");
    const nombre = await apiFetch("/getEtudiants", { method: "GET" });
    const depenseJour = await apiFetch("/depenseDuJour");
    const depenseTotal = await apiFetch("/depenseTotal");
    const total = document.getElementById("total");
    const recetteJour = document.getElementById("jour");
    const nombreEtudiants = document.getElementById("nombre");
    const moyenne = document.getElementById("moyenne");
    const depjour = parseInt(depenseJour[0].total, 10) || 0;
    const totjour = data[0].total_jour || 0;
    const reste = totjour - depjour;
    const div1 = document.getElementById("all");
    const div2 = document.getElementById("gone");
    const div3 = document.getElementById("remain");

    div1.innerHTML = `Encaissement total du jour: ${parseInt(totjour, 10) || 0}$`;
    div2.innerHTML = `Depense total du jour: ${depjour}$`;
    div3.innerHTML = `Reste: ${reste}$`;

    total.innerHTML = `${donnee[0].total || 0}$ `;
    recetteJour.innerHTML = `${data[0].total_jour || 0}$`;
    moyenne.innerHTML = `${parseInt(depenseTotal[0].total, 10) || 0}$`;
    nombreEtudiants.innerHTML = `${depjour}$`;
    new Chart(document.getElementById("table"), {
      type: "pie",
      data: {
        labels: ["Reste encaisse", "Total depensee"],
        datasets: [
          {
            data: [depjour, reste],
          },
        ],
      },
    });
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
