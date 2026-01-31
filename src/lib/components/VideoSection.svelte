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
		overlayClass = '',
		rootMargin = '200px',
		children
	}: {
		source: VideoSource;
		aspectRatio?: string;
		overlayClass?: string;
		rootMargin?: string;
		children?: Snippet;
	} = $props();

	let containerRef: HTMLDivElement | null = null;
	let isVisible = $state(false);
	let videoLoaded = $state(false);
	let shouldLoad = $state(false);
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

	// Handle video load event
	function handleVideoLoaded() {
		videoLoaded = true;
	}

	onMount(() => {
		if (!containerRef || typeof IntersectionObserver === 'undefined') {
			// Fallback: load immediately if IntersectionObserver not available
			shouldLoad = true;
			isVisible = true;
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						shouldLoad = true;
						// Small delay before showing to allow video to start loading
						requestAnimationFrame(() => {
							isVisible = true;
						});
						// Stop observing once visible (video stays loaded)
						observer?.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin, // Start loading before element is in view
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
	<!-- Poster image (shows until video loads) -->
	<img
		src={getPosterUrl(source)}
		alt=""
		class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
		class:opacity-0={videoLoaded}
		aria-hidden="true"
		loading="lazy"
	/>

	<!-- Video (loads when in/near viewport) -->
	{#if shouldLoad}
		<video
			class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
			class:opacity-0={!videoLoaded}
			autoplay
			muted
			loop
			playsinline
			onloadeddata={handleVideoLoaded}
			poster={getPosterUrl(source)}
		>
			<!-- WebM source (preferred for smaller file size) -->
			{#if getWebmUrl(source)}
				<source src={getWebmUrl(source)} type="video/webm" />
			{/if}
			<!-- MP4 fallback -->
			<source src={source.mp4} type="video/mp4" />
		</video>
	{/if}

	<!-- Optional overlay for darkening/gradient -->
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
