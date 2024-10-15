const registerForm = document.getElementById('register-form');
const registerBtn = document.getElementById('register-btn');
const age = document.getElementById('age');

age.addEventListener('input',(e) => {
    if (e.target.value.toString().length > 2)
        e.target.value = e.target.value.toString().substring(0, 3);

})

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(registerForm.pseudonyme.value, registerForm.age.value); // -> Submit
})


