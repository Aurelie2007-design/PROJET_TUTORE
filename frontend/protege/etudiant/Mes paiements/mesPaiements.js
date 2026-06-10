import { apiFetch } from "../../../js/api.js";

const token = localStorage.getItem("token");

const terme = JSON.parse(atob(token.split(".")[1]));
console.log(terme);
const matricule = terme.matricule;
const user_id = terme.id;

async function getData() {
  try {
    const data = await apiFetch("/mes_paiements_details", {
      method: "POST",
      body: JSON.stringify({ user_id: user_id }),
    });
    console.log(data, "data");
    return data;
  } catch (error) {
    console.log(error, "erreur");
    return [];
  }
}

function grouperPaiements(data) {
  const result = {};
  console.log(data);
  const list = Array.isArray(data) ? data : data.data;
  list.forEach((p) => {
    if (!result[p.recu_id]) {
      const date = new Date(p.heure);
      const jour = date.toLocaleDateString();
      result[p.recu_id] = {
        recu_id: p.recu_id,
        nom: p.nom,
        postnom: p.postnom,
        prenom: p.prenom,
        total: 0,
        heure: jour,
        paiements: [],
      };
    }

    result[p.recu_id].paiements.push({
      montant: p.montant,
      motif: p.motif,
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
        <p>${recu.heure}</p>
        <p><b>Total:</b> ${recu.total} $</p>
        <a href="../../../public/assets/${recu.recu_id}.pdf">voir et telecharger le recu en pdf</a>

        <table border="1" width="100%">
          <tr>
            <th>Motif</th>
            <th>Montant</th>
            <th>Devise</th>
          </tr>

          ${recu.paiements
            .map(
              (p) => `
              <tr>
                <td>${p.motif}</td>
                <td>${p.montant}</td>
                <td>Dollard Americain ($)</td>
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
