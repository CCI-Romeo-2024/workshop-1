/*<script src="src/js/lib/supaBase.js" type="module"></script>
<script src="src/js/lib/animateTable.js" type="module"></script>*/

import { animateTable } from "./lib/animateTable.js";
import { db } from "./lib/supaBase.js";
import notifSound from '../../assets/sounds/notification.mp3'


const scoreBoard = []

/*let defaultData = [
    {id: 14, name: 'Lucas', score: 9000},
    {id: 6, name: 'Olivia', score: 76543},
    {id: 7, name: 'Ava', score: 65432},
    {id: 2, name: 'Romeo', score: 234532},
    {id: 3, name: 'Correge', score: 123456},
    {id: 4, name: 'Mia', score: 34},
    {id: 1, name: 'Sacha', score: 43220},
    {id: 5, name: 'Liam', score: 87654},
    {id: 8, name: 'Noah', score: 54321},
    {id: 9, name: 'Sophia', score: 43210},
    {id: 10, name: 'James', score: 32109},
    {id: 11, name: 'William', score: 21000},
    {id: 12, name: 'Emma', score: 15000},
    {id: 13, name: 'Benjamin', score: 12000}
];*/

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

import gamecubeImg from '../../assets/img/consoles_preview/GAMECUBE.png'
import nesImg from  '../../assets/img/consoles_preview/NES.png'
import snesImg from  '../../assets/img/consoles_preview/SNES.png'
import wiiImg from  '../../assets/img/consoles_preview/WII.png'
import switchImg from  '../../assets/img/consoles_preview/SWITCH.png'
const avatar = {
    0: gamecubeImg,
    1: nesImg,
    2: snesImg,
    3: wiiImg,
    4: switchImg
}

const textes = [
    'est dans la place !'
]

const newNotif = (user) => {
    const doc = document.querySelector('body')

    const id = randomIntFromInterval(0, 999999)

    doc.innerHTML += `
<div class="notif" id="notif-${id}">
    <img src="${avatar[user.avatar]}" alt="avatar"/>
    <div class="text">${user.pseudo} ${textes[randomIntFromInterval(0, textes.length-1)]}</div>
</div>`

    const el = document.getElementById(`notif-${id}`)

    setTimeout(() => {
        el.classList.add('notif-active')

        let audio = new Audio(notifSound);
        audio.play();

        setTimeout(() => {
            el.classList.add('notif-end')

            setTimeout(() => {
                el.remove()
            }, 200)
        }, 1500)
    }, 200)


}

const tableAnimation = new animateTable('#table-body', '.row', Power1.easeInOut)

const getIndexOfClassement = (data) => {
    const scoreBoardOrder = []
    const aaa = [...data]

    aaa.sort((a, b) => (b.score - a.score))
    aaa.forEach((user, i) => {
        scoreBoardOrder.push(data.findIndex(e => e.id === user.id))
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
        ${element.pseudo}
    </div>
    <div class="col score">
        ${element.score.toLocaleString('fr-FR')}
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

const toggleClass = (element, token, condition) => {
    if(condition)
        element.classList.add(token)
    else
        element.classList.remove(token)
}

const reOderTableHtml = (table) => {
    const iOrder = getIndexOfClassement(table);

    iOrder.forEach((n, i) => {
        const element = document.getElementById(`table-${table[n].id}`)

        toggleClass(element, 'st', i === 0)
        toggleClass(element, 'nd', i === 1)
        toggleClass(element, 'rd', i === 2)

        if (i < 10) element.querySelector('.rank').innerHTML = ranks[i]

        element.style.order = i.toString();
    })

    tableAnimation.animate()
}



// class notif {
//     constructor(user) {
//
//     }
//
//
//
// }

// const newNotif = () => {
//
// }




(async () => {
    let { data: players, error } = await db
        .from('players')
        .select('id, pseudo, score, avatar')

    if (error) return console.error(error);

    createTable(players)

    reOderTableHtml(scoreBoard)
})()


const handleNewUsers = (payload) => {
    console.log('new User', payload)
    console.log('new User')

    // payload.new

    addRow({id: payload.new.id, pseudo: payload.new.pseudo, score: payload.new.score},
        document.getElementById('table-body'),
        scoreBoard);

    reOderTableHtml(scoreBoard)

    newNotif(payload.new)


}

const handleScoreChange = (payload) => {
    console.log('Score Change', payload)

    // payload.new

    editRow(payload.new.id, payload.new.score, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)
}

const dbEvents = db
    .channel('schema-db-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'players' }, handleNewUsers)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'players' }, handleScoreChange)
    .subscribe()


//
// setTimeout(() => {
//
// }, 1000)



//
// setTimeout(() => {
//     newNotif({id: 1, pseudo: 'Nico', score: 0, avatar: 0})
//
//
// }, 1000)


/*


setTimeout(() => {
    editRow(3, 1237693, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)

}, 2000)

setTimeout(() => {
    addRow({id: 15, name: 'Lucas', score: 200},
        document.getElementById('table-body'),
        scoreBoard);

    reOderTableHtml(scoreBoard)

}, 3000)

setTimeout(() => {
    editRow(8, 123782, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)
}, 4000)

setTimeout(() => {
    editRow(15, 25782, 'table', scoreBoard)

    reOderTableHtml(scoreBoard)
}, 5000)


*/


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}


