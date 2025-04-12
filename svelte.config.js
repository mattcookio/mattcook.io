import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		alias: {
			// this will match a directory and its contents
			// (`my-directory/x` resolves to `path/to/my-directory/x`)
			$lib: 'src/lib',
			'$lib/*': 'src/lib/*'
		}
	},

	extensions: ['.svelte']
};

export default config;
