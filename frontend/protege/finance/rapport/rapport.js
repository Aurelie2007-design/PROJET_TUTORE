import { apiFetch } from "../../../js/api.js";

async function getData() {
  try {
    const data = await apiFetch("/etudiantEnOrdre", { method: "GET" });
    const donnee = await apiFetch("/fraisTotal");
    const total = await apiFetch("/recette/total", { method: "GET" });
    const depenseJour = await apiFetch("/depenseTotal");
    const divTotal = document.getElementById("total");
    const paye = document.getElementById("paye");
    const nombre = document.getElementById("nombre");
    const table = document.getElementById("myChart");
    const divAttendu = document.getElementById("pourcent_total");
    const divPaye = document.getElementById("pourcent_paye");
    const divReste = document.getElementById("reste_a_payer");
    const reste = donnee[0].total_expected - total[0].total;

    new Chart(table, {
      type: "pie",
      data: {
        labels: ["Total attendu", "Total payé"],
        datasets: [
          {
            data: [reste, total[0].total],
          },
        ],
      },
    });

    const totalDpense = depenseJour[0].total;
    const reste2 = total[0].total - totalDpense;
    const divAttendu2 = document.getElementById("all");
    const divPaye2 = document.getElementById("gone");
    const divReste2 = document.getElementById("remain");

    new Chart(document.getElementById("tableau"), {
      type: "pie",
      data: {
        labels: ["Total depensee", "Solde restant"],
        datasets: [
          {
            data: [totalDpense, reste2],
          },
        ],
      },
    });

    document.getElementById("alltotal").innerHTML =
      `${parseInt(total[0].total, 10)} $`;
    document.getElementById("allgone").innerHTML = `${parseInt(totalDpense)} $`;
    document.getElementById("allremain").innerHTML =
      `${parseInt(reste2, 10)} $`;

    divTotal.innerHTML = `${donnee[0].total_expected} $`;
    paye.innerHTML = `${total[0].total} $`;
    nombre.innerHTML = `${data.length} etudiants`;
    divAttendu.innerHTML = `${donnee[0].total_expected}$ (100%)`;
    divPaye.innerHTML = `${total[0].total}$ (${parseFloat((total[0].total * 100) / donnee[0].total_expected).toFixed(2)}%)`;
    divReste.innerHTML = `${reste}$ (${parseFloat((reste * 100) / donnee[0].total_expected).toFixed(2)}%)`;
    divAttendu2.innerHTML = `${total[0].total}$ (100%)`;
    divPaye2.innerHTML = `${totalDpense}$ (${parseFloat((totalDpense * 100) / total[0].total).toFixed(2)}%)`;
    divReste2.innerHTML = `${reste2}$ (${parseFloat((reste2 * 100) / total[0].total).toFixed(2)}%)`;
    console.log(total);
  } catch (error) {
    console.log(error);
  }
}

getData();
