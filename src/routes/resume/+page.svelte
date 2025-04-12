<script lang="ts">
	import {
		isSkillsSection,
		resumeData,
		type ResumeItem,
		type ResumeSection,
		type SkillsSection
	} from '$lib/resume';
	import { slide } from 'svelte/transition';

	const STORAGE_KEY = 'resumeCollapsibleState';

	// Function to generate unique keys for state management
	function generateStateKeys() {
		const keys: Record<string, boolean> = {};
		resumeData.forEach((section: ResumeSection | SkillsSection) => {
			keys[section.id] = false; // Key for the main section
			if (!isSkillsSection(section)) {
				// We know it's a ResumeSection here due to the type guard
				(section as ResumeSection).items.forEach((item: ResumeItem) => {
					const itemKey = getItemKey(section.id, item.title); // Use helper
					if (
						item.points ||
						item.subItems ||
						item.description ||
						item.points_after_subItems ||
						// Handle Recognition section edge case (item with points but no title)
						(section.id === 'recognition' && item.points)
					) {
						// Only add keys for items that actually have collapsible content
						keys[itemKey] = false;
					}
				});
			}
		});
		return keys;
	}

	const defaultState = generateStateKeys();

	// Function to compute the initial state
	function getInitialCollapsibleState() {
		if (typeof window !== 'undefined') {
			const savedState = localStorage.getItem(STORAGE_KEY);
			if (savedState) {
				try {
					const parsedState = JSON.parse(savedState) as Record<string, boolean>;
					// Merge saved state with defaults, ensuring all keys exist
					// Filter parsedState to only include keys that exist in defaultState
					const filteredParsedState: Record<string, boolean> = {};
					for (const key in defaultState) {
						if (parsedState.hasOwnProperty(key)) {
							filteredParsedState[key] = parsedState[key];
						}
					}
					return { ...defaultState, ...filteredParsedState };
				} catch (e) {
					console.error('Error parsing saved resume state:', e);
				}
			}
		}
		return defaultState;
	}

	// Initialize state with $state
	let collapsibleState = $state(getInitialCollapsibleState());

	// Save state reactively using $effect
	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsibleState));
		}
	});

	// State for AI Summary visibility (keep separate)
	let summaryVisible = $state(false);

	// Pre-written AI Summary content
	const aiSummary = `Matt Cook is a <strong>pragmatic</strong>, <strong>kind</strong>, <strong>enthusiastic</strong>, and <strong>customer-focused</strong> software engineer with a strong <strong>collaborative spirit</strong> and a <strong>passion for crafting simple, beautiful user experiences</strong>. He blends <strong>strong interpersonal skills</strong> with <strong>deep technical expertise</strong> (full-stack, architecture, cloud) to solve complex problems effectively within a team, always keeping the end-user in mind.`;

	// Helper to generate item key used in the template and state generation
	function getItemKey(sectionId: string, itemTitle: string): string {
		const cleanTitle = itemTitle ? itemTitle.replace(/\W+/g, '_') : 'no_title';
		return `${sectionId}-${cleanTitle}`;
	}

	// Devicon class mapping (Prioritizing non-wordmark originals where available)
	const techIconMap: Record<string, string> = {
		'Full-Stack Typescript + Javascript': 'devicon-typescript-original devicon-javascript-original',
		Neovim: 'devicon-neovim-plain',
		React: 'devicon-react-plain',
		GraphQL: 'devicon-graphql-plain',
		Vue: 'devicon-vuejs-plain',
		Svelte: 'devicon-svelte-plain',
		'Next.js': 'devicon-nextjs-plain',
		'Nest.js': 'devicon-nestjs-plain',
		'Material UI': 'devicon-materialui-plain',
		Tailwind: 'devicon-tailwindcss-plain',
		Docker: 'devicon-docker-plain',
		PostgreSQL: 'devicon-postgresql-plain',
		AWS: 'devicon-amazonwebservices-plain-wordmark',
		Gulp: 'devicon-gulp-plain',
		Express: 'devicon-express-original-wordmark',
		Sass: 'devicon-sass-plain',
		CSS: 'devicon-css3-plain',
		Golang: 'devicon-go-plain',
		Python: 'devicon-python-plain'
	};
</script>

<svelte:head>
	<title>Resume - Matt Cook</title>
	<meta name="description" content="Resume of Matt Cook, Lead Software Engineer." />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
</svelte:head>

<h1 class="mb-6 text-3xl font-bold text-gray-900">Matt Cook</h1>

