import { isAuth } from '../../../auth/scripts/auth.js';

const form = document.getElementById('form');
const errorEl = document.getElementById('errorSpan');
const endpoint = 'https://api-rest-emprendi.onrender.com/profiles';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { session } = await isAuth();
    unsetError();

    const inputs = Object.fromEntries(new FormData(event.target));
    const {amount, currency} = inputs
    if(isNaN(Number(amount))){
        setError("Tiene que ser un numero")
        return
    }
    if(!['EUR', 'DOP', 'USD'].includes(currency)){
        setError('tipo de moneda incorrecto')
        return
    }
    const body ={
        price: {
            currency,
            amount
        }
    }

    const {description, technologies, services, } = inputs;

    if (inputs.role === 'freelancer') {
        if (description.length < 100) {
            setError("La descripción es muy corta.");
            return;
        }
        if (description.length > 250) {
            setError("La descripción es muy larga.");
            return;
        }
        if (services.length >= 2) {
            setError("Solo puedes seleccionar un servicio.");
            return;
        }
    } else {
        if (description.length < 100) {
            setError("La descripción es muy corta.");
            return;
        }
        if (description.length > 250) {
            setError("La descripción es muy larga.");
            return;
        }
    }

    // Y aquí las del role === 'customer', si quieres pon un else, pero ya se entiende.
    // Recuerda también después de establecer los errores hacer el return.

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        },
        body: JSON.stringify(inputs)
    });

    if (!response.ok) {
        const json = await response.json();
        const message = response.status === 400 ? 'ERROR: Client side error.' : json.message;

        setError(message);
        return; 
    }

    location.replace('/app/explore/index.html');
});

function setError(error) {
    errorEl.textContent = error;
    errorEl.hidden = false;
}

function unsetError() {
    errorEl.textContent = '';
    errorEl.hidden = true;
}
