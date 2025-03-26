import { isAuth } from '../../../auth/scripts/auth.js';
const getUserProfileEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/me';

export async function getUserProfile() {
    const { isUserAuth, session } = await isAuth();

    if (!isUserAuth) location.replace('/auth/login/index.html');

    const response = await fetch(getUserProfileEndpoint, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session}`
        }
    });

    if (!response.ok) return {
        profile: null
    }

    const json = await response.json();
    const { profile } = json.data;

    return {
        profile
    }
}
