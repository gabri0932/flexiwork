const protectedRoutes = ['/app/explore/index.html'];
const invalidForAuth = ['/auth/login/index.html', '/auth/register/index.html'];
const URL = 'https://api-rest-emprendi.onrender.com/auth/verify-session';

const session = localStorage.getItem('__session');

export async function isAuth() {
    if (!session) return {
        isAuth: false
    }
    
    const response = await fetch(URL, {
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
