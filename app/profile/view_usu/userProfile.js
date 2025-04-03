import { getSkills, getServices } from '../scripts/getSkillsAndServices.js';

const parser = new DOMParser();

export async function userProfile({ profile }) {
    const skills = await getSkills();
    const services = await getServices();

    const technologies = profile.technologies.map(tech => (skills.find(({ identifier }) => identifier === tech)));

    return parser.parseFromString(
        `<div class="profile-container">
            <div class="profile-header">
                <img src="${profile.images.cover ?? '../../../assets/img/Imagen Cohete 2.png'}" alt="Foto de portada" class="cover-photo">
                <div class="profile-photo-container">
                    <img src="${profile.images.avatar ?? '../../../assets/img/Imagen Cohete 2.png'}" alt="Foto de perfil" class="profile-photo">
                </div>
            </div>
            
            <div class="profile-content">
                <h1 class="profile-name">Perfil de ${profile.name}</h1>
                <p class="profile-title">${services.find(({ identifier }) => identifier === profile.service).name ?? 'USER SERVICE IS NOT AVAILABLE.'}</p>
                
                <div class="profile-section">
                    <h2 class="section-title"><i class="fas fa-user"></i>Sobre ${profile.name.split(' ')[0]}</h2>
                    <p class="profile-description">
                        ${profile.description}
                    </p>
                </div>
                
                <div class="profile-section">
                    <h2 class="section-title"><i class="fas fa-laptop-code"></i> Tecnologías</h2>
                    <div class="tech-tags">
                        ${technologies.map(tech => `<span class="tech-tag">${tech.name}</span>`).join('')}
                    </div>
                </div>
                
                <button class="btn-contact"><a href="../../pay/method/index.html?publicId=${profile.publicId}">Contratar</a></button>
            </div>
        </div>`,
        'text/html'
    ).body.firstChild;
}
