<script lang="ts">
	// Import the email constants
	import { emailObfuscated, emailRaw } from '$lib/resume';
</script>

<!-- About Section -->
<section class="mb-12 space-y-4 md:mb-12">
	<h2 class="text-xl font-semibold text-gray-900 md:text-2xl">About Me</h2>
	<p class="text-justify text-base leading-relaxed text-gray-700 md:text-lg">
		👋🏼 Hey there! I'm Matt, a <strong>software engineer</strong>, <strong>musician</strong>, and
		<strong>silly goose 🪿</strong> rooted in Kansas City.
	</p>
	<p class="mt-4 text-justify text-base leading-relaxed text-gray-700 md:text-lg">
		Currently building <a
			href="https://studiokit.io"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-600 transition-colors duration-200 hover:text-blue-800">StudioKit</a
		> - a platform for managing private music lesson studios.
	</p>
</section>

<!-- Projects Section -->
<section class="mb-12 space-y-4 md:mb-12">
	<h2 class="text-xl font-semibold text-gray-900 md:text-2xl">Projects</h2>
	<ul class="space-y-6">
		<!-- Project: mattcook.io -->
		<li class="space-y-1">
			<h3 class="text-lg font-semibold text-gray-800">mattcook.io</h3>
			<p class="text-gray-600">You're looking at it!</p>
			<a
				href="https://github.com/mattcookio/mattcook.io"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
				>View on GitHub &rarr;</a
			>
		</li>

		<!-- Project 1: pivot.nvim -->
		<li class="space-y-1">
			<h3 class="text-lg font-semibold text-gray-800">pivot.nvim</h3>
			<p class="text-gray-600">🪄 Intelligent buffer and window management for Neovim.</p>
			<a
				href="https://github.com/mattcookio/pivot.nvim"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
				>View on GitHub &rarr;</a
			>
		</li>

		<!-- Project 2: emojilang -->
		<li class="space-y-1">
			<h3 class="text-lg font-semibold text-gray-800">emojilang</h3>
			<p class="text-gray-600">
				A stupid, minimal compiled programming language written in typescript that uses emojis.
			</p>
			<a
				href="https://github.com/mattcookio/emojilang"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
				>View on GitHub &rarr;</a
			>
		</li>

		<!-- Project 3: dotfiles -->
		<li class="space-y-1">
			<h3 class="text-lg font-semibold text-gray-800">dotfiles</h3>
			<p class="text-gray-600">My dotfiles, environment setup scripts, Neovim stuff, etc.</p>
			<a
				href="https://github.com/mattcookio/dotfiles"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
				>View on GitHub &rarr;</a
			>
		</li>
	</ul>
</section>

<!-- Connect Section -->
<section class="space-y-4">
	<h2 class="text-xl font-semibold text-gray-900 md:text-2xl">Connect</h2>
	<div class="flex flex-wrap gap-x-6 gap-y-2">
		<a
			href="https://github.com/mattcookio"
			target="_blank"
			rel="noopener noreferrer"
			class="text-lg text-blue-600 transition-colors duration-200 hover:text-blue-800">GitHub</a
		>
		<a
			href="https://linkedin.com/in/mattcookxyz"
			target="_blank"
			rel="noopener noreferrer"
			class="text-lg text-blue-600 transition-colors duration-200 hover:text-blue-800">LinkedIn</a
		>
		<a
			href={`mailto:${emailRaw}`}
			class="text-lg text-blue-600 transition-colors duration-200 hover:text-blue-800"
			>{@html emailObfuscated}</a
		>
	</div>
</section>
