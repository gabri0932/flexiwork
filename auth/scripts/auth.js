const url = 'https://api-rest-emprendi.onrender.com/auth/verify-session';

let status = {
    isUserAuth: false,
    session: null
}

export async function isAuth() {
    const session = localStorage.getItem('__session');
    
    if (!session) {
        status = {
            isUserAuth: false,
            session: null
        }

        return status;
    }

    if (status.isUserAuth && status.session) return status;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session}`
        }
    });

    if (!response.ok) {
        status = {
            isUserAuth: false,
            session: null
        }

        return;
    }

    status = {
        isUserAuth: true,
        session
    }

    return status;
}
