<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';

	const faqs = [
		{
			question: 'What is NBRS?',
			answer: 'NBRS (pronounced "neighbours") is a Toronto-based developer building quality rental housing at the neighbourhood scale. We focus on 5-10 unit buildings in established neighbourhoods—the kind of homes Toronto used to build but stopped decades ago.'
		},
		{
			question: 'What is "missing middle" housing?',
			answer: "Missing middle housing refers to the range of multi-unit housing types between single-family homes and high-rise apartments—duplexes, triplexes, townhouses, and small apartment buildings. These building types were common in Toronto until restrictive zoning made them illegal to build. Recent policy changes are finally making them possible again."
		},
		{
			question: 'Where are you building?',
			answer: "We target established Toronto neighbourhoods with as-of-right permissions, meaning we can build without lengthy rezoning processes. Our first project, FAMILY 1, is located in a vibrant neighbourhood with excellent schools, parks, and transit access."
		},
		{
			question: 'Who can rent from NBRS?',
			answer: "Our homes are designed for families who want to stay in Toronto but need more space than typical condos offer. We're looking for renters who value quality, community, and neighbourhood living. Sign up for our waitlist to be notified when units become available."
		},
		{
			question: 'How big are the units?',
			answer: "Our units are designed for families, with real bedrooms, real storage, and real space. FAMILY 1 features three-bedroom units with dedicated outdoor space—the kind of homes that are almost impossible to find in Toronto's rental market."
		},
		{
			question: 'What does "as-of-right" mean?',
			answer: "As-of-right development means the zoning already permits what we want to build. We don't need to apply for rezoning or go through lengthy approval processes. This allows us to deliver new housing in 12-18 months instead of years."
		},
		{
			question: 'How can I partner with NBRS?',
			answer: "We're looking for partners who share our vision: accredited investors seeking stable returns with social impact, landowners with underutilized parcels, brokers with off-market or as-of-right sites, and nonprofits looking to expand community housing. Visit our Partner page to get in touch."
		},
		{
			question: 'When will FAMILY 1 be ready?',
			answer: "FAMILY 1 is currently in development. We expect construction to begin in 2026 with first move-ins in 2027. Join our waitlist to stay updated on progress and availability."
		}
	];

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<svelte:head>
	<title>FAQs | NBRS</title>
	<meta name="description" content="Frequently asked questions about NBRS and our neighbourhood-scale rental housing projects in Toronto." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/faqs" />
	<meta property="og:title" content="FAQs | NBRS" />
	<meta property="og:description" content="Frequently asked questions about NBRS and our neighbourhood-scale rental housing projects in Toronto." />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="FAQs | NBRS" />
	<meta name="twitter:description" content="Frequently asked questions about NBRS neighbourhood-scale rental housing." />
</svelte:head>

<div class="bg-nbrs-green min-h-screen">
	<div class="h-[80px] md:h-[100px]"></div>

	<div class="max-w-[1440px] mx-auto px-4 md:px-6">
		<!-- Hero Title -->
		<h1
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] pt-8 pb-12 md:pb-16"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			Frequently Asked<br/>Questions
		</h1>

		<!-- FAQ List -->
		<div class="max-w-3xl pb-16 md:pb-24">
			{#each faqs as faq, i}
				<div
					class="border-t border-white/20"
					use:scrollReveal={{ type: 'fade', duration: 0.6, delay: i * 0.05 }}
				>
					<button
						onclick={() => toggle(i)}
						class="w-full py-6 flex items-start justify-between gap-4 text-left group"
						aria-expanded={openIndex === i}
					>
						<span class="text-lg md:text-xl lg:text-2xl font-semibold text-white group-hover:opacity-80 transition-opacity">
							{faq.question}
						</span>
						<span
							class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/60 transition-transform duration-300"
							class:rotate-45={openIndex === i}
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
						</span>
					</button>
					{#if openIndex === i}
						<div class="pb-6 pr-10">
							<p class="text-base md:text-lg text-white/80 leading-relaxed">
								{faq.answer}
							</p>
						</div>
					{/if}
				</div>
			{/each}
			<div class="border-t border-white/20"></div>
		</div>

		<!-- CTA Section -->
		<div class="pb-16 md:pb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<p class="text-xl md:text-2xl text-white/80 mb-6">
				Still have questions?
			</p>
			<a
				href="/partner"
				class="inline-flex items-center gap-2 bg-white text-nbrs-green px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
			>
				Get in Touch
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</a>
		</div>
	</div>
</div>
