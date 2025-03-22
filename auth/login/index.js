const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    // Para detener el envío del formulario.
    event.preventDefault();

    // Para extraer los inputs del formulario en un objeto.
    const inputs = Object.fromEntries(
        new FormData(event.target)
    );

    console.log(inputs);
    //valido el correo y la contraseña
    const {email, password} = inputs
    const error = document.getElementById("id")
    error.value = null
    if(!email || !password){
        email.value = "Email o contraseña vacios o nulos"
        
    }if(email.include('@') || email.includes('gmail.com')){
        email.value = "Correo Invalido"
    }
    
});
