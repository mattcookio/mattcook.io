<script lang="ts">
	// Import the email constants
	import { emailObfuscated, emailRaw } from '$lib/resume';
</script>

<!-- About Section -->
<section class="mb-12 space-y-4 md:mb-12">
	<div class="flex items-center gap-4">
		<h2 class="flex-shrink-0 text-2xl font-semibold text-gray-900">About Me</h2>
		<hr class="w-full flex-grow border-t-2 border-gray-200" />
	</div>
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
	<div class="flex items-center gap-4">
		<h2 class="flex-shrink-0 text-2xl font-semibold text-gray-900">Projects</h2>
		<hr class="w-full flex-grow border-t-2 border-gray-200" />
	</div>
	<ul class="space-y-6">
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

		<!-- Project 3: ConfiGREP -->
		<li class="space-y-1">
			<h3 class="text-lg font-semibold text-gray-800">ConfiGREP 🔍</h3>
			<p class="text-gray-600">A CLI tool for exploring configuration files. Auto-discovers .env, .json, .yaml, .toml, .ini files and presents them in a clean tree structure with interactive browsing and search.</p>
			<a
				href="https://github.com/mattcookio/configrep"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
				>View on GitHub &rarr;</a
			>
		</li>

		<!-- Project 4: dotfiles -->
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
	<div class="flex items-center gap-4">
		<h2 class="flex-shrink-0 text-2xl font-semibold text-gray-900">Connect</h2>
		<hr class="w-full flex-grow border-t-2 border-gray-200" />
	</div>
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
