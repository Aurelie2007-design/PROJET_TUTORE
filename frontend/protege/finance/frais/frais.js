import { apiFetch } from "../../../js/api.js";

document.getElementById("formFrais").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const description = document.getElementById("description").value;
  const montant = document.getElementById("montant").value;

  const classes = Array.from(
    document.querySelectorAll("#classesList input:checked"),
  ).map((c) => parseInt(c.value));

  // validation simple frontend
  if (!nom || !montant || classes.length === 0) {
    alert("Remplis tous les champs !");
    return;
  }

  apiFetch("/createFrais", {
    method: "POST",
    body: JSON.stringify({
      nom,
      description,
      montant,
      classes,
    }),
  })
    .then((res) => {
      alert("Frais créé avec succès");

      // reset form
      document.getElementById("formFrais").reset();
    })
    .catch((err) => {
      console.error(err);
      alert("Erreur lors de la création");
    });
});

// charger les classes

function loadClasses() {
  apiFetch("/getAllClasses")
    .then((data) => {
      const container = document.getElementById("classesList");
      container.innerHTML = "";

      data.forEach((classe) => {
        container.innerHTML += `
          <label>
            <input type="checkbox" value="${classe.id}" />
            ${classe.nom}
          </label>
        `;
      });
    })
    .catch((err) => console.error(err));
}

loadClasses();
