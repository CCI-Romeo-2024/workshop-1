import { db } from './lib/supaBase.js'


const registerForm = document.getElementById('register-form');
const registerBtn = document.getElementById('register-btn');


registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(splide.index)

})

registerBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    console.log(registerForm.pseudonyme.value); // -> Submit

    if (registerForm.pseudonyme.value.length === 0) return false;

    const { data, error } = await db
        .from('players')
        .insert([
            {
                pseudo: registerForm.pseudonyme.value,
                avatar: splide.index ? splide.index : 0
            }
        ])
        .select()

    console.log(data, error)

    if (!error) registerForm.pseudonyme.value = '';

    window.location.reload()
})


var splide = new Splide('.splide', {
    width: '100%',
    start: 0,
    perPage: 1,
    gap: '10px',
    pagination: false,
    type: 'loop',
    //arrowPath: 'M32 112V96H48V80H64V64H80V48H64V32H48V16H32V0H-7.62939e-06V16H16V32H32V48H48V64H32V80H16V96H-7.62939e-06V112H32Z'
});
splide.mount();


const input = document.getElementById('textInput');
const arrow = document.querySelector('.arrow-pseudo');

// Affiche la flèche quand l'input reçoit le focus
input.addEventListener('focus', function () {
    arrow.classList.add('show-arrow');
});

// Masque la flèche quand l'input perd le focus
input.addEventListener('blur', function () {
    arrow.classList.remove('show-arrow');
});



document.querySelector('.loader').addEventListener('click', (e) => {
    e.target.classList.add('active');

    setTimeout(() => {
        e.target.classList.add('end');
    }, 1500)
})

// splide.get

