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
	let isVisible = $state(false);
	let videoLoaded = $state(false);
	let videoCanPlay = $state(false);
	let shouldLoad = $state(false);
	let observer: IntersectionObserver | null = null;

	// Always show video on all devices for consistent experience
	const showVideoOnDevice = true;

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

	// Preload video and check if it can play
	function preloadVideo(src: VideoSource): Promise<void> {
		return new Promise((resolve) => {
			const video = document.createElement('video');
			video.muted = true;
			video.playsInline = true;
			video.preload = 'auto';

			const webmUrl = getWebmUrl(src);
			if (webmUrl) {
				const webmSource = document.createElement('source');
				webmSource.src = webmUrl;
				webmSource.type = 'video/webm';
				video.appendChild(webmSource);
			}

			const mp4Source = document.createElement('source');
			mp4Source.src = src.mp4;
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

	onMount(() => {
		if (!containerRef || typeof IntersectionObserver === 'undefined') {
			// Fallback: load immediately if IntersectionObserver not available
			shouldLoad = true;
			isVisible = true;
			preloadVideo(source);
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						shouldLoad = true;
						// Preload video before showing (prevents flash of play button on mobile)
						preloadVideo(source).then(() => {
							requestAnimationFrame(() => {
								isVisible = true;
							});
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
	<!-- Poster image (shows until video loads, stays visible on mobile) -->
	<!-- Explicit dimensions prevent layout shift -->
	<img
		src={getPosterUrl(source)}
		alt=""
		class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
		class:opacity-0={videoLoaded && showVideoOnDevice}
		style="object-position: {objectPosition};"
		aria-hidden="true"
		loading="lazy"
		decoding="async"
		width="1920"
		height="1080"
	/>

	<!-- Video (only mounts after preload to prevent mobile play button flash) -->
	{#if shouldLoad && showVideoOnDevice && videoCanPlay}
		<video
			class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
			class:opacity-0={!videoLoaded}
			style="object-position: {objectPosition};"
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
