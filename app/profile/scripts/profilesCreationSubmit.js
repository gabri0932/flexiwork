import { isAuth } from '../../../auth/scripts/auth.js';

const form = document.getElementById('form');
const errorEl = document.getElementById('errorSpan');
const endpoint = 'https://api-rest-emprendi.onrender.com/profiles';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { session } = await isAuth();
    unsetError();

    const inputs = Object.fromEntries(new FormData(event.target));

    const {description, technologies, services, coin, hourly_rate} = inputs;
    let errores = []

    if (inputs.role === 'freelancer') {
        if (description.length < 20) {
            setError("La descripción es muy corta. Usa al menos 20 caracteres");
        }
        if (description.length > 250) {
            setError("La descripción es muy larga.");
        }
        if (services.length > 1) {
            setError("Solo puedes seleccionar un servicio.");
        }
    }else{
        if (description.length < 20) {
            setError("La descripción es muy corta. Usa al menos 20 caracteres");
        }
        if (description.length > 250) {
            setError("La descripción es muy larga.");
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