<!-- Action Buttons -->
<div class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
	<a href="/resume.pdf" download class="text-sm text-blue-600 hover:underline">Download PDF</a>
	<a
		href="/resume.md"
		target="_blank"
		rel="noopener noreferrer"
		class="text-sm text-blue-600 hover:underline">View Plain Text</a
	>
	<button
		on:click={() => (summaryVisible = !summaryVisible)}
		class="text-sm text-blue-600 hover:underline"
	>
		{summaryVisible ? 'Hide' : 'Show'} AI Summary
	</button>
</div>

<!-- AI Summary Section -->
{#if summaryVisible}
	<div class="mt-4 mb-6 rounded border border-gray-200 bg-gray-50 p-4 text-sm" transition:slide>
		<h3 class="mb-2 font-semibold text-gray-800">AI Summary</h3>
		<p class="text-gray-700">{@html aiSummary}</p>
		{#if false}
			<!-- TODO: Replace with dynamically generated summary if needed -->
		{/if}
	</div>
{/if}

<!-- Render Resume Sections -->
{#each resumeData as section (section.id)}
	<section class="mb-6">
		<!-- Main Section Header -->
		<button
			on:click={() => (collapsibleState[section.id] = !collapsibleState[section.id])}
			class="mb-3 flex w-full cursor-pointer items-center justify-between border-b-2 border-gray-200 pb-2 text-left text-2xl font-semibold text-gray-900 hover:text-blue-600 focus:outline-none"
		>
			<span class="flex-1">{section.title}</span>
			<span class="flex-shrink-0 text-xl">{collapsibleState[section.id] ? '[-]' : '[+]'}</span>
		</button>

		<!-- Section Content -->
		{#if collapsibleState[section.id]}
			<div class="mt-3" transition:slide>
				{#if isSkillsSection(section)}
					<!-- Skills Section Specific Layout -->
					<p class="mb-2">{section.strengths.join(', ')}</p>
					<h3 class="mt-4 mb-2 text-xl font-medium text-gray-900">Languages, Tools, Frameworks</h3>
					<div class="flex flex-wrap gap-2">
						{#each section.technologies as tech (tech)}
							{@const iconClass = techIconMap[tech]}
							{#if tech === 'and more'}
								<span class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800">{tech}</span>
							{:else}
								<span
									class="inline-flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm text-gray-800"
									title={tech}
								>
									{#if iconClass}
										<i class="{iconClass} colored"></i>
									{/if}
									<span>{tech}</span>
								</span>
							{/if}
						{/each}
					</div>
				{:else}
					<!-- Layout for Regular Sections (Education, Experience, etc.) -->
					{#each section.items as item (getItemKey(section.id, item.title))}
						{@const itemKey = getItemKey(section.id, item.title)}
						{@const hasContent = !!(
							item.points ||
							item.subItems ||
							item.description ||
							item.points_after_subItems
						)}
						<div class="mb-4">
							<!-- Sub-Section Header (only if item has a title) -->
							{#if item.title}
								<button
									disabled={!hasContent}
									on:click={() => {
										if (hasContent) collapsibleState[itemKey] = !collapsibleState[itemKey];
									}}
									class="flex w-full items-center gap-2 text-left text-lg font-medium text-gray-900 focus:outline-none disabled:cursor-default disabled:text-gray-900"
									class:cursor-pointer={hasContent}
									class:hover:text-blue-600={hasContent}
								>
									{#if hasContent}
										<span class="flex-shrink-0 text-sm"
											>{collapsibleState[itemKey] ? '[-]' : '[+]'}</span
										>
									{/if}
									<span class="flex-1">{item.title}</span>
								</button>
							{/if}

							<!-- Sub-Section Content (Show if no title OR if it has content and is open) -->
							{#if !item.title || (hasContent && collapsibleState[itemKey])}
								<div transition:slide class="mt-1 {item.title ? 'ml-6' : ''}">
									{#if item.date}
										<p class="text-gray-600">{item.date}</p>
									{/if}
									{#if item.description}
										<p class="mt-1 text-sm text-gray-700">{item.description}</p>
									{/if}
									{#if item.points}
										<ul class="mt-1 ml-4 list-inside list-disc text-sm text-gray-700">
											{#each item.points as point}
												<li>{point}</li>
											{/each}
										</ul>
									{/if}
									{#if item.subItems}
										<ul
											class="list-circle ml-10 list-inside text-sm text-gray-700 {item.points
												? 'mt-1'
												: ''}"
										>
											{#each item.subItems as subPoint (subPoint.title)}
												<li>{subPoint.title}</li>
											{/each}
										</ul>
									{/if}
									{#if item.points_after_subItems}
										<ul class="mt-1 ml-4 list-inside list-disc text-sm text-gray-700">
											{#each item.points_after_subItems as point}
												<li>{point}</li>
											{/each}
										</ul>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</section>
{/each}
