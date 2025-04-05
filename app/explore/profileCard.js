import { getUserProfile } from '../profile/scripts/getUserProfile.js';
import { getServices, getSkills } from '../profile/scripts/getSkillsAndServices.js';

export async function showProfileService(service) {
    const result = (await getServices()).find(({ identifier }) => identifier === service).name;
    return result ?? 'ERROR'; 
}

export async function profileCardSkillTag(skill) {
    if (skill.startsWith('+')) return `<span class="skill-tag">${skill}</span>`;;

    const result = (await getSkills()).find(({ identifier }) => identifier === skill).name;

    return `<span class="skill-tag">${result ?? 'ERROR'}</span>`;
}

const parser = new DOMParser();

export async function profileCard({ profile }) {
    const { profile: userProfile } = await getUserProfile();

    const technologiesToShow = profile.technologies.slice(0, 2);
    const resolvedTechnologies = await Promise.all(technologiesToShow.map(tech => profileCardSkillTag(tech)));
    const extraTechnologies = profile.technologies.length > 2 ? profile.technologies.length - 2 : null;

    const technologies = `${resolvedTechnologies.join('')}${extraTechnologies ? (await profileCardSkillTag(`+${extraTechnologies}`)) : ''}`;

    const card = `
        <div class="profile-card">
            <div class="profile-header">
                <img class="profile-header" src="${profile.images.cover ?? ''}" alt="">
            </div>
            <div class="price-tag">${profile.price.currency.toUpperCase()}$${profile.price.amount}/hr</div>
            <div class="profile-body">
                    <img class="profile-img" src="${profile.images.avatar ?? ""} " alt=""> 
                <div class="profile-name">${profile.name}</div>
                <div class="profile-title">${(await showProfileService(profile.service))}</div>
                <div class="skills-container">${technologies}</div>
                <div class="profile-actions">
                    <a class="profile-button" target='_blank' href="../profile/view_usu/index.html?profile=${profile.publicId}">Ver perfil</a>
                    ${(userProfile && userProfile.role === 'customer') ? `<a target='_blank' href="../pay/method/index.html?profile=${profile.publicId}" class="profile-button hire-button" >Contratar</a>` : ''}
                </div>
            </div>
        </div>
    `;

    const parsedCard = parser.parseFromString(card, 'text/html').body.firstChild;

    return parsedCard; //
}
