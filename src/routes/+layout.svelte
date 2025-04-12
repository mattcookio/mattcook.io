<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	// Handle client-side SPA redirection after GitHub Pages 404 fallback
	onMount(() => {
		if (browser) {
			const redirect = sessionStorage.getItem('redirect');
			if (redirect) {
				sessionStorage.removeItem('redirect');
				// Use SvelteKit's goto for client-side navigation
				goto('/' + redirect, { replaceState: true });
			}
		}
	});
</script>

<div class="flex min-h-screen flex-col bg-white text-gray-800">
	<header class="mx-auto w-full max-w-4xl space-y-4 px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
		<h1 class="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">Matt Cook</h1>
		<nav class="mt-4">
			<ul class="flex space-x-4 text-lg">
				<li><a href="/" class="text-blue-600 hover:underline">Home</a></li>
				<li><a href="/resume" class="text-blue-600 hover:underline">Resume</a></li>
			</ul>
		</nav>
	</header>

	<main class="mx-auto w-full max-w-4xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
		{@render children()}
	</main>

	<footer
		class="mx-auto w-full max-w-4xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8"
	>
		&copy; {new Date().getFullYear()} Matt Cook. All rights reserved.
	</footer>
</div>
