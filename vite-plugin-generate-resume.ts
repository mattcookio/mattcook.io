import { mdToPdf } from 'md-to-pdf'; // Import the library
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite'; // Import Vite types
// Import resume data types explicitly using relative path from project root
import {
	isSkillsSection,
	resumeData,
	type ResumeItem,
	type ResumeSection,
	type SkillsSection
} from './src/lib/resume'; // Corrected relative path

// Function to generate markdown
function generateResumeMarkdown(): string | null {
	// Return content or null on error
	try {
		let md = '# Matt Cook\n\n'; // Main Title

		resumeData.forEach((section: ResumeSection | SkillsSection) => {
			md += `## ${section.title}\n\n`;

			if (isSkillsSection(section)) {
				md += `**Strengths:** ${section.strengths.join(', ')}\n\n`;
				md += `**Languages, Tools, Frameworks:** ${section.technologies.join(', ')}\n\n`;
			} else {
				// Type assertion is technically not needed but can stay for clarity
				(section as ResumeSection).items.forEach((item: ResumeItem) => {
					if (item.title) {
						md += `### ${item.title}\n`;
					}
					if (item.date) {
						md += `*${item.date}*\n`;
					}
					if (item.description) {
						md += `${item.description}\n`;
					}
					if (item.points && item.points.length > 0) {
						item.points.forEach((point: string) => {
							md += `- ${point}\n`;
						});
					}
					if (item.subItems && item.subItems.length > 0) {
						item.subItems.forEach((subItem: ResumeItem) => {
							md += `  - ${subItem.title}\n`;
						});
					}
					if (item.points_after_subItems && item.points_after_subItems.length > 0) {
						item.points_after_subItems.forEach((point: string) => {
							md += `- ${point}\n`;
						});
					}
					if (
						item.title ||
						item.date ||
						item.description ||
						item.points ||
						item.subItems ||
						item.points_after_subItems
					) {
						md += '\n';
					}
				});
			}
		});
		const markdownContent = md.trim();
		const mdOutputPath = path.resolve('static', 'resume.md');
		fs.writeFileSync(mdOutputPath, markdownContent, 'utf-8');
		console.log(`✅ Regenerated Markdown: ${mdOutputPath}`);
		return markdownContent; // Return the generated content
	} catch (error) {
		console.error('❌ Error generating resume Markdown:', error);
		return null; // Return null on error
	}
}

// Function to generate PDF from Markdown content
async function generateResumePdf(markdownContent: string) {
	const pdfOutputPath = path.resolve('static', 'resume.pdf');
	try {
		const pdf = await mdToPdf(
			{ content: markdownContent },
			{
				// launch_options: { args: ['--no-sandbox'] } // May be needed in some environments
				// You can add styling options here if needed, e.g.:
				// pdf_options: { format: 'A4', margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' } },
				// stylesheet: [path.resolve('path/to/your/styles.css')]
			}
		);

		if (pdf) {
			fs.writeFileSync(pdfOutputPath, pdf.content);
			console.log(`✅ Regenerated PDF: ${pdfOutputPath}`);
		} else {
			console.error('❌ PDF generation resulted in empty content.');
		}
	} catch (error) {
		console.error(`❌ Error generating resume PDF:`, error);
	}
}

export default function generateResumePlugin(): Plugin {
	const resumeDataPath = path.resolve('src/lib/resume.ts');

	async function generateFiles() {
		const mdContent = generateResumeMarkdown();
		if (mdContent) {
			await generateResumePdf(mdContent);
		}
	}

	return {
		name: 'vite-plugin-generate-resume',
		// Generate on server start
		configureServer(server: ViteDevServer) {
			// Add server type
			console.log('Plugin: Generating initial resume files for dev server...');
			generateFiles(); // Generate both MD and PDF
			server.watcher.add(resumeDataPath); // Ensure watcher uses correct path
		},
		// Regenerate when the data file changes
		handleHotUpdate({ file }: { file: string; server: ViteDevServer }) {
			// Add types for file and server
			if (file === resumeDataPath) {
				// Ensure check uses correct path
				console.log(`Plugin: resume.ts changed, regenerating resume files...`);
				generateFiles(); // Regenerate both MD and PDF
			}
		}
	};
}
