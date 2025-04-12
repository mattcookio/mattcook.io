<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white text-gray-800">
	<header class="mx-auto w-full max-w-4xl space-y-4 px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
		<h1 class="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">Matt Cook</h1>
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
