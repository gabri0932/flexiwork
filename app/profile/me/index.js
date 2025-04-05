import { getUserProfile } from '../scripts/getUserProfile.js';
import { getServices, getSkills } from '../scripts/getSkillsAndServices.js';
import { loader } from '../scripts/loader.js';

const renderingEl = document.getElementById('profile-section');
const parser = new DOMParser();

// Referencias a elementos
const modal = document.getElementById('image-modal');
const openModalBtn = document.getElementById('image-edit-btn');
const closeModalBtn = document.querySelector('.close-modal');
const cancelBtn = document.getElementById('cancel-images-btn');
export const saveBtn = document.getElementById('save-images-btn');

// Inputs de archivos
export const avatarInput = document.getElementById('profile-image-input');
export const coverInput = document.getElementById('cover-image-input');

// Elementos para mostrar nombres de archivos
const profileFileName = document.getElementById('profile-file-name');
const coverFileName = document.getElementById('cover-file-name');

// Elementos para vista previa
const profilePreview = document.getElementById('profile-preview');
const coverPreview = document.getElementById('cover-preview');

// Funciones para manejar la ventana modal
export function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evitar scroll
}

export function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

const htmlToRenderForUserProfile = async ({ profile }) => {
    const skills = await getSkills();
    const services = await getServices();

    const service = services.find(service => service.identifier === profile.service).name;
    const technologies = profile.technologies.map(tech => skills.find(({ identifier }) => identifier === tech).name);

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
                            
                        </div>
                        <p>${profile.description}</p>
                    </section>
                    
                    <!-- Sección de habilidades -->
                    <section class="profile-section">
                        <div class="section-header">
                            <h3 class="section-title"><i class='bx bx-briefcase-alt-2'></i> Servicios</h3>
                           
                        </div>
                        <div class="skill-tags">
                            <div class="skill-tag">${service}</div>
                        </div>
                        <div class="section-header">
                            <h3 class="section-title"><i class='bx bx-code-alt'></i> Habilidades</h3>
                            
                        </div>
                        
                        <div class="skill-tags">
                            ${technologies.map(tech => `<div class="skill-tag">${tech}</div>`).join('')}
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

// Event listeners para abrir/cerrar modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Previsualizar imagen de perfil
avatarInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const file = this.files[0];
        profileFileName.textContent = file.name.length > 15 ? 
            file.name.substring(0, 12) + '...' : file.name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePreview.src = e.target.result;
            profilePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Previsualizar imagen de portada
coverInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const file = this.files[0];
        coverFileName.textContent = file.name.length > 15 ? 
            file.name.substring(0, 12) + '...' : file.name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            coverPreview.src = e.target.result;
            coverPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
