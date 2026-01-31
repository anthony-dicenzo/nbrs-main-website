<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';
	import { initMobileDetection, isMobile } from '$lib/utils/mobile.svelte';

	interface VideoSource {
		mp4: string;
		webm?: string;
		poster?: string;
	}

	let {
		sources = [],
		rotationInterval = 9000,
		overlayClass = '',
		children
	}: {
		sources: VideoSource[];
		rotationInterval?: number;
		overlayClass?: string;
		children?: Snippet;
	} = $props();

	let currentIndex = $state(0);
	let videoLoaded = $state(false);
	let posterLoaded = $state(false);
	let rotationTimer: ReturnType<typeof setInterval> | null = null;

	// Mobile detection - show poster only on mobile devices
	const showVideoOnDevice = $derived(!isMobile());

	// Get current source
	const currentSource = $derived(sources[currentIndex] || sources[0]);

	// Generate poster URL from video URL if not provided
	// Cloudinary supports jpg format for video thumbnails
	function getPosterUrl(source: VideoSource): string {
		if (source.poster) return source.poster;
		// Convert mp4 URL to jpg for poster
		return source.mp4.replace(/\.mp4$/, '.jpg');
	}

	// Generate WebM URL if not provided
	function getWebmUrl(source: VideoSource): string | undefined {
		if (source.webm) return source.webm;
		// Convert mp4 URL to webm
		return source.mp4.replace(/\.mp4$/, '.webm');
	}

	// Preload poster image
	function preloadPoster(url: string): Promise<void> {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve();
			img.onerror = () => resolve(); // Continue even if poster fails
			img.src = url;
		});
	}

	// Handle video load event
	function handleVideoLoaded() {
		videoLoaded = true;
	}

	// Rotate to next video
	function rotateVideo() {
		if (sources.length <= 1) return;
		currentIndex = (currentIndex + 1) % sources.length;
		videoLoaded = false;
	}

	onMount(async () => {
		// Initialize mobile detection
		initMobileDetection();

		if (!sources.length) return;

		// Preload first poster
		const posterUrl = getPosterUrl(currentSource);
		await preloadPoster(posterUrl);
		posterLoaded = true;

		// Start rotation if multiple videos (only on desktop where videos play)
		if (sources.length > 1 && showVideoOnDevice) {
			rotationTimer = setInterval(rotateVideo, rotationInterval);
		}
	});

	onDestroy(() => {
		if (rotationTimer) {
			clearInterval(rotationTimer);
		}
	});
</script>

<div class="relative w-full h-screen overflow-hidden">
	<!-- Poster image (shows immediately, stays visible on mobile) -->
	{#if currentSource}
		<img
			src={getPosterUrl(currentSource)}
			alt=""
			class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
			class:opacity-0={videoLoaded && showVideoOnDevice}
			aria-hidden="true"
		/>
	{/if}

	<!-- Video (autoplays when ready - desktop only) -->
	{#if currentSource && posterLoaded && showVideoOnDevice}
		{#key currentIndex}
			<video
				class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
				class:opacity-0={!videoLoaded}
				autoplay
				muted
				loop
				playsinline
				onloadeddata={handleVideoLoaded}
				poster={getPosterUrl(currentSource)}
			>
				<!-- WebM source (preferred for smaller file size) -->
				{#if getWebmUrl(currentSource)}
					<source src={getWebmUrl(currentSource)} type="video/webm" />
				{/if}
				<!-- MP4 fallback -->
				<source src={currentSource.mp4} type="video/mp4" />
			</video>
		{/key}
	{/if}

	<!-- Optional overlay for darkening/gradient -->
	{#if overlayClass}
		<div class="absolute inset-0 {overlayClass}" aria-hidden="true"></div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 h-full">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
