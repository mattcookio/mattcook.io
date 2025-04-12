import { mdToPdf } from 'md-to-pdf';
import fs from 'node:fs';
import path from 'node:path';
import {
	emailRaw,
	isSkillsSection,
	location,
	resumeData,
	// Import types for clarity, assuming they are exported from resume.ts
	type ResumeItem,
	type ResumeSection,
	type SkillsSection
} from './resume'; // Path relative to src/lib/

// Function to generate markdown content
export function generateResumeMarkdown(): string | null {
	try {
		let md = `# Matt Cook\n${location}\n[${emailRaw}](mailto:${emailRaw})\n\n`;

		resumeData.forEach((section: ResumeSection | SkillsSection) => {
			md += `## ${section.title}\n\n`;

			if (isSkillsSection(section)) {
				md += `**Strengths:** ${section.strengths.join(', ')}\n\n`;
				md += `**Languages, Tools, Frameworks:** ${section.technologies.join(', ')}\n\n`;
			} else {
				// Type assertion for clarity in loop
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
		return md.trim();
	} catch (error) {
		console.error('❌ Error generating resume Markdown content:', error);
		return null;
	}
}

// Function to generate PDF file from Markdown content
export async function generateResumePdf(markdownContent: string): Promise<boolean> {
	const pdfOutputPath = path.resolve('static', 'resume.pdf');
	try {
		const pdf = await mdToPdf(
			{ content: markdownContent },
			{
				// launch_options: { args: ['--no-sandbox'] }
			}
		);

		if (pdf) {
			fs.writeFileSync(pdfOutputPath, pdf.content);
			console.log(`✅ Regenerated PDF: ${pdfOutputPath}`);
			return true;
		} else {
			console.error('❌ PDF generation resulted in empty content.');
			return false;
		}
	} catch (error) {
		console.error(`❌ Error generating resume PDF:`, error);
		return false;
	}
}

// Function to write markdown file
export function writeResumeMarkdown(markdownContent: string): boolean {
	const mdOutputPath = path.resolve('static', 'resume.md');
	try {
		fs.writeFileSync(mdOutputPath, markdownContent, 'utf-8');
		console.log(`✅ Regenerated Markdown file: ${mdOutputPath}`);
		return true;
	} catch (error) {
		console.error('❌ Error writing resume Markdown file:', error);
		return false;
	}
}
