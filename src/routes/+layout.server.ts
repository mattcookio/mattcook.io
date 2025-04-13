import fs from 'fs';
import path from 'path';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const postsDir = path.resolve('src/lib/posts');
	let publishedPostCount = 0;

	try {
		const files = fs
			.readdirSync(postsDir)
			.filter((file) => file.endsWith('.md') && !file.startsWith('_'));
		publishedPostCount = files.length;
	} catch (e) {
		// Ignore errors reading the directory (e.g., if it doesn't exist yet)
		console.warn('Could not read posts directory for layout:', e);
	}

	return {
		publishedPostCount
	};
};
