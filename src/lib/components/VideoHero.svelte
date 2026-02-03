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
	let videoCanPlay = $state(false);
	let posterLoaded = $state(false);
	let rotationTimer: ReturnType<typeof setInterval> | null = null;

	// Always show video on all devices for consistent experience
	const showVideoOnDevice = true;

	// Get current source
	const currentSource = $derived(videoSources[currentIndex] || videoSources[0]);

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

	// Preload video and check if it can play
	function preloadVideo(source: VideoSource): Promise<void> {
		return new Promise((resolve) => {
			const video = document.createElement('video');
			video.muted = true;
			video.playsInline = true;
			video.preload = 'auto';

			const webmUrl = getWebmUrl(source);
			if (webmUrl) {
				const webmSource = document.createElement('source');
				webmSource.src = webmUrl;
				webmSource.type = 'video/webm';
				video.appendChild(webmSource);
			}

			const mp4Source = document.createElement('source');
			mp4Source.src = source.mp4;
			mp4Source.type = 'video/mp4';
			video.appendChild(mp4Source);

			video.oncanplay = () => {
				videoCanPlay = true;
				resolve();
			};
			video.onerror = () => resolve(); // Continue even if video fails

			// Timeout fallback in case canplay never fires
			setTimeout(() => {
				if (!videoCanPlay) {
					videoCanPlay = true;
					resolve();
				}
			}, 5000);

			video.load();
		});
	}

	// Handle video load event
	function handleVideoLoaded() {
		videoLoaded = true;
	}

	// Rotate to next video
	function rotateVideo() {
		if (videoSources.length <= 1) return;
		currentIndex = (currentIndex + 1) % videoSources.length;
		videoLoaded = false;
		videoCanPlay = false;
		// Preload the next video
		preloadVideo(videoSources[currentIndex]);
	}

	onMount(async () => {
		if (!videoSources.length) return;

		// Preload first poster
		const posterUrl = getPosterUrl(currentSource);
		await preloadPoster(posterUrl);
		posterLoaded = true;

		// Preload video before showing it (prevents flash of play button on mobile)
		await preloadVideo(currentSource);

		// Start rotation if multiple videos
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
	<!-- Poster image (shows immediately, stays visible on mobile) -->
	<!-- fetchpriority="high" ensures LCP image loads first -->
	{#if currentSource}
		<img
			src={getPosterUrl(currentSource)}
			alt=""
			class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
			class:opacity-0={videoLoaded && showVideoOnDevice}
			aria-hidden="true"
			fetchpriority="high"
			decoding="async"
			width="1920"
			height="1080"
		/>
	{/if}

	<!-- Video (only mounts after preload to prevent mobile play button flash) -->
	{#if currentSource && posterLoaded && showVideoOnDevice && videoCanPlay}
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
