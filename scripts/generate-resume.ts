import {
	generateResumeMarkdown,
	generateResumePdf,
	writeResumeMarkdown
} from '../src/lib/resume-generator'; // Adjust path relative to scripts/

// --- Main execution --- //
async function main() {
	console.log('🔄 Generating resume files via script...');
	let success = false;
	const mdContent = generateResumeMarkdown();
	if (mdContent) {
		const mdWritten = writeResumeMarkdown(mdContent);
		if (mdWritten) {
			success = await generateResumePdf(mdContent);
		} else {
			console.error('❌ Script: Skipping PDF generation due to Markdown write error.');
		}
	} else {
		console.error('❌ Script: Skipping file generation due to Markdown content error.');
	}

	if (success) {
		console.log('✨ Script: Resume generation complete.');
		process.exitCode = 0;
	} else {
		console.error('❌ Script: Resume generation failed.');
		process.exitCode = 1; // Ensure exit code is 1 on failure
	}
}

main();
