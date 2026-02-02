<script lang="ts">
	import VideoHero from '$lib/components/VideoHero.svelte';
	import VideoSection from '$lib/components/VideoSection.svelte';
	import BuildTimeline from '$lib/components/BuildTimeline.svelte';
	import ConstructionProgress from '$lib/components/ConstructionProgress.svelte';
	import CompanyTimeline from '$lib/components/CompanyTimeline.svelte';
	import { scrollReveal, parallax } from '$lib/utils/gsap';

	// LCP optimization: Preload the hero poster for faster initial render
	const heroPosterUrl = '/videos/new/community-street-festival.jpg';

	// Hero video - community-oriented street festival footage
	const heroVideo = {
		mp4: '/videos/new/community-street-festival.mp4',
		webm: '/videos/new/community-street-festival.webm',
		poster: '/videos/new/community-street-festival.jpg'
	};

	// FAMILY 1 building render video (local asset)
	const family1Video = {
		mp4: '/videos/new/building-render-dusk.mp4',
		poster: '/videos/new/building-render-dusk.jpg'
	};

	// Toronto skyline video for About section
	const torontoVideo = {
		mp4: '/videos/new/toronto-skyline-sunset.mp4',
		poster: '/videos/new/toronto-skyline-sunset.jpg'
	};

	</script>

<svelte:head>
	<title>NBRS - Quality Rental Housing at the Neighbourhood Scale</title>
	<meta
		name="description"
		content="Quality rental housing at the neighbourhood scale. NBRS (pronounced 'neighbours') builds family-sized homes in established Toronto communities."
	/>
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/" />
	<meta property="og:title" content="NBRS - Quality Rental Housing at the Neighbourhood Scale" />
	<meta property="og:description" content="Quality rental housing at the neighbourhood scale. NBRS builds family-sized homes in established Toronto communities." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/community-street-festival.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="NBRS - Quality Rental Housing at the Neighbourhood Scale" />
	<meta name="twitter:description" content="Quality rental housing at the neighbourhood scale. NBRS builds family-sized homes in established Toronto communities." />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/community-street-festival.jpg" />
	<!-- Preload LCP image for faster hero render -->
	<link rel="preload" as="image" href={heroPosterUrl} fetchpriority="high" />
</svelte:head>

<!-- Hero Section - Single video (negative margin to go behind nav) -->
<section aria-label="Welcome" class="-mt-16">
	<VideoHero source={heroVideo} overlayClass="bg-gradient-to-b from-black/40 via-black/20 to-black/50">
		<div class="flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
			<h1 class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
				Built for Families.<br />Rooted in Community.
			</h1>
			<p class="text-base xs:text-lg sm:text-xl md:text-2xl font-light max-w-2xl opacity-90">
				Quality rental housing at the neighbourhood scale
			</p>

			<!-- Scroll indicator -->
			<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
				<svg class="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>
		</div>
	</VideoHero>
</section>

<!-- FAMILY 1 Project Preview - Using building render video -->
<section aria-labelledby="family1-heading" class="py-16 sm:py-20 md:py-32 bg-white overflow-hidden">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'fade', duration: 1.2 }} use:parallax={{ speed: 0.15 }}>
				<VideoSection source={family1Video} aspectRatio="3/4" objectPosition="top" overlayClass="bg-black/10">
					<div class="absolute inset-0 flex items-end p-4 sm:p-6">
						<span class="text-white text-sm font-medium bg-nbrs-green px-4 py-2 rounded-full">
							Coming 2026
						</span>
					</div>
				</VideoSection>
			</div>
			<div>
				<span
					use:scrollReveal={{ type: 'slide-up', duration: 0.8, distance: 20 }}
					class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block"
				>
					Our First Project
				</span>
				<h2
					id="family1-heading"
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.1, distance: 30 }}
					class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
				>
					FAMILY 1
				</h2>
				<p
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.2, distance: 25 }}
					class="text-base sm:text-lg text-gray-600 mb-4"
				>
					Five family-sized rentals in a vibrant Toronto neighbourhood. Designed from the ground up
					for families who need space to grow.
				</p>
				<p
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.3, distance: 25 }}
					class="text-base sm:text-lg text-gray-600"
				>
					Three-bedroom homes with real storage, outdoor space, and room for life to happen.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- How We Build Section - Illustrated Timeline -->
<BuildTimeline />

<!-- Construction Progress Section -->
<ConstructionProgress />

<!-- About/Mission Section -->
<section aria-labelledby="about-heading" class="py-16 sm:py-20 md:py-32 bg-white overflow-hidden">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
			<div>
				<span
					use:scrollReveal={{ type: 'slide-up', duration: 0.8, distance: 20 }}
					class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block"
				>
					Who We Are
				</span>
				<h2
					id="about-heading"
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.1, distance: 30 }}
					class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
				>
					Neighbourhood<br />Scale Housing
				</h2>
				<p
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.2, distance: 25 }}
					class="text-base sm:text-lg text-gray-600 mb-4"
				>
					We believe great cities are made of great neighbourhoods. NBRS (pronounced "neighbours") builds
					quality rental housing that integrates seamlessly into the communities we serve.
				</p>
				<p
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.3, distance: 25 }}
					class="text-base sm:text-lg text-gray-600 mb-4"
				>
					Smaller, distributed projects. Thoughtful design. Buildings that look like they belong—because they do.
				</p>
				<p
					use:scrollReveal={{ type: 'slide-up', duration: 1, delay: 0.4, distance: 25 }}
					class="text-base sm:text-lg text-gray-600"
				>
					We're here to prove that rental housing can be beautiful, functional, and good for the neighbourhood.
				</p>
			</div>
			<div use:scrollReveal={{ type: 'fade', duration: 1.2 }} use:parallax={{ speed: 0.15 }}>
				<VideoSection source={torontoVideo} aspectRatio="16/9" overlayClass="bg-black/10">
					<div class="absolute inset-0 flex items-end p-4 sm:p-6">
						<span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
							Toronto
						</span>
					</div>
				</VideoSection>
			</div>
		</div>
	</div>
</section>

<!-- Company Timeline - Visual Journey -->
<CompanyTimeline />
