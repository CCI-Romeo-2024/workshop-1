/*<script src="src/js/lib/supaBase.js" type="module"></script>
<script src="src/js/lib/animateTable.js" type="module"></script>*/

import { animateTable } from "./lib/animateTable.js";
import { db } from "./lib/supaBase.js";

import notifSound from '../../assets/sounds/notification.mp3'

import gamecubeImg from '../../assets/img/consoles_preview/GAMECUBE.png'
import nesImg from  '../../assets/img/consoles_preview/NES.png'
import snesImg from  '../../assets/img/consoles_preview/SNES.png'
import wiiImg from  '../../assets/img/consoles_preview/WII.png'
import switchImg from  '../../assets/img/consoles_preview/SWITCH.png'

const scoreBoard = []
const notifications = []

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

const avatar = {
    0: gamecubeImg,
    1: snesImg,
    2: nesImg,
    3: wiiImg,
    4: switchImg
}

document.addEventListener('keypress', e => {
    if (e.key.toLowerCase() === 'f')
        toggleFullscreen()
})

function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

const textes = [
    'est dans la place !',
    'est là pour du fun !',
    'est dans le game !',
    'est prêt à jouer !',
    'est là pour le défi !',
    'est dans l\'arène !',
    'est là pour le high score !'
]

const newNotif = (user) => {

    if (notifications.length) {
        const notif = notifications.pop()
        
        clearTimeout(notif.timeout)

        notif.voice.cancel()

        clearNotif(notif.element)
    }

    const doc = document.querySelector('body')

    const id = randomIntFromInterval(0, 999999)

    doc.innerHTML += `
<div class="notif" id="notif-${id}">
    <img src="${avatar[user.avatar]}" alt="avatar"/>
    <div class="text">${user.pseudo} ${textes[randomIntFromInterval(0, textes.length-1)]}</div>
</div>`

    const el = document.getElementById(`notif-${id}`)


    // notifications.push({fun: })

    setTimeout(() => {
        el.classList.add('notif-active')

        let audio = new Audio(notifSound);
        audio.play();

        // let voice = new Audio('');

        const utterance = new SpeechSynthesisUtterance(`${user.pseudo} est dans la place !`);

        // const voices = speechSynthesis.getVoices();

        speechSynthesis.speak(utterance);


        const aaa = setTimeout(() => {
            clearNotif(el);

            notifications.pop();

        }, 3000)

        notifications.push({element: el, timeout: aaa, voice: speechSynthesis})
    }, 200)
}

function clearNotif(el) {
    el.classList.add('notif-end')

    setTimeout(() => {
        el.remove()
    }, 200)
}

// setTimeout(() => {
//     newNotif({pseudo: 'Sacha', avatar: 1})
// }, 2000)

// setTimeout(() => {
//     newNotif({pseudo: 'Bastien', avatar: 0})
// }, 6000)


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


