<script lang="ts">
	import VideoHero from '$lib/components/VideoHero.svelte';
	import VideoSection from '$lib/components/VideoSection.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

	// LCP optimization: Preload the first hero poster for faster initial render
	const heroPosterUrl =
		'https://res.cloudinary.com/dvdzjssdi/video/upload/v1760581661/night_reubgh.jpg';

	// Cloudinary video sources from nbrs.ca
	const heroVideos = [
		{
			mp4: 'https://res.cloudinary.com/dvdzjssdi/video/upload/v1760581661/night_reubgh.mp4'
		},
		{
			mp4: 'https://res.cloudinary.com/dvdzjssdi/video/upload/v1760581661/fountain_duwuhb.mp4'
		},
		{
			mp4: 'https://res.cloudinary.com/dvdzjssdi/video/upload/v1760581662/city_tel9gg.mp4'
		}
	];

	// Individual video sources for sections
	const fountainVideo = {
		mp4: 'https://res.cloudinary.com/dvdzjssdi/video/upload/v1760581661/fountain_duwuhb.mp4'
	};

	const cityVideo = {
		mp4: 'https://res.cloudinary.com/dvdzjssdi/video/upload/v1760581662/city_tel9gg.mp4'
	};

	// How We Build process steps
	const buildSteps = [
		{
			number: '01',
			title: 'Find the Right Sites',
			description: 'We identify underutilized parcels in established neighbourhoods where gentle density makes sense.'
		},
		{
			number: '02',
			title: 'Design for Families',
			description: 'Every unit is sized and planned for real family living—bedrooms, storage, outdoor space.'
		},
		{
			number: '03',
			title: 'Build to Last',
			description: 'Quality construction that ages well, creating homes people want to stay in for the long term.'
		}
	];
</script>

<svelte:head>
	<title>NBRS - Neighbourhood Based Rental Solutions</title>
	<meta
		name="description"
		content="Quality rental housing at the neighbourhood scale. NBRS builds family-sized homes in established Toronto communities."
	/>
	<!-- Preload LCP image for faster hero render -->
	<link rel="preload" as="image" href={heroPosterUrl} fetchpriority="high" />
</svelte:head>

<!-- Hero Section -->
<section aria-label="Welcome">
	<VideoHero sources={heroVideos} overlayClass="bg-gradient-to-b from-black/40 via-black/20 to-black/50">
		<div class="flex flex-col items-center justify-center h-full text-white text-center px-6">
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
				Building Homes,<br />Building Community
			</h1>
			<p class="text-lg sm:text-xl md:text-2xl font-light mb-6 md:mb-8 max-w-2xl opacity-90">
				Quality rental housing at the neighbourhood scale
			</p>
			<p class="text-base md:text-lg italic opacity-80 tracking-wide">Sincerely, Your NBRS</p>

			<!-- Scroll indicator -->
			<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
				<svg class="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>
		</div>
	</VideoHero>
</section>

<!-- FAMILY 1 Project Preview -->
<section aria-labelledby="family1-heading" class="py-20 md:py-32 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'fade', duration: 1 }}>
				<VideoSection source={cityVideo} aspectRatio="4/3" overlayClass="bg-black/10">
					<div class="absolute inset-0 flex items-end p-6">
						<span class="text-white text-sm font-medium bg-nbrs-green px-4 py-2 rounded-full">
							Coming 2026
						</span>
					</div>
				</VideoSection>
			</div>
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.2 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-4 block">
					Our First Project
				</span>
				<h2 id="family1-heading" class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
					FAMILY 1
				</h2>
				<p class="text-lg text-gray-600 mb-4">
					Six family-sized rental units in a vibrant Toronto neighbourhood. Designed from the ground up
					for families who need space to grow.
				</p>
				<p class="text-lg text-gray-600 mb-8">
					Three-bedroom homes with real storage, outdoor space, and room for life to happen.
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/family-1"
						class="btn btn-primary group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
					>
						<span>Learn More</span>
						<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
							<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
						</svg>
					</a>
					<a
						href="/waitlist"
						class="btn btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-nbrs-green border-nbrs-green"
					>
						Join the Waitlist
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- How We Build Section -->
<section aria-labelledby="how-we-build-heading" class="py-20 md:py-32 bg-gray-50">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center mb-16" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-4 block">
				Our Approach
			</span>
			<h2 id="how-we-build-heading" class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
				How We Build
			</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				We create quality rental homes that fit into existing communities—affordable without looking affordable.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 md:gap-12">
			{#each buildSteps as step, i}
				<div
					class="relative"
					use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: i * 0.15 }}
				>
					<span class="text-6xl md:text-7xl font-bold text-nbrs-green/10 absolute -top-4 -left-2" aria-hidden="true">
						{step.number}
					</span>
					<div class="relative pt-8 pl-4">
						<h3 class="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
						<p class="text-gray-600 leading-relaxed">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- About/Mission Section -->
<section aria-labelledby="about-heading" class="py-20 md:py-32 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-4 block">
					Who We Are
				</span>
				<h2 id="about-heading" class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
					Neighbourhood<br />Scale Housing
				</h2>
				<p class="text-lg text-gray-600 mb-4">
					We believe great cities are made of great neighbourhoods. NBRS builds quality rental housing
					that integrates seamlessly into the communities we serve.
				</p>
				<p class="text-lg text-gray-600 mb-4">
					Smaller, distributed projects. Thoughtful design. Buildings that look like they belong—because they do.
				</p>
				<p class="text-lg text-gray-600 mb-8">
					Our name says it all: <strong class="text-gray-900">N</strong>eighbourhood
					<strong class="text-gray-900">B</strong>ased
					<strong class="text-gray-900">R</strong>ental
					<strong class="text-gray-900">S</strong>olutions.
				</p>
				<a
					href="/mission"
					class="btn btn-secondary group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-nbrs-green border-nbrs-green"
				>
					<span>Our Mission</span>
					<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
						<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
					</svg>
				</a>
			</div>
			<div use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
				<VideoSection source={fountainVideo} aspectRatio="4/5" overlayClass="bg-black/5">
					<div class="absolute inset-0 flex items-end p-6">
						<span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
							Community Spaces
						</span>
					</div>
				</VideoSection>
			</div>
		</div>
	</div>
</section>

<!-- Partner CTA Section -->
<section aria-labelledby="partner-cta-heading" class="py-20 md:py-32 bg-nbrs-green text-white">
	<div class="max-w-4xl mx-auto px-6 text-center" use:scrollReveal={{ type: 'fade', duration: 0.8 }}>
		<h2 id="partner-cta-heading" class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
			Build With Us
		</h2>
		<p class="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
			We're looking for partners who share our vision—investors, nonprofits, landowners,
			and municipalities ready to create housing that works.
		</p>
		<a
			href="/partner"
			class="btn btn-white group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-nbrs-green"
		>
			<span>Partner With NBRS</span>
			<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
				<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
			</svg>
		</a>
	</div>
</section>
