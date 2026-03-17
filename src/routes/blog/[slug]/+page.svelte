<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateStr: string): string {
		return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-CA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.post.title} | NBRS Blog</title>
	<meta name="description" content={data.post.description} />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://nbrs.ca/blog/{data.post.slug}" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<meta property="article:published_time" content={data.post.date} />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.description} />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Article Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": data.post.title,
		"description": data.post.description,
		"datePublished": data.post.date,
		"author": {
			"@type": "Organization",
			"name": "NBRS Developments Inc.",
			"url": "https://nbrs.ca"
		},
		"publisher": {
			"@type": "Organization",
			"name": "NBRS Developments Inc.",
			"logo": "https://nbrs.ca/images/nbrs-logo-dark.svg"
		},
		"mainEntityOfPage": `https://nbrs.ca/blog/${data.post.slug}`
	})}</script>`}
</svelte:head>

<div class="bg-nbrs-green min-h-screen">
	<div class="h-[80px] md:h-[100px]"></div>

	<div class="max-w-[1440px] mx-auto px-4 md:px-6">
		<!-- Back link -->
		<a href="/blog" class="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm pt-4 mb-8">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			All Posts
		</a>

		<!-- Article Header -->
		<header class="mb-12 md:mb-16">
			<time class="text-sm text-white/50 block mb-4">{formatDate(data.post.date)}</time>
			<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
				{data.post.title}
			</h1>
		</header>

		<!-- Article Content -->
		<article class="max-w-3xl pb-16 md:pb-24 prose-blog">
			{@html data.post.content}
		</article>

		<!-- CTA -->
		<div class="max-w-3xl pb-16 md:pb-24 border-t border-white/20 pt-8">
			<p class="text-lg text-white/80 mb-4">Want to learn more about what we're building?</p>
			<div class="flex flex-wrap gap-4">
				<a
					href="/family-1"
					class="inline-flex items-center gap-2 bg-white text-nbrs-green px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
				>
					See FAMILY 1
				</a>
				<a
					href="/waitlist"
					class="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
				>
					Join the Waitlist
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.prose-blog p) {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.125rem;
		line-height: 1.75;
		margin-bottom: 1.25rem;
	}
	:global(.prose-blog h2) {
		color: white;
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}
	:global(.prose-blog a) {
		color: white;
		text-decoration: underline;
	}
	:global(.prose-blog a:hover) {
		opacity: 0.8;
	}
	:global(.prose-blog ul) {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.125rem;
		line-height: 1.75;
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
		list-style-type: disc;
	}
	:global(.prose-blog li) {
		margin-bottom: 0.5rem;
	}
	:global(.prose-blog strong) {
		color: white;
	}
	:global(.prose-blog em) {
		font-style: italic;
	}
	@media (min-width: 768px) {
		:global(.prose-blog p) {
			font-size: 1.25rem;
		}
		:global(.prose-blog h2) {
			font-size: 1.875rem;
		}
	}
</style>
