<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white text-gray-800">
	<!-- Header Moved from Page -->
	<header class="mx-auto w-full max-w-4xl px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">Cook</h1>
	</header>

	<!-- Page Content Area -->
	<main class="mx-auto w-full max-w-4xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
		<!-- Added flex-grow, reduced padding slightly -->
		{@render children()}
	</main>

	<!-- Footer Moved from Page -->
	<footer
		class="mx-auto w-full max-w-4xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8"
	>
		&copy; {new Date().getFullYear()} Matt Cook. All rights reserved.
	</footer>
</div>
