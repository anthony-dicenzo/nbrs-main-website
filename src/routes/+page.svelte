<script lang="ts">
	import VideoHero from '$lib/components/VideoHero.svelte';
	import VideoSection from '$lib/components/VideoSection.svelte';
	import BuildTimeline from '$lib/components/BuildTimeline.svelte';
	import ConstructionProgress from '$lib/components/ConstructionProgress.svelte';
	import CompanyTimeline from '$lib/components/CompanyTimeline.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

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
		mp4: '/videos/new/building-render-dusk.mov'
	};

	// Toronto skyline video for About section
	const torontoVideo = {
		mp4: '/videos/new/toronto-skyline-sunset.mp4',
		poster: '/videos/new/toronto-skyline-sunset.jpg'
	};

	// Park with tulips - vision/planning content
	const parkVideo = {
		mp4: '/videos/new/park-tulips-skyline.mp4',
		poster: '/videos/new/park-tulips-skyline.jpg'
	};

	// Interior living room - showcasing home interiors
	const interiorVideo = {
		mp4: '/videos/new/interior-living-room.mp4',
		poster: '/videos/new/interior-living-room.jpg'
	};

	</script>

<svelte:head>
	<title>NBRS - Quality Rental Housing at the Neighbourhood Scale</title>
	<meta
		name="description"
		content="Quality rental housing at the neighbourhood scale. NBRS (pronounced 'neighbours') builds family-sized homes in established Toronto communities."
	/>
	<!-- Preload LCP image for faster hero render -->
	<link rel="preload" as="image" href={heroPosterUrl} fetchpriority="high" />
</svelte:head>

<!-- Hero Section - Single video -->
<section aria-label="Welcome">
	<VideoHero source={heroVideo} overlayClass="bg-gradient-to-b from-black/40 via-black/20 to-black/50">
		<div class="flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
			<h1 class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
				Building Homes,<br />Building Community
			</h1>
			<p class="text-base xs:text-lg sm:text-xl md:text-2xl font-light mb-6 md:mb-8 max-w-2xl opacity-90">
				Quality rental housing at the neighbourhood scale
			</p>
			<p class="text-sm xs:text-base md:text-lg italic opacity-80 tracking-wide">Sincerely, Your Neighbours</p>

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
<section aria-labelledby="family1-heading" class="py-16 sm:py-20 md:py-32 bg-white">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'fade', duration: 1 }}>
				<VideoSection source={family1Video} aspectRatio="3/4" objectPosition="top" overlayClass="bg-black/10">
					<div class="absolute inset-0 flex items-end p-4 sm:p-6">
						<span class="text-white text-sm font-medium bg-nbrs-green px-4 py-2 rounded-full">
							Coming 2026
						</span>
					</div>
				</VideoSection>
			</div>
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.2 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
					Our First Project
				</span>
				<h2 id="family1-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
					FAMILY 1
				</h2>
				<p class="text-base sm:text-lg text-gray-600 mb-4">
					Six family-sized rental units in a vibrant Toronto neighbourhood. Designed from the ground up
					for families who need space to grow.
				</p>
				<p class="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
					Three-bedroom homes with real storage, outdoor space, and room for life to happen.
				</p>
				<div class="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
					<a
						href="/family-1"
						class="btn btn-primary group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg font-medium min-h-[48px]"
					>
						<span>Learn More</span>
						<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
							<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
						</svg>
					</a>
					<a
						href="/waitlist"
						class="btn btn-secondary inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg font-medium text-nbrs-green border-nbrs-green min-h-[48px]"
					>
						Join the Waitlist
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- How We Build Section - Illustrated Timeline -->
<BuildTimeline />

<!-- Construction Progress Section -->
<ConstructionProgress />

<!-- About/Mission Section -->
<section aria-labelledby="about-heading" class="py-16 sm:py-20 md:py-32 bg-white">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
					Who We Are
				</span>
				<h2 id="about-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
					Neighbourhood<br />Scale Housing
				</h2>
				<p class="text-base sm:text-lg text-gray-600 mb-4">
					We believe great cities are made of great neighbourhoods. NBRS (pronounced "neighbours") builds
					quality rental housing that integrates seamlessly into the communities we serve.
				</p>
				<p class="text-base sm:text-lg text-gray-600 mb-4">
					Smaller, distributed projects. Thoughtful design. Buildings that look like they belong—because they do.
				</p>
				<p class="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
					We're here to prove that rental housing can be beautiful, functional, and good for the neighbourhood.
				</p>
				<a
					href="/mission"
					class="btn btn-secondary group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg font-medium text-nbrs-green border-nbrs-green min-h-[48px]"
				>
					<span>Our Mission</span>
					<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
						<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
					</svg>
				</a>
			</div>
			<div use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
				<VideoSection source={torontoVideo} aspectRatio="16/9" overlayClass="bg-black/10">
					<div class="absolute inset-0 flex items-end p-4 sm:p-6">
						<span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
							Toronto Living
						</span>
					</div>
				</VideoSection>
			</div>
		</div>
	</div>
</section>

<!-- Inside Your Future Home -->
<section aria-labelledby="interior-heading" class="py-16 sm:py-20 md:py-32 bg-gray-50">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
					Life at NBRS
				</span>
				<h2 id="interior-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
					Space to Live,<br />Room to Grow
				</h2>
				<p class="text-base sm:text-lg text-gray-600 mb-4">
					Our homes are designed for real life. Open living spaces that connect families, abundant natural light, and views that remind you why you love this city.
				</p>
				<p class="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
					Every unit features thoughtful layouts, quality finishes, and the kind of details that make a house feel like home.
				</p>
				<a
					href="/family-1"
					class="btn btn-secondary group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg font-medium text-nbrs-green border-nbrs-green min-h-[48px]"
				>
					<span>Explore FAMILY 1</span>
					<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
						<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
					</svg>
				</a>
			</div>
			<div use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
				<VideoSection source={interiorVideo} aspectRatio="16/9" overlayClass="bg-black/5">
					<div class="absolute inset-0 flex items-end p-4 sm:p-6">
						<span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
							FAMILY 1 Interior
						</span>
					</div>
				</VideoSection>
			</div>
		</div>
	</div>
</section>

<!-- Company Timeline -->
<CompanyTimeline />
