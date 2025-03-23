const url = 'https://api-rest-emprendi.onrender.com/auth/verify-session';

export async function isAuth() {
    const session = localStorage.getItem('__session');
    
    if (!session) return {
        isAuth: false
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session}`
        }
    });

    if (!response.ok) return {
        isAuth: false
    }

    return {
        isAuth: true
    }
}
