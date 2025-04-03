import { getUserProfile } from '../scripts/getUserProfile.js';
import { getServices } from '../scripts/getSkillsAndServices.js';
import { loader } from '../scripts/loader.js';

const renderingEl = document.getElementById('profile-section');
const parser = new DOMParser();

const htmlToRenderForUserProfile = async ({ profile }) => {
    const service = (await getServices()).find(service => service.identifier === profile.service).name;

    return parser.parseFromString(`
        <div>
            <div class="profile-container">
                <!-- Barra lateral izquierda -->
                <aside class="profile-sidebar">
                    <div class="profile-cover">
                        <img src="${profile.images.avatar ?? '../../../assets/img/Imagen Cohete 2.png'}" alt="Foto de perfil" class="profile-avatar">
                    </div>
                    <div class="profile-info">
                        <h2 class="profile-name">${profile.name}</h2>
                        <p class="profile-title">${service ?? 'Invalid Service.'}</p>
                        <span class="availability-status">
                            <span class="availability-indicator"></span>
                            Disponible para proyectos
                        </span>
                    </div>
                    
                    <ul class="profile-links">
                        <li><a href="#"><i class='bx bx-envelope'></i><b>Correo: </b>${profile.email}</a></li>
                        <li><a href="#"><i class='bx bx-phone'></i><b>Numero: </b>${profile.phone}</a></li>
                        <li><a href="#"><i class='bx bxs-bank'></i><b>Salario/h: </b>${profile.price.currency.toUpperCase()}$${profile.price.amount}</a></li>
                    </ul>
                </aside>
                
                <!-- Contenido principal del perfil -->
                <main class="profile-content">
                    <div class="profile-tabs">
                        <div class="profile-tab active">Resumen</div>
                    </div>
                    
                    <!-- Sección de información -->
                    <section class="profile-section">
                        <div class="section-header">
                            <h3 class="section-title"><i class='bx bx-info-circle'></i> Acerca de mí</h3>
                            <button class="section-action"><i class='bx bx-edit'></i> Editar</button>
                        </div>
                        <p>${profile.description}</p>
                    </section>
                    
                    <!-- Sección de habilidades -->
                    <section class="profile-section">
                        <div class="section-header">
                            <h3 class="section-title"><i class='bx bx-briefcase-alt-2'></i> Servicios</h3>
                            <button class="section-action"><i class='bx bx-plus'></i> Añadir</button>
                        </div>
                        <div class="skill-tags">
                            <div class="skill-tag"><i class='bx bxl-visual-studio'></i> Desarrollo de Software</div>
                        </div>
                        <div class="section-header">
                            <h3 class="section-title"><i class='bx bx-code-alt'></i> Habilidades</h3>
                            <button class="section-action"><i class='bx bx-plus'></i> Añadir</button>
                        </div>
                        
                        <div class="skill-tags">
                            <div class="skill-tag"><i class='bx bxl-html5'></i> HTML5</div>
                            <div class="skill-tag"><i class='bx bxl-css3'></i> CSS3</div>
                            <div class="skill-tag"><i class='bx bxl-javascript'></i> JavaScript</div>
                            <div class="skill-tag"><i class='bx bxl-react'></i> React</div>
                            <div class="skill-tag"><i class='bx bxl-nodejs'></i> Node.js</div>
                            <div class="skill-tag"><i class='bx bxl-python'></i> Python</div>
                        </div>
                    </div>
                </main>
            </div>
            <form action="">
                <div class="form-group">
                    <label for="profile-image" class="form-label">Foto de perfil</label>
                    <div class="file-upload">
                        <label for="profile-image" class="file-input-label">
                            <i class='bx bx-user-circle'></i>
                            <span>Seleccionar imagen de perfil</span>
                        </label>
                        <input type="file" name="profile-image" id="profile-image" accept="image/*">
                        <div class="file-name" id="profile-image-name">Ningún archivo seleccionado</div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="cover-image" class="form-label">Imagen de portada</label>
                    <div class="file-upload">
                        <label for="cover-image" class="file-input-label">
                            <i class='bx bx-image-add'></i>
                            <span>Seleccionar imagen de portada</span>
                        </label>
                        <input type="file" name="cover-image" id="cover-image" accept="image/*">
                        <div class="file-name" id="cover-image-name">Ningún archivo seleccionado</div>
                    </div>
                </div>
            </form>
        </div>
    `, 'text/html').body.firstChild;
}

(async () => {
    const loaderNode = renderingEl.appendChild(loader());

    const { profile } = await getUserProfile();
    await getServices();

    loaderNode.parentElement.removeChild(loaderNode);

    renderingEl.appendChild((await htmlToRenderForUserProfile({ profile })));
})();
