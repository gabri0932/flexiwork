const registerForm = document.getElementById('register-form')
const errorContainer = document.getElementById("error")
const URL = 'https://api-rest-emprendi.onrender.com/auth/signup';
let error = null;
registerForm.addEventListener('submit', async(event) => {
    event.preventDefault()
    error = null;
    const inputs = Object.fromEntries(
        new FormData(event.target)
    )
    const {name, email, password} = inputs;
    (name.length < 3) ? error = "El nombre escrito es muy corto" : null;
    (!email || !password) ? error = 'El correo y la contraseña son obligatorios.' : null;
    (!email.includes('@') || !email.includes('gmail.com')) ? error = 'El correo es inválido.' : null;

    if(error){
        errorContainer.innerText = error;
        errorContainer.hidden = false;
        return;
    }
    errorContainer.innerText = ''
    errorContainer.hidden = true;
    const body = JSON.stringify(inputs)

    const resultado = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body
    })
    if(!resultado.ok){
        const {status} = resultado;
        const json = await resultado.json()
        const errorMessage = status === 400
            ? 'Something went wrong: Client side error. '
            : json.message;
        errorContainer.innerText = errorMessage
        errorContainer.hidden = false;
        return;
    }
    
    window.location.assign('/auth/login/index.html')
    console.log(error)

})