import { logoutUser } from '../../auth/scripts/logout.js';

const logoutEl = document.getElementById('logout-btn');

const handleLogOut = async () => {
    const { success } = await logoutUser();

    if (!success) return;

    location.assign('../../index.html');
}

logoutEl.addEventListener('click', handleLogOut);
