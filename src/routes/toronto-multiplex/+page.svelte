<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';
</script>

<svelte:head>
	<title>Toronto Multiplex Housing: Building the Missing Middle | NBRS</title>
	<meta name="description" content="Toronto multiplex housing explained — what multiplexes are, why the city needs them, and how NBRS is building fourplex and multiplex rental homes for families." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://nbrs.ca/toronto-multiplex" />
	<meta property="og:title" content="Toronto Multiplex Housing: Building the Missing Middle | NBRS" />
	<meta property="og:description" content="Toronto multiplex housing explained — what multiplexes are, why the city needs them, and how NBRS is building fourplex and multiplex rental homes for families." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Toronto Multiplex Housing: Building the Missing Middle" />
	<meta name="twitter:description" content="Toronto multiplex housing explained — what multiplexes are, why the city needs them, and how NBRS is building them." />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- WebPage + Article Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": "Toronto Multiplex Housing: Building the Missing Middle",
		"description": "Toronto multiplex housing explained — what multiplexes are, why the city needs them, and how NBRS is building fourplex and multiplex rental homes for families.",
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
		"mainEntityOfPage": "https://nbrs.ca/toronto-multiplex",
		"about": ["multiplex housing Toronto", "fourplex Toronto", "missing middle housing", "Toronto multiplex developer"]
	})}</script>`}
</svelte:head>

<div class="bg-nbrs-green min-h-screen">
	<div class="h-[80px] md:h-[100px]"></div>

	<div class="max-w-[1440px] mx-auto px-4 md:px-6">
		<!-- H1 -->
		<h1
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] pt-8 pb-12 md:pb-16"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			Toronto Multiplex<br/>Housing
		</h1>

		<!-- Intro -->
		<div class="max-w-3xl mb-16 md:mb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.1 }}>
			<p class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed mb-6">
				For decades, Toronto's residential neighbourhoods were locked into a binary: single-family houses or high-rise towers. Nothing in between.
			</p>
			<p class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed mb-6">
				That changed in May 2023, when Toronto updated its zoning to allow multiplex housing as-of-right across the city. Now, duplexes, triplexes, fourplexes, and sixplexes can be built on virtually any residential lot — without rezoning.
			</p>
			<p class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
				This is the most significant housing policy shift in a generation. And it opens the door to the kind of housing Toronto has been missing for 50 years.
			</p>
		</div>

		<!-- Divider -->
		<div class="border-t border-white/20 mb-16 md:mb-24"></div>

		<!-- What is a Multiplex? -->
		<section class="mb-16 md:mb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">What Is a Multiplex?</h2>
			<div class="max-w-3xl">
				<p class="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
					A multiplex is a residential building with two to six units. The term covers a range of building types:
				</p>
				<ul class="text-lg md:text-xl text-white/80 leading-relaxed mb-4 space-y-2">
					<li><span class="text-white font-semibold">Duplex</span> — 2 units</li>
					<li><span class="text-white font-semibold">Triplex</span> — 3 units</li>
					<li><span class="text-white font-semibold">Fourplex</span> — 4 units</li>
					<li><span class="text-white font-semibold">Fiveplex / Sixplex</span> — 5-6 units</li>
				</ul>
				<p class="text-lg md:text-xl text-white/80 leading-relaxed">
					These are the building types that shaped Toronto's most beloved neighbourhoods — the Annex, Riverdale, High Park, Leslieville. Walk any established street and you'll see them. They fit the scale of the neighbourhood while housing more families per lot than a single home.
				</p>
			</div>
		</section>

		<!-- Divider -->
		<div class="border-t border-white/20 mb-16 md:mb-24"></div>

		<!-- Why Toronto Needs Multiplex Housing -->
		<section class="mb-16 md:mb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">Why Toronto Needs Multiplex Housing</h2>
			<div class="max-w-3xl">
				<p class="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
					Toronto has a "missing middle" problem. The gap between detached houses and condo towers means families who need space — three bedrooms, storage, outdoor access — have almost nowhere to go. They're priced out of houses and squeezed out of condos.
				</p>
				<p class="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
					Multiplex housing fills this gap. It adds gentle density to existing neighbourhoods without changing their character. It keeps families in the city, supports local schools and businesses, and makes better use of transit and infrastructure that's already there.
				</p>
				<p class="text-lg md:text-xl text-white/80 leading-relaxed">
					<a href="/mission" class="underline hover:opacity-80">Learn more about the missing middle</a> and why we build.
				</p>
			</div>
		</section>

		<!-- Divider -->
		<div class="border-t border-white/20 mb-16 md:mb-24"></div>

		<!-- NBRS: Toronto's Multiplex Developer -->
		<section class="mb-16 md:mb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">NBRS: Toronto's Multiplex Developer</h2>
			<div class="max-w-3xl">
				<p class="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
					NBRS (pronounced "neighbours") is building the multiplex housing Toronto needs — but with a difference. Where most developers build small units for investors, we build family-sized homes: three-bedroom, 1,300 sq ft units with real storage and outdoor space.
				</p>
				<p class="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
					Our tech-enabled approach targets as-of-right sites and delivers new housing in 12-18 months. No rezoning. No years-long delays. Just quality fourplex and multiplex homes in established neighbourhoods.
				</p>
				<p class="text-lg md:text-xl text-white/80 leading-relaxed">
					We're looking for <a href="/partner" class="underline hover:opacity-80">partners who share our vision</a> — investors, landowners, and organizations aligned with building better housing. Our first project, <a href="/family-1" class="underline hover:opacity-80">FAMILY 1</a>, is under construction now.
				</p>
			</div>
		</section>

		<!-- CTA Section -->
		<div class="pb-16 md:pb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<div class="flex flex-wrap gap-4">
				<a
					href="/family-1"
					class="inline-flex items-center gap-2 bg-white text-nbrs-green px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
				>
					See Our First Project
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
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
