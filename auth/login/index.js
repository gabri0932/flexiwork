const loginForm = document.getElementById('login-form');
const errorContainer = document.getElementById("error");
const URL = 'https://api-rest-emprendi.onrender.com/auth/signin';
let error = null;

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

    const resultado = await fetch(URL,{
        method: 'POST',
        body: JSON.stringify(inputs)
    });
    
    if(!resultado.ok){
        errorContainer.innerText = (await resultado.json()).message
        errorContainer.hidden = false;
        return;
    }
    
    console.log(await resultado.json())
});
