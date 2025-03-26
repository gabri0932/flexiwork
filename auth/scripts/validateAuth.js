import { isAuth } from './auth.js';

(async () => {
    const protectedRoutes = ['/app/explore/index.html'];
    const invalidForAuth = ['/auth/login/index.html', '/auth/register/index.html'];

    const { isUserAuth } = await isAuth();
    const currentPath = location.pathname;

    if (!isUserAuth && protectedRoutes.includes(currentPath)) location.replace('/auth/login/index.html');
    if (isUserAuth && invalidForAuth.includes(currentPath)) location.replace('/app/explore/index.html');
})();
