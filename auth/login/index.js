const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    // Para detener el envío del formulario.
    event.preventDefault();

    // Para extraer los inputs del formulario en un objeto.
    const inputs = Object.fromEntries(
        new FormData(event.target)
    );

    console.log(inputs);
});
