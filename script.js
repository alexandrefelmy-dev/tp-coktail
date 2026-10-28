const bouton = document.getElementById("bombe");
const statut = document.getElementById("statut");
const compteur = document.querySelector(".compteur");
const cases = document.querySelectorAll(".ingredient input");

// Le bouton n'est actif que lorsque tous les ingrédients sont cochés
// (sur une page sans ingrédients, il est directement actif)
function majIngredients() {
    const coches = [...cases].filter((c) => c.checked).length;
    const pret = coches === cases.length;

    if (compteur) {
        compteur.textContent = `${coches}/${cases.length} ingrédients prêts`;
    }
    bouton.disabled = !pret;
    statut.textContent = pret ? "" : "Coche tous les ingrédients pour allumer la mèche.";
}

cases.forEach((c) => c.addEventListener("change", majIngredients));
majIngredients();

// Compte à rebours puis explosion
bouton.addEventListener("click", () => {
    const texteInitial = bouton.textContent;
    let reste = 3;

    bouton.disabled = true;
    statut.textContent = "La bombe a été posée...";
    bouton.textContent = reste;

    const minuteur = setInterval(() => {
        reste--;
        if (reste > 0) {
            bouton.textContent = reste;
            return;
        }

        clearInterval(minuteur);
        bouton.textContent = "BOOM";
        statut.textContent = "Target Successfully Bombed!";
        document.body.classList.add("boom");

        setTimeout(() => {
            document.body.classList.remove("boom");
            bouton.textContent = texteInitial;
            cases.forEach((c) => (c.checked = false));
            majIngredients();
        }, 2500);
    }, 1000);
});
