<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';

	interface VideoSource {
		mp4: string;
		webm?: string;
		poster?: string;
	}

	let {
		source,
		sources = [],
		rotationInterval = 9000,
		overlayClass = '',
		children
	}: {
		source?: VideoSource;
		sources?: VideoSource[];
		rotationInterval?: number;
		overlayClass?: string;
		children?: Snippet;
	} = $props();

	// Support both single source and array of sources
	const videoSources = $derived(source ? [source] : sources);

	let currentIndex = $state(0);
	let videoLoaded = $state(false);
	let posterLoaded = $state(false);
	let autoplayBlocked = $state(false);
	let videoRef: HTMLVideoElement | null = null;
	let rotationTimer: ReturnType<typeof setInterval> | null = null;

	// Get current source
	const currentSource = $derived(videoSources[currentIndex] || videoSources[0]);

	// Generate poster URL from video URL if not provided
	function getPosterUrl(source: VideoSource): string {
		if (source.poster) return source.poster;
		return source.mp4.replace(/\.mp4$/, '.jpg');
	}

	// Generate WebM URL if not provided
	function getWebmUrl(source: VideoSource): string | undefined {
		if (source.webm) return source.webm;
		return source.mp4.replace(/\.mp4$/, '.webm');
	}

	// Preload poster image
	function preloadPoster(url: string): Promise<void> {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve();
			img.onerror = () => resolve();
			img.src = url;
		});
	}

	// Try to play video and detect autoplay blocks
	async function tryAutoplay() {
		if (!videoRef) return;

		try {
			await videoRef.play();
			// Autoplay worked
			autoplayBlocked = false;
		} catch (error) {
			// Autoplay was blocked (Low Power Mode, Data Saver, etc.)
			autoplayBlocked = true;
			videoLoaded = false;
		}
	}

	// Handle video canplay event
	function handleCanPlay() {
		tryAutoplay();
	}

	// Handle video playing event (confirms video is actually playing)
	function handlePlaying() {
		if (!autoplayBlocked) {
			videoLoaded = true;
		}
	}

	// Rotate to next video
	function rotateVideo() {
		if (videoSources.length <= 1 || autoplayBlocked) return;
		currentIndex = (currentIndex + 1) % videoSources.length;
		videoLoaded = false;
	}

	onMount(async () => {
		if (!videoSources.length) return;

		// Preload first poster
		const posterUrl = getPosterUrl(currentSource);
		await preloadPoster(posterUrl);
		posterLoaded = true;

		// Start rotation if multiple videos (and autoplay works)
		if (videoSources.length > 1) {
			rotationTimer = setInterval(rotateVideo, rotationInterval);
		}
	});

	onDestroy(() => {
		if (rotationTimer) {
			clearInterval(rotationTimer);
		}
	});
</script>

<div class="relative w-full h-svh min-h-[600px] overflow-hidden">
	<!-- Poster image (shows immediately, stays visible if autoplay blocked) -->
	{#if currentSource}
		<img
			src={getPosterUrl(currentSource)}
			alt=""
			class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
			class:opacity-0={videoLoaded && !autoplayBlocked}
			aria-hidden="true"
			fetchpriority="high"
			decoding="async"
			width="1920"
			height="1080"
		/>
	{/if}

	<!-- Video (only shown if autoplay is not blocked) -->
	{#if currentSource && posterLoaded && !autoplayBlocked}
		{#key currentIndex}
			<video
				bind:this={videoRef}
				class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
				class:opacity-0={!videoLoaded}
				class:invisible={!videoLoaded}
				muted
				loop
				playsinline
				oncanplay={handleCanPlay}
				onplaying={handlePlaying}
				poster={getPosterUrl(currentSource)}
			>
				{#if getWebmUrl(currentSource)}
					<source src={getWebmUrl(currentSource)} type="video/webm" />
				{/if}
				<source src={currentSource.mp4} type="video/mp4" />
			</video>
		{/key}
	{/if}

	<!-- Optional overlay -->
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
