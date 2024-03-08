import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    //{include: '**/*.jsx'}
    plugins: [react()],
    server: {
        // hmr: true,
        host: true,
        strictPort: true,
        // watch: {
        //     usePolling: true,
        // }
    },
})
