import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/timeback-wash-fold-app/', // 👈 use your actual repo name here
});
