const servicesSelect = document.getElementById('services');
const skillsSelect = document.getElementById('technologies');
const parser = new DOMParser();

const skillsEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/skills';
const servicesEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/services';

const errorOption = parser.parseFromString(
    '<option>Something went wrong.</option>',
    'text/html'
).body.firstChild;
const validOption = (value, text) => {
    return parser.parseFromString(
        `<option value=${value}>${text}</option>`,
        'text/html'
    ).body.firstChild;
}

(async () => {
    const servicesResponse = await fetch(servicesEndpoint);

    if (!servicesResponse.ok) {
        servicesSelect.appendChild(errorOption)
    } else {
        const json = await servicesResponse.json();
        const { services } = json.data;

        services.forEach(service => {
            servicesSelect.appendChild(validOption(service.identifier, service.name))
        });
    }

    const skillsResponse = await fetch(skillsEndpoint);

    if (!skillsResponse.ok) {
        skillsSelect.appendChild(errorOption);
    } else {
        const json = await skillsResponse.json();
        const { skills } = json.data;

        skills.forEach(skill => {
            skillsSelect.appendChild(validOption(skill.identifier, skill.name))
        });
    }
})();
