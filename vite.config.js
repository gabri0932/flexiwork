import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'auth/login/index.html'),
        register: resolve(__dirname, 'auth/register/index.html'),
        contactanos: resolve(__dirname, 'app/contactanos.html'),
        nosotros: resolve(__dirname, 'app/nosotros.html'),
        explore: resolve(__dirname, 'app/explore/index.html'),
        pay: resolve(__dirname, 'app/pay/method/index.html'),
        paySuccess: resolve(__dirname, 'app/pay/success/index.html'),
        profileCreate: resolve(__dirname, 'app/profile/create/index.html'),
        profileCreateFreelancer: resolve(__dirname, "app/profile/create/freelancer-profile/index.html"),
        profileCreateCostumer: resolve(__dirname, "app/profile/create/customer-profile/index.html"),
        profile: resolve(__dirname, "app/profile/me/index.html"),
        profileViewUse: resolve(__dirname, 'app/profile/view_usu/index.html'),
        chat: resolve(_dirnmae, 'app/chat/index.html')
      },
    },
  },
});
