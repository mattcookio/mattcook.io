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

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-white text-gray-800">
	<header class="mx-auto w-full max-w-4xl space-y-4 px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
		<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-center md:gap-6">
			<!-- Container for cropping -->
			<div class="h-24 w-16 flex-shrink-0 overflow-hidden rounded-full md:h-28 md:w-20">
				<img src="/me.png" alt="Matt Cook pixel art" class="h-full w-full object-cover" />
			</div>
			<div class="flex flex-col items-center text-center sm:items-start sm:text-left">
				<h1 class="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">Matt Cook</h1>
				<nav class="mt-2">
					<ul class="flex space-x-4 text-lg">
						<li><a href="/" class="text-blue-600 hover:underline">Home</a></li>
						<li><a href="/resume" class="text-blue-600 hover:underline">Resume</a></li>
					</ul>
				</nav>
			</div>
		</div>
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
