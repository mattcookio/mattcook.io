import { error } from '@sveltejs/kit';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const prerender = true;

export async function load() {
	const postsDir = path.resolve('src/lib/posts');
	let files: string[];

	try {
		files = fs.readdirSync(postsDir);
	} catch (e) {
		console.error('Could not read posts directory:', e);
		throw error(500, 'Could not load blog posts');
	}

	const posts = files
		.filter((file) => file.endsWith('.md') && !file.startsWith('_'))
		.map((file) => {
			const filePath = path.join(postsDir, file);
			const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
			const { data: frontmatter } = matter(markdownWithMeta);

			if (!frontmatter.title || !frontmatter.date) {
				console.warn(`Missing frontmatter in ${file}. Skipping.`);
				return null; // Skip files with missing essential frontmatter
			}

			return {
				slug: file.replace('.md', ''),
				title: frontmatter.title,
				date: frontmatter.date,
				description: frontmatter.description || '' // Optional description
			};
		})
		.filter((post): post is NonNullable<typeof post> => post !== null) // Filter out null values
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

	return {
		posts
	};
}
