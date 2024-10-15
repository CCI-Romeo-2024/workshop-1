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
]

const tableB = document.getElementById('table-body');

let sorters = {
    score : rs => rs.sort((a,b) =>
        parseFloat(b.querySelector("[headers='score']").dataset.score)
        -
        parseFloat(a.querySelector("[headers='score']").dataset.score)
    )
}

let rows = []

rows = [...document.querySelectorAll("tbody tr")]

const listen = () => {
    sorters["score"](rows), requestAnimationFrame(setupTable)
}

let ruler;

function setupTable(){
    let cell;
    rows.forEach((row,i) => {
        cell = row.querySelector("[data-score]");
        cell.textContent = parseInt(cell.dataset.score).toLocaleString("fr-FR", {minimumFractionDigits: 0});
        row.style.transform = `translateY(${ruler[i] - row.dataset.originalTop}px)`;
        row.querySelector("[headers='rank']").innerHTML = ranks[i];


    });
}

requestAnimationFrame(_ => {
    return ruler = rows.map(row => row.dataset.originalTop = row.getBoundingClientRect().top), setupTable()
});





document.getElementById("score").addEventListener("click", listen);


document.addEventListener("keypress", (e) => {
    if (e.key.toString().toLowerCase() === "a") {
        e.preventDefault();


        tableB.querySelectorAll('tr')[9].querySelector('[headers=\'score\']').dataset.score = "9999";

        listen()

        console.log('test')
    }

    console.log('test2')
})


