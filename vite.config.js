import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Cargar las variables de entorno según el modo actual
  loadEnv(mode, process.cwd());

  return {
    plugins: [react()]
  };
});
