import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react')) {
            return 'react';
          }
          if (id.includes('firebase')) {
            return 'firebase';
          }
          if(id.includes('tsconfigPaths')){
            return 'tsconfigPaths';
          }
          
        },
      },
    },
  },
});
