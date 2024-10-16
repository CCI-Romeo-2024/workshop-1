import { db } from './lib/supaBase.js'


const registerForm = document.getElementById('register-form');
const registerBtn = document.getElementById('register-btn');

registerBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  console.log(registerForm.pseudonyme.value); // -> Submit

  if (registerForm.pseudonyme.value.length === 0) return false;

  const { data, error } = await db
    .from('players')
    .insert([
      {
        pseudo: registerForm.pseudonyme.value,
        avatar: 0
      }
    ])
  .select()

console.log(data, error)

if (!error) registerForm.pseudonyme.value = '';
})

document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
    width: '100%',
    start: 0,
    perPage: 1,
    gap: '10px',
    pagination: false,
    type: 'loop',
  });
  splide.mount();
}); 

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