<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Blog | Matt Cook</title>
	<meta name="description" content="Blog posts by Matt Cook" />
</svelte:head>

<section class="space-y-8">
	<h1 class="text-3xl font-bold text-gray-900 md:text-4xl">Blog</h1>

	{#if data.posts.length > 0}
		<ul class="space-y-6">
			{#each data.posts as post}
				<li class="space-y-1">
					<a href={`/blog/${post.slug}`}>
						<h2
							class="text-2xl font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800"
						>
							{post.title}
						</h2>
					</a>
					<p class="text-sm text-gray-500">{formatDate(post.date)}</p>
					{#if post.description}
						<p class="text-base text-gray-700">{post.description}</p>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-gray-600">No posts yet. Stay tuned!</p>
	{/if}
</section>
