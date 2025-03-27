import { isAuth } from '../../../auth/scripts/auth.js';
import { getServices } from './getSkillsAndServices.js';
import { getSkills } from './getSkillsAndServices.js';

const form = document.getElementById('form');
const errorEl = document.getElementById('errorSpan');
const technologiesSelect = document.getElementById('technologies');
const createProfileEndpoint = 'https://api-rest-emprendi.onrender.com/profiles';

let validatedInputs = {};
let selectedTechnologies = [];

if (technologiesSelect) {
    technologiesSelect.addEventListener('change', (event) => {
        selectedTechnologies = Array.from(event.target.selectedOptions, (opt) => opt.value);
    });
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { session } = await isAuth();
    unsetError();

    const inputs = Object.fromEntries(new FormData(event.target));

    // La description es un campo compartido, con validarlo una vez se valida en ambos.
    const { role, description } = inputs;

    if (description.length < 50) {
        setError("La descripción es muy corta.");
        return;
    }

    if (description.length > 250) {
        setError("La descripción es muy larga.");
        return;
    }

    validatedInputs = { role, description };

    if (role === 'freelancer') {
        const availableServices = await getServices();
        const availableSkills = await getSkills();

        if (!availableServices || !availableSkills) {
            setError('Something went wrong. Try again later.');
            return;
        }

        const skills = availableSkills.map(({ identifier }) => identifier);
        const services = availableServices.map(({ identifier }) => identifier);
        
        const { service, currency, amount } = inputs;

        if (!services.includes(service)) {
            setError('El servicio ingresado no existe.');
            return;
        }

        if (technologiesSelect.length < 1) {
            setError('Debe seleccionar al menos una tecnología.');
            return;
        }

        const invalidTechnology = selectedTechnologies.find(tech => !skills.includes(tech));

        if (invalidTechnology) {
            setError(`La siguiente tecnología: "${invalidTechnology}", no es válida.`);
            return;
        }

        if (!['DOP', 'USD', 'EUR'].includes(currency)) {
            setError('El tipo de moneda seleccionado no está disponible.');
            return;
        }

        if (isNaN(Number(amount))) {
            setError('La cantidad de dinero debe ser un número.');
            return
        }

        validatedInputs = {
            ...validatedInputs,
            service,
            technologies: selectedTechnologies,
            price: {
                currency,
                amount: Number(amount)
            }
        };
    }

    const response = await fetch(createProfileEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        },
        body: JSON.stringify(validatedInputs)
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
