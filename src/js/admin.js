function filtrer() {
    let filtre, tableau, ligne, cellule, i, texte;

    filtre = document.getElementById("maRecherche").value.toUpperCase();
    tableau = document.getElementById("tableau");
    ligne = tableau.getElementsByTagName("tr");

    for (i = 0; i < ligne.length; i++) {
        cellule = ligne[i].querySelector(".name");
        if (cellule) {
        texte = cellule.innerText;
        if (texte.toUpperCase().indexOf(filtre) > -1) {
            ligne[i].style.display = "";
        } else {
            ligne[i].style.display = "none";
        }
        }
    }
}
