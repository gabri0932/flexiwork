import { isAuth } from '../../auth/scripts/auth.js';
import { profileCard } from './profileCard.js';

const getProfilesEndpoint = 'https://api-rest-emprendi.onrender.com/profiles';
const profilesContainer = document.getElementById('profiles');

(async () => {
    const { isUserAuth, session } = await isAuth();

    if (!isUserAuth) return;

    const response = await fetch(getProfilesEndpoint, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });

    if (!response.ok) {};

    const json = await response.json();

    const { data } = json;
    const { profiles } = data;

    profiles.forEach(async profile => {
        const card = await profileCard({ profile });
        profilesContainer.appendChild(card);
    });
})();
