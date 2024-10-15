let defaultData = [
    { id: 1, name: 'Sacha', score: 456432 },
    { id: 2, name: 'Romeo', score: 234532 },
    { id: 3, name: 'Alex', score: 123456 },
    { id: 4, name: 'Mia', score: 98765 },
    { id: 5, name: 'Liam', score: 87654 },
    { id: 6, name: 'Olivia', score: 76543 },
    { id: 7, name: 'Ava', score: 65432 },
    { id: 8, name: 'Noah', score: 54321 },
    { id: 9, name: 'Sophia', score: 43210 },
    { id: 10, name: 'James', score: 32109 },
    { id: 11, name: 'William', score: 21000 },
    { id: 12, name: 'Emma', score: 15000 },
    { id: 13, name: 'Benjamin', score: 12000 },
    { id: 14, name: 'Lucas', score: 9000 }
];

const tableBody = document.getElementById('table-body');

// Fonction pour générer le tableau (affiche les 10 premiers résultats)
function generateTable(data) {
    data.slice(0, 10).forEach((item, index) => {
        let row = document.querySelector(`.row[data-id="${item.id}"]`);
        if (!row) {
            row = document.createElement('div');
            row.className = 'row';
            row.dataset.id = item.id;
            row.innerHTML = `
                    <div class="col rank">${index + 1}</div>
                    <div class="col name">${item.name}</div>
                    <div class="col score" headers="score" data-score="${item.score}">
                        ${item.score.toLocaleString('fr-FR', { minimumFractionDigits: 0 })}
                    </div>
                `;
            tableBody.appendChild(row);
        } else {
            // Mettre à jour les données existantes (ne pas recréer la ligne)
            row.querySelector('.col.rank').textContent = index + 1;
            row.querySelector('.col.score').textContent = item.score.toLocaleString('fr-FR', { minimumFractionDigits: 0 });
        }
    });

    // Ne pas mettre à jour ici les positions, on les réinitialisera avant l'animation
}

// Fonction de tri des données
function sortData() {
    return defaultData.sort((a, b) => b.score - a.score); // Tri décroissant par score
}

// Fonction pour gérer l'animation et l'affichage du tableau
function setupTable() {
    const rows = [...document.querySelectorAll(".table-body .row")];
    const sortedData = sortData();

    // Réinitialiser les positions d'origine avant de recalculer
    resetTransforms(); // Remet les styles `transform` à zéro
    updateRowPositions(); // Recalculer les positions après avoir réinitialisé les transformations

    rows.forEach((row, i) => {
        const sortedIndex = sortedData.findIndex(item => item.id == row.dataset.id);
        const newTop = document.querySelectorAll(".table-body .row")[sortedIndex].getBoundingClientRect().top;
        const originalTop = row.dataset.originalTop;
        row.style.transition = "transform 0.5s ease"; // Appliquer l'animation
        row.style.transform = `translateY(${newTop - originalTop}px)`;
    });
}

// Réinitialiser les transformations
function resetTransforms() {
    const rows = document.querySelectorAll(".table-body .row");
    rows.forEach(row => {
        row.style.transition = "none"; // Désactiver les transitions
        row.style.transform = "none"; // Remettre la transformation à zéro
    });
}

// Initialisation des positions
function updateRowPositions() {
    const rows = document.querySelectorAll(".table-body .row");
    rows.forEach(row => {
        row.dataset.originalTop = row.getBoundingClientRect().top;
    });
}

// Générer le tableau initial avec les 10 premiers utilisateurs triés
generateTable(sortData());
updateRowPositions(); // Calculer les positions initiales des lignes

// Event listener pour modifier le score de l'utilisateur avec l'ID 2 (Romeo) en appuyant sur 'A'
document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'a') {
        // Trouver l'utilisateur avec l'ID 2 (Romeo) et modifier son score
        defaultData.find(item => item.id === 2).score = 100000;

        requestAnimationFrame(() => {
            generateTable(sortData()); // Générer le tableau avec les données triées
            resetTransforms(); // Réinitialiser les transformations
            updateRowPositions(); // Réinitialiser les positions d'origine
            setupTable(); // Lancer l'animation
        });
    }

    // Ajouter un nouvel utilisateur avec un score de 0 en appuyant sur 'E'
    if (e.key.toLowerCase() === 'e') {
        const newName = `User ${defaultData.length + 1}`;
        defaultData.push({ id: defaultData.length + 1, name: newName, score: 0 });
        requestAnimationFrame(() => {
            generateTable(sortData()); // Générer le tableau avec les données triées
            resetTransforms(); // Réinitialiser les transformations
            updateRowPositions(); // Réinitialiser les positions d'origine
            setupTable(); // Lancer l'animation
        });
    }
});

// Event listener pour cliquer sur le score et réactualiser l'ordre
document.getElementById('score').addEventListener('click', () => {
    requestAnimationFrame(() => {
        generateTable(sortData()); // Générer le tableau avec les données triées
        resetTransforms(); // Réinitialiser les transformations
        updateRowPositions(); // Réinitialiser les positions d'origine
        setupTable(); // Lancer l'animation
    });
});
