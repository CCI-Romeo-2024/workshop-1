import { db } from './lib/supaBase.js'

import soundCharacter from '../../assets/sounds/change_character.mp3'
import soundRegister from '../../assets/sounds/register.mp3'
import soundZoomTv from '../../assets/sounds/zoom_tv.mp3'
import soundBg from '../../assets/sounds/music_bg.mp3'

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

    let audio = new Audio(soundRegister);
    audio.play();

    document.getElementById('inscrit1').classList.add('start')

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

    
    setTimeout(() => {
        window.location.reload()
    }, 1500)
    
})


let splide = new Splide('.splide', {
    width: '100%',
    start: 0,
    perPage: 1,
    gap: '10px',
    pagination: false,
    type: 'loop',
});
splide.mount();

splide.on('move', () => {
    let sound = new Audio(soundCharacter)
    sound.play()
})


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
    let sound = new Audio(soundZoomTv)
    sound.play()

    e.target.classList.add('active');

    setTimeout(() => {
        e.target.classList.add('end');
    }, 600)


    setTimeout(() => {
        sound = new Audio(soundBg)
        sound.play()
    }, 4000)

})


