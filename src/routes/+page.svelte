<script lang="ts">
	import VideoHero from '$lib/components/VideoHero.svelte';

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

<!-- Temporary navigation for testing -->
<div class="bg-nbrs-green p-8">
	<nav class="space-x-4">
		<a href="/partner" class="text-white hover:text-nbrs-coral underline">Partner</a>
		<a href="/waitlist" class="text-white hover:text-nbrs-coral underline">Waitlist</a>
		<a href="/family-1" class="text-white hover:text-nbrs-coral underline">FAMILY 1</a>
	</nav>
</div>
