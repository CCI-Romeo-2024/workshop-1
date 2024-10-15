let defaultData = [
    { id: 14, name: 'Lucas', score: 9000 },
    { id: 6, name: 'Olivia', score: 76543 },
    { id: 7, name: 'Ava', score: 65432 },
    { id: 2, name: 'Romeo', score: 234532 },
    { id: 3, name: 'Alex', score: 123456 },
    { id: 4, name: 'Mia', score: 98765 },
    { id: 1, name: 'Sacha', score: 456432 },
    { id: 5, name: 'Liam', score: 87654 },
    { id: 8, name: 'Noah', score: 54321 },
    { id: 9, name: 'Sophia', score: 43210 },
    { id: 10, name: 'James', score: 32109 },
    { id: 11, name: 'William', score: 21000 },
    { id: 12, name: 'Emma', score: 15000 },
    { id: 13, name: 'Benjamin', score: 12000 }
];


const ranks = [
    '<div><span>1</span><span>ST</span></div>',
    '<div><span>2</span><span>ND</span></div>',
    '<div><span>3</span><span>RD</span></div>',
    '<div><span>4</span><span>TH</span></div>',
    '<div><span>5</span><span>TH</span></div>',
    '<div><span>6</span><span>TH</span></div>',
    '<div><span>7</span><span>TH</span></div>',
    '<div><span>8</span><span>TH</span></div>',
    '<div><span>9</span><span>TH</span></div>',
    '<div><span>10</span><span>TH</span></div>'
];

const scoreBoard = []






/*const createTable = (table) => {
    const tableB = document.getElementById('table-body');

    tableB.innerHTML = '';

    table.forEach((data, i) => {
        if (i > 10) return;
        tableB.innerHTML += `
<tr data-id="${data.id}">
    <td headers="rank">XXX</td>
    <td headers="name">${data.name}</td>
    <td headers="score">${data.score}</td>
</tr>`
    })
}*/



/*
<div class="row" id="table-234563">
    <div class="col rank">
        2 TD
    </div>
    <div class="col name">
        Romeo
    </div>
    <div class="col score">
        234532
    </div>
</div>
*/



/*
createTable(defaultData)

const sortTable = (table) => {
    const newTable = [...table];

    newTable.sort((a, b) => b.score - a.score);

    return newTable;
}


document.addEventListener("keypress", (e) => {
    if (e.key.toString().toLowerCase() === "a") {
        e.preventDefault();

        createTable(sortTable(defaultData))
    }

    console.log('test2')
})*/


