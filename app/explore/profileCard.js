import { getServices, getSkills } from '../profile/scripts/getSkillsAndServices.js';

export async function showProfileService(service) {
    const result = (await getServices()).find(({ identifier }) => identifier === service).name;
    return result ?? 'ERROR'; 
}

export async function profileCardSkillTag(skill) {
    const result = (await getSkills()).find(({ identifier }) => identifier === skill).name;

    return `
        <span class="skill-tag">${result ?? 'ERROR'}</span>
    `;
}

export async function profileCard({ profile }) {
    return `
        <div class="profile-card">
            <div class="profile-header"></div>
            <div class="price-tag">${profile.price.currency}$${profile.price.amount}/hr</div>
            <div class="profile-body">
                <div class="profile-img">
                    <!-- Aquí van la foto de perfil o la imagen genérica. -->
                </div>
                <div class="profile-name">${profile.name}</div>
                <div class="profile-title">${(await showProfileService(profile.service))}</div>
                <div class="skills-container">
                    ${profile.technologies.forEach(tech => profileCardSkillTag(tech))}
                </div>
                <div class="profile-actions">
                    <button class="profile-button"><a href="../profile/view_usu/index.html?profile=${profile.publicId}">Ver perfil</a></button>
                    <a href="../pay/method/index.html?profile=${profile.publicId}" class="profile-button hire-button" >Contratar</a>
                </div>
            </div>
        </div>
    `;
}
