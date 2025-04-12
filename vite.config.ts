import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import generateResumePlugin from './vite-plugin-generate-resume.ts';

export default defineConfig({
	plugins: [generateResumePlugin(), tailwindcss(), sveltekit()]
});
