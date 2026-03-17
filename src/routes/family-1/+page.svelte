<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';

	const specs = [
		{ label: '5 Units', detail: 'Family-sized homes' },
		{ label: '3 Bed / 1,300 sqft', detail: 'Real space for families' },
		{ label: 'Outdoor Space', detail: 'Private for every unit' },
		{ label: 'Fall 2026', detail: 'Under construction now' }
	];
</script>

<svelte:head>
	<title>FAMILY 1 | Toronto Fourplex Rental Homes by NBRS</title>
	<meta name="description" content="FAMILY 1 is NBRS's first multiplex project — five family-sized 3-bedroom rental homes in a vibrant Toronto neighbourhood. Coming Fall 2026." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/family-1" />
	<meta property="og:title" content="FAMILY 1 | Toronto Fourplex Rental Homes by NBRS" />
	<meta property="og:description" content="FAMILY 1 is NBRS's first multiplex project — five family-sized 3-bedroom rental homes in a vibrant Toronto neighbourhood." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="FAMILY 1 | Toronto Fourplex Rental Homes by NBRS" />
	<meta name="twitter:description" content="FAMILY 1 — five family-sized 3-bedroom multiplex rental homes in Toronto by NBRS." />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Residence Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Residence",
		"name": "FAMILY 1",
		"description": "Five family-sized 3-bedroom rental homes in a Toronto multiplex — quality neighbourhood-scale housing by NBRS.",
		"numberOfBedrooms": 3,
		"numberOfRooms": 6,
		"floorSize": { "@type": "QuantitativeValue", "value": 1300, "unitCode": "FTK" },
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Toronto",
			"addressRegion": "ON",
			"addressCountry": "CA"
		},
		"url": "https://nbrs.ca/family-1"
	})}</script>`}
</svelte:head>

<!-- Hero Section -->
<section aria-label="FAMILY 1" class="relative min-h-[70vh] flex items-center overflow-hidden">
	<div class="absolute inset-0">
		<video
			autoplay
			muted
			loop
			playsinline
			poster="/videos/new/building-render-dusk.jpg"
			class="w-full h-full object-cover"
			aria-label="FAMILY 1 multiplex building render at dusk"
		>
			<source src="/videos/new/building-render-dusk.mp4" type="video/mp4" />
		</video>
		<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
	</div>
	<div class="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 sm:py-40">
		<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<span class="inline-block bg-nbrs-green text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 sm:mb-6">
				Coming Soon
			</span>
			<h1 class="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
				FAMILY 1
			</h1>
			<p class="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl">
				Five family-sized rental homes in a Toronto multiplex — designed from the ground up for families who need space to grow.
			</p>
		</div>
	</div>
</section>

<!-- Specs Grid -->
<section aria-label="Project specifications" class="py-12 sm:py-16 md:py-20 bg-white border-b border-gray-100">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
			{#each specs as spec, i}
				<div
					class="text-center"
					use:scrollReveal={{ type: 'slide-up', duration: 0.6, delay: i * 0.1 }}
				>
					<div class="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-nbrs-green/10 flex items-center justify-center" aria-hidden="true">
						{#if i === 0}
							<svg class="w-6 sm:w-7 h-6 sm:h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						{:else if i === 1}
							<svg class="w-6 sm:w-7 h-6 sm:h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
							</svg>
						{:else if i === 2}
							<svg class="w-6 sm:w-7 h-6 sm:h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
							</svg>
						{:else}
							<svg class="w-6 sm:w-7 h-6 sm:h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						{/if}
					</div>
					<h3 class="font-bold text-gray-900 mb-1 text-sm sm:text-base">{spec.label}</h3>
					<p class="text-xs sm:text-sm text-gray-600">{spec.detail}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Description -->
<section aria-labelledby="about-family1" class="py-16 sm:py-20 md:py-28 bg-gray-50">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 text-center" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
		<h2 id="about-family1" class="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
			Neighbourhood-Scale Housing, Built for Families
		</h2>
		<p class="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
			FAMILY 1 is a multiplex in a vibrant Toronto neighbourhood — five three-bedroom, 1,300 sq ft homes with dedicated outdoor space, real storage, and room for life to happen. It's the kind of fourplex housing that shaped Toronto's best streets, updated for families today.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/waitlist"
				class="btn btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold min-h-[48px]"
			>
				Join the Waitlist
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</a>
			<a
				href="/partner"
				class="btn btn-secondary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold min-h-[48px] text-nbrs-green border-nbrs-green"
			>
				Partner With Us
			</a>
		</div>
	</div>
</section>
