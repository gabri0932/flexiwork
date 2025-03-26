import { isAuth } from '../../auth/scripts/auth.js';

const container = document.getElementById('dynamic-buttons');
const parser = new DOMParser();

const noAuthButtons = `
    <li class="login-btn"><a href="auth/login/index.html">Iniciar Sesión</a></li>
    <li class="register-btn"><a href="auth/register/index.html">Registrarse</a></li>
`;
const authButton = `
    <li class="login-btn"><a href="app/explore/index.html">Explorar</a></li>
`;

(async () => {
    const { isUserAuth } = await isAuth();

    if (!isUserAuth) {
        const parsedButtons = parser.parseFromString(noAuthButtons, 'text/html').body.childNodes;

        parsedButtons.forEach(button => {
            container.appendChild(button);
        });

        return;
    }

    container.appendChild(parser.parseFromString(authButton, 'text/html').body.firstChild);
    return;
})();
