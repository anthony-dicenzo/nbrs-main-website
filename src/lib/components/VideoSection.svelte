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
		aspectRatio = '16/9',
		objectPosition = 'center',
		overlayClass = '',
		rootMargin = '200px',
		children
	}: {
		source: VideoSource;
		aspectRatio?: string;
		objectPosition?: string;
		overlayClass?: string;
		rootMargin?: string;
		children?: Snippet;
	} = $props();

	let containerRef: HTMLDivElement | null = null;
	let videoRef: HTMLVideoElement | null = null;
	let isVisible = $state(false);
	let videoLoaded = $state(false);
	let shouldLoad = $state(false);
	let autoplayBlocked = $state(false);
	let observer: IntersectionObserver | null = null;

	// Generate poster URL from video URL if not provided
	function getPosterUrl(src: VideoSource): string {
		if (src.poster) return src.poster;
		return src.mp4.replace(/\.mp4$/, '.jpg');
	}

	// Generate WebM URL if not provided
	function getWebmUrl(src: VideoSource): string | undefined {
		if (src.webm) return src.webm;
		return src.mp4.replace(/\.mp4$/, '.webm');
	}

	// Try to play video and detect autoplay blocks
	async function tryAutoplay() {
		if (!videoRef) return;

		try {
			await videoRef.play();
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

	onMount(() => {
		if (!containerRef || typeof IntersectionObserver === 'undefined') {
			shouldLoad = true;
			isVisible = true;
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						shouldLoad = true;
						requestAnimationFrame(() => {
							isVisible = true;
						});
						observer?.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin,
				threshold: 0
			}
		);

		observer.observe(containerRef);
	});

	onDestroy(() => {
		if (observer && containerRef) {
			observer.unobserve(containerRef);
			observer.disconnect();
		}
	});
</script>

<div
	bind:this={containerRef}
	class="relative w-full overflow-hidden transition-opacity duration-700 ease-out"
	class:opacity-0={!isVisible}
	class:opacity-100={isVisible}
	style="aspect-ratio: {aspectRatio};"
>
	<!-- Poster image (shows until video loads, stays visible if autoplay blocked) -->
	<img
		src={getPosterUrl(source)}
		alt=""
		class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
		class:opacity-0={videoLoaded && !autoplayBlocked}
		style="object-position: {objectPosition};"
		aria-hidden="true"
		loading="lazy"
		decoding="async"
		width="1920"
		height="1080"
	/>

	<!-- Video (only shown if autoplay is not blocked) -->
	{#if shouldLoad && !autoplayBlocked}
		<video
			bind:this={videoRef}
			class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
			class:opacity-0={!videoLoaded}
			class:invisible={!videoLoaded}
			style="object-position: {objectPosition};"
			autoplay
			muted
			loop
			playsinline
			oncanplay={handleCanPlay}
			onplaying={handlePlaying}
			poster={getPosterUrl(source)}
		>
			{#if getWebmUrl(source)}
				<source src={getWebmUrl(source)} type="video/webm" />
			{/if}
			<source src={source.mp4} type="video/mp4" />
		</video>
	{/if}

	<!-- Optional overlay -->
	{#if overlayClass}
		<div class="absolute inset-0 {overlayClass}" aria-hidden="true"></div>
	{/if}

	<!-- Content -->
	{#if children}
		<div class="relative z-10 h-full">
			{@render children()}
		</div>
	{/if}
</div>
