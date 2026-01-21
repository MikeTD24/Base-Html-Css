// Sélection de tous les titres de rubrique
const titres = document.querySelectorAll(".rubrique-title");

// Pour chaque rubrique
titres.forEach(function (titre) {

    titre.addEventListener("click", function () {

        // On récupère la rubrique parente
        const rubrique = this.parentElement;

        // On récupère les articles de cette rubrique
        const articles = rubrique.querySelectorAll(".Article");

        // On affiche / masque les articles
        articles.forEach(function (article) {
            article.classList.toggle("hidden");
        });

    });

});
