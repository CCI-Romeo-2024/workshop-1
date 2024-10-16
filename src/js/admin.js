import { db } from './lib/supaBase.js'



const getRowHtml = (element) => {
    return `
<tr>
    <td>X XX</td>
    <td class="name">${element.pseudo}</td>
    <td>${element.score.toLocaleString('fr-FR')}</td>
</tr>
`
}

const addRow = (element, dom, list) => {
    list.push(element)

    dom.innerHTML += getRowHtml(element);
}

const editRow = (id, newScore, key, list) => {
    list.find(e => e.id === id).score = newScore

    const element = document.getElementById(`${key}-${id}`)

    element.querySelector('.score').innerText = newScore.toLocaleString('fr-FR')

    tableAnimation.setupAnimation()
}

const createTable = (table) => {
    const tableB = document.getElementById('table-body');

    tableB.innerHTML = '';

    table.forEach((data) => {

        addRow(data, tableB, scoreBoard);

    })

    tableAnimation.setupAnimation()
}

const handleNewUsers = (payload) => {
    addRow(
        {id: payload.new.id, pseudo: payload.new.pseudo, score: payload.new.score},
        document.getElementById('table-body'),
        scoreBoard);

}

const handleScoreChange = (payload) => {

    editRow(payload.new.id, payload.new.score, 'table', scoreBoard)

}

const dbEvents = db
    .channel('schema-db-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'players' }, handleNewUsers)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'players' }, handleScoreChange)
    .subscribe()


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
