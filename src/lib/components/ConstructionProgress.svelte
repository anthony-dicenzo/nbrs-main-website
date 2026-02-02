<script lang="ts">
	import VideoSection from './VideoSection.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

	const videos = [
		{
			mp4: '/videos/new/construction-site-tree.mp4',
			poster: '/videos/new/construction-site-tree.jpg',
			label: 'Excavation'
		},
		{
			mp4: '/videos/new/construction-site-barriers.mp4',
			poster: '/videos/new/construction-site-barriers.jpg',
			label: 'Site Progress'
		},
		{
			mp4: '/videos/new/construction-crane-progress.mp4',
			poster: '/videos/new/construction-crane-progress.jpg',
			label: 'Pouring Concrete'
		}
	];
</script>

<section aria-labelledby="construction-heading" class="py-16 sm:py-20 md:py-24 bg-gray-900 text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<!-- Header -->
		<div class="text-center mb-10 sm:mb-12 md:mb-16" use:scrollReveal={{ type: 'fade', duration: 0.8 }}>
			<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
				Building in Progress
			</span>
			<h2 id="construction-heading" class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
				Watch Us Build
			</h2>
			<p class="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
				Real footage from our construction sites. Quality homes taking shape in Toronto neighbourhoods.
			</p>
		</div>

		<!-- Video Grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
			{#each videos as video, i}
				<div use:scrollReveal={{ type: 'fade', duration: 0.8, delay: i * 0.15 }}>
					<VideoSection
						source={{ mp4: video.mp4, poster: video.poster }}
						aspectRatio="9/16"
						overlayClass="bg-gradient-to-t from-black/60 via-transparent to-transparent"
					>
						<div class="absolute inset-0 flex items-end p-4 sm:p-6">
							<span class="text-white text-sm font-medium bg-nbrs-green/90 px-4 py-2 rounded-full">
								{video.label}
							</span>
						</div>
					</VideoSection>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="text-center mt-10 sm:mt-12 md:mt-16" use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.3 }}>
			<a
				href="/family-1"
				class="btn btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white border-white/30 hover:bg-white/10 min-h-[48px]"
			>
				<span>See FAMILY 1 Project</span>
				<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
					<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
				</svg>
			</a>
		</div>
	</div>
</section>
