import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		// Optimize CSS for better LCP
		cssMinify: 'lightningcss',
		// Split CSS for better caching
		cssCodeSplit: true,
		// Increase inline threshold for small assets (improves LCP)
		assetsInlineLimit: 4096,
		// Rollup options for better chunking
		rollupOptions: {
			output: {
				// Keep CSS and JS separate for better caching
				assetFileNames: 'assets/[name]-[hash][extname]',
				chunkFileNames: 'chunks/[name]-[hash].js',
				entryFileNames: 'entries/[name]-[hash].js'
			}
		}
	}
});
