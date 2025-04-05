import { isAuth } from '../../../auth/scripts/auth.js';
import { avatarInput, coverInput, saveBtn, closeModal } from './index.js';

const UPLOAD_IMAGES_ENDPOINT = 'https://stale-ardenia-drln-dev-5fc2ec58.koyeb.app/api/v1/images';
const UPDATE_PROFILE_IMAGES_ENDPOINT = 'https://api-rest-emprendi.onrender.com/profiles/images';

const allowedExtensions = /png|jpg|jpeg/;
const allowedMaxFileSize = 5 * 1024 * 1024;

const state = {
    avatar: null,
    cover: null
}

saveBtn.addEventListener('click', async () => {
    const { isUserAuth, session } = await isAuth();
    const { avatar, cover } = state;
    const imagesPaths = {};

    if (!isUserAuth) {
        location.replace('/auth/login/index.html');
        return;
    }

    if (!avatar && !cover) {
        alert('No se han seleccionado imágenes para subir.');
        return;
    }

    if (avatar) {
        const formData = new FormData();
        formData.append('image', avatar);

        const response = await fetch(UPLOAD_IMAGES_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session}`
            },
            body: formData
        });

        if (!response.ok) {
            alert('Error al subir la imagen de perfil. Inténtalo de nuevo más tarde.');
            return;
        }

        const json = await response.json();
        const { image } = json;
        const { imagePath } = image;

        imagesPaths.avatar = imagePath;
    }

    if (cover) {
        const formData = new FormData();
        formData.append('image', cover);

        const response = await fetch(UPLOAD_IMAGES_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session}`
            },
            body: formData
        });

        if (!response.ok) {
            alert('Error al subir la imagen de portada. Inténtalo de nuevo más tarde.');
            return;
        }

        const json = await response.json();
        const { image } = json;
        const { imagePath } = image;

        imagesPaths.cover = imagePath;
    }

    const response = await fetch(UPDATE_PROFILE_IMAGES_ENDPOINT, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${session}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(imagesPaths)
    });

    if (!response.ok) {
        alert('Error al actualizar las imágenes de perfil. Inténtalo de nuevo más tarde.');
        return;
    }

    const message = document.createElement('div');
    message.className = 'success-toast';
    message.innerHTML = '<i class="bx bx-check-circle"></i> Cambios realizados correctamente.';
    document.body.appendChild(message);

    // Mostrar mensaje por 3 segundos
    setTimeout(() => {
        message.classList.add('show-toast');
        setTimeout(() => {
            message.classList.remove('show-toast');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }, 100);

    closeModal();
});

function handleImagesUpload(key) {
    return async () => {
        const file = key === 'avatar' ? avatarInput.files[0] : coverInput.files[0];

        if (!file) return;

        if (!allowedExtensions.test(file.type)) {
            alert('Formato de imagen no válido. Solo se permiten archivos PNG, JPG y JPEG.');
            return;
        }

        if (file.size > allowedMaxFileSize) {
            alert('El tamaño de la imagen excede el límite permitido de 5 MB.');
            return;
        }

        state[key] = file;
    }
}

avatarInput.addEventListener('change', handleImagesUpload('avatar'));
coverInput.addEventListener('change', handleImagesUpload('cover'));
