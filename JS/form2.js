// Récupération du formulaire et de la zone d'erreur
const form = document.querySelector("form");
const error = document.querySelector("#error");

form.addEventListener("submit", function (event) {

    // Nettoyage du message d'erreur
    error.textContent = "";

    // Récupération des champs
    const nom = document.querySelector("#nom-id").value.trim();
    const prenom = document.querySelector("#prenom-id").value.trim();
    const mdp = document.querySelector("#mdp-id").value;
    const rmdp = document.querySelector("#rmdp-id").value;
    const genre = document.querySelector('input[name="genre"]:checked');

    // Vérification nom / prénom
    if (nom === "" || prenom === "") {
        error.textContent = "Veuillez remplir le nom et le prénom.";
        event.preventDefault();
        return;
    }

    // Vérification genre
    if (!genre) {
        error.textContent = "Veuillez sélectionner un genre.";
        event.preventDefault();
        return;
    }

    // Vérification longueur du mot de passe
    if (mdp.length < 6) {
        error.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
        event.preventDefault();
        return;
    }

    // Vérification correspondance des mots de passe
    if (mdp !== rmdp) {
        error.textContent = "Les mots de passe ne correspondent pas.";
        event.preventDefault();
        return;
    }

    // Si tout est OK
    alert("Formulaire prêt à être envoyé !");
});

