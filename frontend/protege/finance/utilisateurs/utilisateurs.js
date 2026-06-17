import { apiFetch } from "../../../js/api.js";

async function getData() {
  try {
    const data = await apiFetch("/getAllUsers");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function afficher() {
  try {
    const data = await getData();
    console.log(data);
    const container = document.getElementById("tableau");
    container.innerHTML = "";
    data.forEach((i) => {
      container.innerHTML += `
                            <tr>
                            <td><strong>${i.nom} ${i.prenom} ${i.postnom}</strong></td>
                            <td>${i.email}</td>
                            <td>${i.role}</td>
                            <td><span class="badge badge-active status ${i.status}"  data-status="${i.status}" id= "${i.id}">${i.status}</span></td>
                            <td class="actions">
                            <button class="btn-icon">
                            <i class="fa-solid fa-pen edit" id="${i.id}"></i>
                            </button>
                            <button class="btn-icon text-red delete" id="${i.id}">
                            <i class="fa-solid fa-trash"></i>
                            </button>
                            </td>
                            </tr>
                            `;
    });
  } catch (error) {
    console.log(error);
  }
}

afficher();

document.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const btn = e.target.closest(".delete");
    const id = btn.id;

    console.log("Supprimer ID:", id);

    if (!confirm("Supprimer cet utilisateur ?", id)) return;

    apiFetch(`/deleteUser`, {
      method: "POST",
      body: JSON.stringify({ id: id }),
    }).then(() => {
      alert("utilisateur  supprime");
      afficher();
    });
  }

  if (e.target.closest(".edit")) {
    const btn = e.target.closest(".edit");
    const id = btn.id;

    console.log("Modifier ID:", id);

    if (!confirm("Modifier cet utilisateur ?", id)) return;

    window.location.href = `../modifier/modifier.html?id=${id}`;
  }

  if (e.target.closest(".status")) {
    const btn = e.target.closest(".status");
    const id = btn.id;

    const currentStatus = btn.dataset.status;

    const newStatus = currentStatus === "actif" ? "inactif" : "actif";

    console.log(currentStatus, newStatus);

    apiFetch(`/changerStatus`, {
      method: "POST",
      body: JSON.stringify({ id: id, status: newStatus }),
    })
      .then(() => {
        afficher();
      })
      .catch((err) => console.error(err));
  }
});
