<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let ctx: gsap.Context | null = null;

	// Timeline milestones with associated imagery (poster images for performance)
	const milestones = [
		{
			year: '2023',
			title: 'Vision',
			description: 'Founded to build quality rental housing at the neighbourhood scale.',
			image: '/videos/new/park-tulips-skyline.jpg'
		},
		{
			year: '2024',
			title: 'Land',
			description: 'Secured our first site in a vibrant Toronto community.',
			image: '/videos/new/toronto-skyline-sunset.jpg'
		},
		{
			year: '2025',
			title: 'Build',
			description: 'Broke ground on FAMILY 1—six family-sized rental homes.',
			image: '/videos/new/construction-crane-progress.jpg'
		},
		{
			year: '2026',
			title: 'Home',
			description: 'First families move in. The neighbourhood grows stronger.',
			image: '/videos/new/interior-living-room.jpg'
		}
	];

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			// Animate milestone cards
			const cards = container.querySelectorAll('.milestone-card');
			gsap.from(cards, {
				opacity: 0,
				y: 40,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 75%',
					toggleActions: 'play none none none'
				}
			});
		}, container);
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

<section
	aria-labelledby="story-heading"
	class="py-16 sm:py-20 md:py-32 bg-white"
	bind:this={container}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<!-- Compact Header -->
		<div class="text-center mb-10 sm:mb-12 md:mb-16">
			<h2 id="story-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
				Our Journey
			</h2>
			<p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
				From vision to home—building quality rental housing for Toronto families.
			</p>
		</div>

		<!-- Visual Timeline Grid - Image-first approach -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
			{#each milestones as milestone}
				<div class="milestone-card group">
					<!-- Large image -->
					<div class="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
						<img
							src={milestone.image}
							alt={milestone.title}
							class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
						<!-- Year overlay -->
						<div class="absolute top-3 left-3">
							<span class="text-white text-xs sm:text-sm font-bold bg-nbrs-green px-2 py-1 rounded">
								{milestone.year}
							</span>
						</div>
					</div>
					<!-- Compact text -->
					<h3 class="text-base sm:text-lg font-bold text-gray-900 mb-1">{milestone.title}</h3>
					<p class="text-xs sm:text-sm text-gray-600 leading-snug">{milestone.description}</p>
				</div>
			{/each}
		</div>

		<!-- Single CTA -->
		<div class="text-center mt-10 sm:mt-12 md:mt-16">
			<a
				href="/family-1"
				class="btn btn-primary group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium min-h-[48px]"
			>
				<span>Explore FAMILY 1</span>
				<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
					<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
				</svg>
			</a>
		</div>
	</div>
</section>
