import { isAuth } from '../../../auth/scripts/auth.js';
import { getUserProfile } from '../scripts/getUserProfile.js';
import { loader } from '../scripts/loader.js';
import { userProfile } from './userProfile.js';

const renderingEl = document.getElementById('where-render');
const getProfileEndpoint = 'https://api-rest-emprendi.onrender.com/profiles';

(async () => {
    const { isUserAuth, session } = await isAuth();
    const { profile: authUserProfile } = await getUserProfile();

    if (!isUserAuth) {
        location.replace('/app/explore/index.html');
        return;
    };

    const loaderNode = renderingEl.appendChild(loader());

    const params = new URLSearchParams(location.search);
    const profileId = params.get('profile');

    const response = await fetch(`${getProfileEndpoint}/${profileId}`, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });
     
    if (!response.ok) {
        location.replace('/app/explore/index.html');
        return;
    };

    const json = await response.json();
    const { profile } = json.data;
    const showHireButton = authUserProfile.role === 'customer' && profile._id !== authUserProfile._id;

    const profileHTML = await userProfile({ profile, showHireButton });

    loaderNode.parentElement.removeChild(loaderNode);
    renderingEl.appendChild(profileHTML);
})();
