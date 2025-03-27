const skillsEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/skills';
const servicesEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/services';

let skills = null;
let services = null;

export async function getSkills() {
    if (!skills) {
        const skillsResponse = await fetch(skillsEndpoint);

        if (!skillsResponse.ok) return skills;

        const json = await skillsResponse.json();
        const { skills: obtainedSkills } = json.data;

        skills = obtainedSkills;
    }

    return skills;
}

export async function getServices() {
    if (!services) {
        const servicesResponse = await fetch(servicesEndpoint);

        if (!servicesResponse.ok) return services;

        const json = await servicesResponse.json();
        const { services: obtainedServices } = json.data;

        services = obtainedServices;
    }

    return services;
}
