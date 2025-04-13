import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import type { PageServerLoad } from './$types';

// Function to format date (can be shared if needed)
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export const load: PageServerLoad = async () => {
	const postsDir = path.resolve('src/lib/posts');
	let files: string[];

	try {
		files = fs.readdirSync(postsDir);
	} catch (e) {
		console.error('Could not read posts directory for homepage:', e);
		// Don't throw an error, just return empty array if posts can't be read
		return { recentPosts: [] };
	}

	const posts = files
		.filter((file) => file.endsWith('.md') && !file.startsWith('_'))
		.map((file) => {
			const filePath = path.join(postsDir, file);
			try {
				const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
				const { data: frontmatter } = matter(markdownWithMeta);

				if (!frontmatter.title || !frontmatter.date) {
					console.warn(`Missing frontmatter in ${file}. Skipping.`);
					return null;
				}

				return {
					slug: file.replace('.md', ''),
					title: frontmatter.title,
					date: frontmatter.date,
					formattedDate: formatDate(frontmatter.date), // Add formatted date
					description: frontmatter.description || ''
				};
			} catch (readError) {
				console.error(`Error reading or parsing ${file}:`, readError);
				return null;
			}
		})
		.filter((post): post is NonNullable<typeof post> => post !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		recentPosts: posts.slice(0, 3) // Get only the top 3
	};
};
