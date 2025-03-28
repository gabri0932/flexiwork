import { getUserProfile } from './getUserProfile.js';
const parser = new DOMParser();
const container = document.getElementById('dynamic-content-container');

function profileButton({ publicId }) {
    return `
        <div class="profile-icon">
            <a href='../profile/me/index.html?profile=${publicId}'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </a>
        </div>
    `
}

function createProfileButton() {
    return `
        <a class='profile-button hire-button' style='padding: 10px;' href='../profile/create/index.html'>Crear perfil</a>
    `
}

(async () => {
    const { profile } = await getUserProfile();
    const createProfileHTML = parser.parseFromString(createProfileButton(), 'text/html');

    if (!profile) {
        container.insertBefore(
            createProfileHTML.body.firstChild,
            container.firstChild
        );

        return;
    }

    const { publicId } = profile;

    const profileButtonHTML = parser.parseFromString(profileButton({
        publicId
    }), 'text/html').body.firstChild;

    container.insertBefore(profileButtonHTML, container.firstChild);
})();
