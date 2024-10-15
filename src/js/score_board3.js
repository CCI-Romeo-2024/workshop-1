const scoreBoard = []

let defaultData = [
    { id: 14, name: 'Lucas', score: 9000 },
    { id: 6, name: 'Olivia', score: 76543 },
    { id: 7, name: 'Ava', score: 65432 },
    { id: 2, name: 'Romeo', score: 234532 },
    { id: 3, name: 'Alex', score: 123456 },
    { id: 4, name: 'Mia', score: 34 },
    { id: 1, name: 'Sacha', score: 235 },
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

const tableAnimation = new animateTable('#table-body', '.row', Power1.easeInOut)

const getIndexOfClassement = (data) => {
    const scoreBoardOrder = []
    const aaa = [...data]

    aaa.sort((a, b) => (b.score - a.score))
    aaa.forEach((user, i) => {
        scoreBoardOrder.push(data.findIndex(e => e === user))
    })

    return scoreBoardOrder
}

const getRowHtml = (element) => {
    return `
<div class="row" id="table-${element.id}">
    <div class="col rank">
        X XX
    </div>
    <div class="col name">
        ${element.name}
    </div>
    <div class="col score">
        ${element.score}
    </div>
</div>`
}

const addRow = (element, dom, list) => {
    list.push(element)

    dom.innerHTML += getRowHtml(element);

    // stableAnimation.setupAnimation()
}

const editRow = (id, newScore, key, list) => {
    list.find(e => e.id === id).score = newScore

    const element = document.getElementById(`${key}-${id}`)

    element.querySelector('.score').innerText = newScore

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

const reOderTableHtml = (table) => {
    const iOrder = getIndexOfClassement(table);

    iOrder.forEach((n, i) => {
        const element = document.getElementById(`table-${table[n].id}`)
   /*     if (i < 3)
            element.classList.add('sticky');
        else
            element.classList.remove('sticky');*/

        if (i >= 10)
            element.style.display = 'none'
        else {
            element.style.display = 'flex'
            element.querySelector('.rank').innerHTML = ranks[i]
        }

        element.style.order = i.toString();


    })

    tableAnimation.animate()
}



createTable(defaultData)

reOderTableHtml(scoreBoard)




setTimeout(() => {
    editRow(3, 1237693, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)

}, 2000)

setTimeout(() => {
    addRow({ id: 15, name: 'Lucas', score: 200 },
         document.getElementById('table-body'),
         scoreBoard);

    reOderTableHtml(scoreBoard)

}, 3000)

setTimeout(() => {
    editRow(8, 123782, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)
}, 4000)

setTimeout(() => {
    editRow(15, 15782, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)
}, 5000)






