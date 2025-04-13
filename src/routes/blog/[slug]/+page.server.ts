import { error } from '@sveltejs/kit';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const postsDir = path.resolve('src/lib/posts');
	const files = fs
		.readdirSync(postsDir)
		.filter((file) => file.endsWith('.md') && !file.startsWith('_'));
	return files.map((file) => ({ slug: file.replace('.md', '') }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const postsDir = path.resolve('src/lib/posts');
	const filePath = path.join(postsDir, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		throw error(404, 'Post not found');
	}

	const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
	const { data: frontmatter, content } = matter(markdownWithMeta);

	if (!frontmatter.title || !frontmatter.date) {
		console.error(`Missing required frontmatter (title or date) in ${slug}.md`);
		throw error(500, 'Post data is incomplete');
	}

	const htmlContent = await marked.parse(content);

	return {
		post: {
			slug,
			title: frontmatter.title,
			date: frontmatter.date,
			description: frontmatter.description || '',
			content: htmlContent
		}
	};
};
