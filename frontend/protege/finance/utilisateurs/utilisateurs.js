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
                            <td><span class="badge badge-active">${i.status}</span></td>
                            <td class="actions">
                            <button class="btn-icon">
                            <i class="fa-solid fa-pen modifier" ${i.id}></i>
                            </button>
                            <button class="btn-icon text-red supprimer" id="${i.id}">
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

document.getElementById("").addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const btn = e.target.closest(".delete");
    const id = btn.dataset.id;

    if (!confirm("Supprimer cet utilisateur ?")) return;

    apiFetch(`/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Utilisateur supprimé");
        afficher();
      })
      .catch((err) => console.error(err));
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".edit")) {
    const btn = e.target.closest(".edit");
    const id = btn.dataset.id;

    const nouveauNom = prompt("Nouveau nom ?");
    if (!nouveauNom) return;

    apiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ nom: nouveauNom }),
    })
      .then(() => {
        alert("Utilisateur modifié");
        afficher();
      })
      .catch((err) => console.error(err));
  }
});
