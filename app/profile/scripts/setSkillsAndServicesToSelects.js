import { getServices, getSkills } from './getSkillsAndServices.js';
import { errorOption, validOption } from './options.js';

const servicesSelect = document.getElementById('service');
const skillsSelect = document.getElementById('technologies');

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
