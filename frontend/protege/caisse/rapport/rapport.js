import { apiFetch } from "../../../js/api.js";

async function getData() {
  try {
    const data = await apiFetch(`/paiments/jour_details`, { method: "GET" });
    console.log(data, "data");
    return data;
  } catch (error) {
    console.log(error, "erreur");
    return [];
  }
}

function grouperPaiements(data) {
  const result = {};

  const list = Array.isArray(data) ? data : data.data;

  list.forEach((p) => {
    if (!result[p.recu_id]) {
      result[p.recu_id] = {
        recu_id: p.recu_id,
        nom: p.nom,
        postnom: p.postnom,
        prenom: p.prenom,
        total: 0,
        paiements: [],
      };
    }

    result[p.recu_id].paiements.push({
      montant: p.montant,
      motif: p.motif,
      heure: p.heure,
    });

    result[p.recu_id].total += parseFloat(p.montant);
  });

  return Object.values(result);
}

function afficherPaiements(data) {
  const container = document.getElementById("contenu");
  container.innerHTML = "";

  data.forEach((recu) => {
    container.innerHTML += `
      <div class="recu">
        <h3>Reçu #${recu.recu_id}</h3>
        <p>${recu.nom} ${recu.postnom} ${recu.prenom}</p>
        <p><b>Total:</b> ${recu.total} $</p>

        <table border="1" width="100%">
          <tr>
            <th>Motif</th>
            <th>Montant</th>
            <th>Heure</th>
          </tr>

          ${recu.paiements
            .map(
              (p) => `
              <tr>
                <td>${p.motif}</td>
                <td>${p.montant}</td>
                <td>${p.heure}</td>
              </tr>
            `,
            )
            .join("")}
        </table>
        <hr>
      </div>
    `;
  });
}

async function init() {
  const data = await getData();
  const groupes = grouperPaiements(data);
  console.log(groupes);
  afficherPaiements(groupes);
}

init();
