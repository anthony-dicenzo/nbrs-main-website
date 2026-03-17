<script lang="ts">
	import { posts } from '$lib/posts';
	import { scrollReveal } from '$lib/utils/gsap';

	function formatDate(dateStr: string): string {
		return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-CA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog | Toronto Multiplex Housing Insights - NBRS</title>
	<meta name="description" content="Insights on Toronto multiplex development, missing middle housing policy, fourplex construction, and the challenges of building family housing in Toronto." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/blog" />
	<meta property="og:title" content="Blog | Toronto Multiplex Housing Insights - NBRS" />
	<meta property="og:description" content="Insights on Toronto multiplex development, missing middle housing policy, and the challenges of building family housing." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Blog | Toronto Multiplex Housing Insights - NBRS" />
	<meta name="twitter:description" content="Insights on Toronto multiplex development and missing middle housing policy." />
</svelte:head>

<div class="bg-nbrs-green min-h-screen">
	<div class="h-[80px] md:h-[100px]"></div>

	<div class="max-w-[1440px] mx-auto px-4 md:px-6">
		<!-- Hero Title -->
		<h1
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] pt-8 pb-12 md:pb-16"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			Blog
		</h1>

		<!-- Post List -->
		<div class="max-w-3xl pb-16 md:pb-24">
			{#each posts as post, i}
				<a
					href="/blog/{post.slug}"
					class="block border-t border-white/20 py-6 md:py-8 group"
					use:scrollReveal={{ type: 'fade', duration: 0.6, delay: i * 0.05 }}
				>
					<time class="text-sm text-white/50 block mb-2">{formatDate(post.date)}</time>
					<h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-white group-hover:opacity-80 transition-opacity mb-2">
						{post.title}
					</h2>
					<p class="text-base md:text-lg text-white/70">
						{post.description}
					</p>
				</a>
			{/each}
			<div class="border-t border-white/20"></div>
		</div>
	</div>
</div>
