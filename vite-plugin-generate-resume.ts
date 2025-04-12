import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
// Import shared generator functions
import {
	generateResumeMarkdown,
	generateResumePdf,
	writeResumeMarkdown
} from './src/lib/resume-generator'; // Adjusted import path

export default function generateResumePlugin(): Plugin {
	const resumeDataPath = path.resolve('src/lib/resume.ts'); // Path to the source data

	// Function to generate and write both files using shared logic
	async function generateFiles() {
		console.log('🔄 Plugin: Generating resume files...');
		const mdContent = generateResumeMarkdown();
		if (mdContent) {
			const mdWritten = writeResumeMarkdown(mdContent);
			if (mdWritten) {
				await generateResumePdf(mdContent);
			} else {
				console.error('❌ Plugin: Skipping PDF generation due to Markdown write error.');
			}
		} else {
			console.error('❌ Plugin: Skipping file generation due to Markdown content error.');
		}
	}

	return {
		name: 'vite-plugin-generate-resume',
		// Generate on server start
		async configureServer(server: ViteDevServer) {
			console.log('Plugin: Generating initial resume files for dev server...');
			await generateFiles(); // Await generation
			server.watcher.add(resumeDataPath); // Watch the source data file
		},
		// Regenerate when the data file changes
		async handleHotUpdate({ file }: { file: string; server: ViteDevServer }) {
			if (file === resumeDataPath) {
				console.log(`Plugin: resume.ts changed, regenerating resume files...`);
				await generateFiles(); // Await regeneration
			}
		}
	};
}
