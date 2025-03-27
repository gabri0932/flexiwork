import { getServices, getSkills } from './getSkillsAndServices.js';

const servicesSelect = document.getElementById('service');
const skillsSelect = document.getElementById('technologies');
const parser = new DOMParser();

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
    const services = await getServices();

    if (!services) {
        servicesSelect.appendChild(errorOption)
    } else {
        servicesSelect.appendChild(validOption('', 'Seleccionar'));

        services.forEach(service => {
            servicesSelect.appendChild(validOption(service.identifier, service.name))
        });
    }

    const skills = await getSkills();

    if (!skills) {
        skillsSelect.appendChild(errorOption);
    } else {
        skillsSelect.appendChild(validOption('', 'Seleccionar'));

        skills.forEach(skill => {
            skillsSelect.appendChild(validOption(skill.identifier, skill.name))
        });
    }
})();
