import { apiFetch } from "../../../js/api.js";

async function getData() {
  try {
    const data = await apiFetch("/etudiantEnOrdre", { method: "GET" });
    const donnee = await apiFetch("/fraisTotal");
    const total = await apiFetch("/recette/total", { method: "GET" });
    console.log(data, donnee, total);
    const divTotal = document.getElementById("total");
    const paye = document.getElementById("paye");
    const nombre = document.getElementById("nombre");
    const table = document.getElementById("myChart");
    const divAttendu = document.getElementById("pourcent_total");
    const divPaye = document.getElementById("pourcent_paye");
    const divReste = document.getElementById("reste_a_payer");
    const reste = donnee[0].total_expected - total[0].total;
    console.log(reste);

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

    divTotal.innerHTML = `${donnee[0].total_expected} $`;
    paye.innerHTML = `${total[0].total} $`;
    nombre.innerHTML = `${data.length} etudiants`;
    divAttendu.innerHTML = `${donnee[0].total_expected}$ (100%)`;
    divPaye.innerHTML = `${total[0].total}$ (${parseFloat((total[0].total * 100) / donnee[0].total_expected).toFixed(2)}%)`;
    divReste.innerHTML = `${reste}$ (${parseFloat((reste * 100) / donnee[0].total_expected).toFixed(2)}%)`;
    console.log(total);
  } catch (error) {
    console.log(error);
  }
}

getData();
