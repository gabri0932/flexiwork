const url = 'https://api-rest-emprendi.onrender.com/auth/signout';

export async function logoutUser() {
    const session = localStorage.getItem('__session');

    if (!session) return {
        success: false
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session}`
        }
    });

    if (!response.ok) return {
        success: false
    }

    return {
        success: true
    }
}
