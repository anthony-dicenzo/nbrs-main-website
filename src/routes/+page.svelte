<script lang="ts">
	import VideoHero from '$lib/components/VideoHero.svelte';
	import VideoSection from '$lib/components/VideoSection.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

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
</script>

<VideoHero sources={heroVideos} overlayClass="bg-black/30">
	<div class="flex flex-col items-center justify-center h-full text-white text-center px-6">
		<h1 class="text-5xl md:text-7xl font-bold mb-6">Building Community</h1>
		<p class="text-xl md:text-2xl font-light mb-8 max-w-2xl">
			Quality homes for families who need them most
		</p>
		<p class="text-lg italic opacity-90">Sincerely, Your NBRS</p>
	</div>
</VideoHero>

<!-- About Section with Lazy-Loaded Video -->
<section class="py-16 md:py-24 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
					Neighbourhood Scale Housing
				</h2>
				<p class="text-lg text-gray-600 mb-4">
					We're building quality homes that fit into existing communities, creating housing
					that's affordable without looking affordable.
				</p>
				<p class="text-lg text-gray-600">
					Our approach focuses on smaller, distributed projects that integrate seamlessly
					with the character of established neighbourhoods.
				</p>
			</div>
			<div use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
				<VideoSection source={fountainVideo} overlayClass="bg-black/10">
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

<!-- Mission Section with Lazy-Loaded Video -->
<section class="py-16 md:py-24 bg-gray-50">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div use:scrollReveal={{ type: 'fade', duration: 1 }}>
				<VideoSection source={cityVideo} aspectRatio="4/3" overlayClass="bg-black/10">
					<div class="absolute inset-0 flex items-end p-6">
						<span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
							Urban Integration
						</span>
					</div>
				</VideoSection>
			</div>
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.2 }}>
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
					FAMILY 1 Project
				</h2>
				<p class="text-lg text-gray-600 mb-4">
					Our inaugural development brings 6 family-sized units to a vibrant
					Toronto neighbourhood.
				</p>
				<p class="text-lg text-gray-600 mb-6">
					Designed with families in mind, each unit offers the space and amenities
					that growing households need.
				</p>
				<a
					href="/family-1"
					class="inline-block bg-nbrs-green text-white px-6 py-3 rounded-lg font-medium hover:bg-nbrs-green/90 transition-colors"
				>
					Learn More
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Temporary navigation for testing -->
<div class="bg-nbrs-green p-8" use:scrollReveal={{ type: 'fade', duration: 0.6 }}>
	<nav class="space-x-4">
		<a href="/partner" class="text-white hover:text-nbrs-coral underline">Partner</a>
		<a href="/waitlist" class="text-white hover:text-nbrs-coral underline">Waitlist</a>
		<a href="/family-1" class="text-white hover:text-nbrs-coral underline">FAMILY 1</a>
	</nav>
</div>
