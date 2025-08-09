<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>{data.post.title} | Blog | Matt Cook</title>
	{#if data.post.description}
		<meta name="description" content={data.post.description} />
	{/if}
</svelte:head>

<article class="max-w-none">
	<header class="mb-8">
		<h1 class="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
			{data.post.title}
		</h1>
		<p class="text-sm text-gray-500">{formatDate(data.post.date)}</p>
	</header>

	{@html data.post.content}

	<footer class="mt-12 border-t border-gray-200 pt-6">
		<a href="/blog" class="text-blue-600 transition-colors duration-200 hover:text-blue-800">
			&larr; Back to Blog
		</a>
	</footer>
</article>
