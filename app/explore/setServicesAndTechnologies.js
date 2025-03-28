import { getServices, getSkills } from '../profile/scripts/getSkillsAndServices';
import { errorOption, validOption } from '../profile/scripts/options.js';

document.addEventListener('DOMContentLoaded', async () => {
    const services = await getServices();
    const servicesSelect = document.getElementById('slt-services');
    const technologiesSelect = document.getElementById('slt-technologies');

    if (servicesSelect && technologiesSelect) {
        if (!services) {
            servicesSelect.appendChild(errorOption);
        } else {
            servicesSelect.appendChild(validOption('', 'Seleccione'));
    
            services.forEach(service => {
                servicesSelect.appendChild(validOption(service.identifier, service.name));
            });
        }
    
        const technologies = await getSkills();
    
        if (!technologies) {
            technologiesSelect.appendChild(errorOption);
        } else {
            technologiesSelect.appendChild(validOption('', 'Seleccione'));
    
            technologies.forEach(tech => {
                technologiesSelect.appendChild(validOption(tech.identifier, tech.name));
            });
        }
    }
});
