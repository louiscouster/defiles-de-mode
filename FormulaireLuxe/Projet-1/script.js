const photoPrincipale = document.querySelector("#photo-principale");
const vignettes = document.querySelectorAll(".vignette");
const flechePrecedente = document.querySelector("#fleche-gauche");
const flecheSuivante = document.querySelector("#fleche-droite");
const legende = document.querySelector("#legende-look");
const boutonDetails = document.querySelector("#btn-details");
const panneauDetails = document.querySelector("#panneau-details");
const boutonFavori = document.querySelector("#btn-favori");
const listeFavoris = document.querySelector("#liste-favoris");


function afficherLook(vignette) {
 
  document.querySelector(".vignette.active").classList.remove("active");
  vignette.classList.add("active");

 
  photoPrincipale.src = vignette.src;
  photoPrincipale.alt = vignette.alt;

  legende.textContent = vignette.dataset.nom;

  photoPrincipale.animate(
    [
      { opacity: 0, offset: 0 },
      { opacity: 0.6, offset: 0.4 },
      { opacity: 1, offset: 1 },
    ],
    { duration: 500, easing: "ease-out" },
  );
}

vignettes.forEach((vignette) => {
  vignette.addEventListener("click", (event) => {
 
    afficherLook(event.currentTarget);
  });
});


flecheSuivante.addEventListener("click", () => {
  const actuel = document.querySelector(".vignette.active");
 
  const suivante =
    actuel.nextElementSibling || document.querySelector(".vignette");
  afficherLook(suivante);
});

flechePrecedente.addEventListener("click", () => {
  const actuel = document.querySelector(".vignette.active");

  const precedente =
    actuel.previousElementSibling ||
    document.querySelector(".vignette:last-child");
  afficherLook(precedente);
});


boutonDetails.addEventListener("click", () => {
  const estCache = panneauDetails.classList.toggle("hidden");
  boutonDetails.textContent = estCache
    ? "Voir les détails"
    : "Masquer les détails";
});


function afficherToast(message) {
  const ancien = document.querySelector(".toast");
  if (ancien) {
    ancien.remove();
  }


  const toast = document.createElement("aside");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);


  const animation = toast.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(1rem)" },
    ],
    { duration: 400, delay: 2000, fill: "forwards" },
  );

  animation.finished.then(() => toast.remove());
}


boutonFavori.addEventListener("click", () => {
  const nom = document.querySelector(".vignette.active").dataset.nom;

  if (listeFavoris.querySelector(`[data-nom="${nom}"]`)) {
    afficherToast(nom + " est déjà dans tes favoris");
    return;
  }


  const favori = document.createElement("span");
  favori.className = "favori";
  favori.dataset.nom = nom;

  const texte = document.createElement("span");
  texte.textContent = nom;

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.type = "button";
  boutonSupprimer.className = "btn-supprimer";
  boutonSupprimer.textContent = "×";
  boutonSupprimer.setAttribute("aria-label", "Retirer " + nom);

  favori.append(texte, boutonSupprimer);
  listeFavoris.append(favori);

  afficherToast(nom + " ajouté aux favoris");
});

listeFavoris.addEventListener("click", (event) => {
  const bouton = event.target.closest(".btn-supprimer");

 
  if (!bouton) {
    return;
  }

  bouton.closest(".favori").remove();
});

