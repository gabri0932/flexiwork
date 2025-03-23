const loginForm = document.getElementById('login-form');
const errorContainer = document.getElementById("error");
const linkEl = document.getElementById('navigate');
const url = 'https://api-rest-emprendi.onrender.com/auth/signin';
let error = null;

console.log(`${location.hostname}:${location.port}/app/app.html`);

loginForm.addEventListener('submit', async (event) => {
    // Para detener el envío del formulario.
    event.preventDefault();
    error = null;

    // Para extraer los inputs del formulario en un objeto.
    const inputs = Object.fromEntries(
        new FormData(event.target)
    );

    const { email, password } = inputs;

    // Validación del correo y la contraseña.
    (!email || !password) ? error = 'El correo y la contraseña son obligatorios.' : null;
    (!email.includes('@') || !email.includes('gmail.com')) ? error = 'El correo es inválido.' : null;

    // Para mostrar el error en pantalla en caso de haberlo.
    if (error) {
        errorContainer.innerText = error;
        errorContainer.hidden = false;
        return;
    }

    errorContainer.innerText = '';
    errorContainer.hidden = true;

    const body = JSON.stringify(inputs);

    const resultado = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
    
    if (!resultado.ok) {
        const { status } = resultado;
        const json = await resultado.json();

        const errorMessage = status === 400
            ? 'Something went wrong: Client side error.'
            : status === 401
                ? json.error
                : json.message;
        
        errorContainer.innerText = errorMessage;
        errorContainer.hidden = false;
        return;
    }

    const json = await resultado.json();
    const { sessionId } = json.data;

    localStorage.setItem('__session', sessionId);
    linkEl.setAttribute('href', '../../app/explore/index.html');
    linkEl.click();
});
