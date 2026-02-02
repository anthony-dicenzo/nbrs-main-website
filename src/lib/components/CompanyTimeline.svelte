<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let scrollContainer: HTMLElement;
	let ctx: gsap.Context | null = null;

	// Timeline milestones with rich imagery
	const milestones = [
		{
			year: 'May 2023',
			title: 'The Opportunity',
			description: 'As-of-right fourplexes permitted in the City of Toronto without rezoning.',
			image: '/videos/new/toronto-skyline-sunset.jpg'
		},
		{
			year: 'March 2025',
			title: 'Design & City Approvals',
			description: 'After a year of design development and working with experts to make family-sized rentals work in Toronto.',
			image: '/videos/new/house-original.jpg'
		},
		{
			year: 'March 2025',
			title: 'First Site Secured',
			description: 'We acquire our first site in an established Toronto neighbourhood.',
			image: '/videos/new/site-house.jpg'
		},
		{
			year: 'September 2025',
			title: 'Break Ground',
			description: 'Committee of Adjustment approval and permits secured within four months. Construction begins.',
			image: '/videos/new/demolition.jpg',
			video: '/videos/new/demolition.mp4'
		},
		{
			year: 'September 2025',
			title: 'Construction',
			description: 'Five family-sized units taking shape in the neighbourhood.',
			image: '/videos/new/construction-crane-progress.jpg'
		},
		{
			year: 'Spring 2026',
			title: 'Residents Move In',
			description: 'First NBRS families call FAMILY 1 home.',
			image: '/videos/new/building-render-dusk.jpg'
		}
	];

	let isDragging = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);

	function handleMouseDown(e: MouseEvent) {
		isDragging = true;
		startX = e.pageX - scrollContainer.offsetLeft;
		scrollLeft = scrollContainer.scrollLeft;
		scrollContainer.style.cursor = 'grabbing';
	}

	function handleMouseUp() {
		isDragging = false;
		scrollContainer.style.cursor = 'grab';
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - scrollContainer.offsetLeft;
		const walk = (x - startX) * 1.5;
		scrollContainer.scrollLeft = scrollLeft - walk;
	}

	function handleMouseLeave() {
		isDragging = false;
		scrollContainer.style.cursor = 'grab';
	}

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			// Animate cards on scroll into view
			const cards = container.querySelectorAll('.timeline-card');
			gsap.from(cards, {
				opacity: 0,
				y: 30,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
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
	aria-labelledby="timeline-heading"
	class="py-16 sm:py-20 md:py-28 bg-gray-50 overflow-hidden"
	bind:this={container}
>
	<!-- Section Header -->
	<div class="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
		<h2 id="timeline-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
			Our Journey
		</h2>
	</div>

	<!-- Horizontal Scrolling Timeline -->
	<div
		bind:this={scrollContainer}
		class="overflow-x-auto scrollbar-hide cursor-grab select-none"
		style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
		role="region"
		aria-label="Timeline slider"
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
	>
		<div class="flex gap-4 sm:gap-6 pb-4" style="width: max-content; padding-left: max(1rem, calc((100vw - 72rem) / 2 + 1.5rem));">
			<!-- First card aligns with "Our Journey" title on desktop -->
			{#each milestones as milestone, i}
				<div
					class="timeline-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] lg:w-[450px] group"
				>
					<!-- Large Image or Video -->
					<div class="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
						{#if milestone.video}
							<video
								autoplay
								muted
								loop
								playsinline
								poster={milestone.image}
								class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							>
								<source src={milestone.video} type="video/mp4" />
							</video>
						{:else}
							<img
								src={milestone.image}
								alt={milestone.title}
								class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								loading={i < 3 ? 'eager' : 'lazy'}
								draggable="false"
							/>
						{/if}
						<!-- Gradient overlay -->
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
						<!-- Year badge -->
						<div class="absolute bottom-4 left-4">
							<span class="text-white text-sm sm:text-base font-bold bg-nbrs-green px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
								{milestone.year}
							</span>
						</div>
					</div>
					<!-- Text content -->
					<h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
					<p class="text-sm sm:text-base text-gray-600 leading-relaxed">{milestone.description}</p>
				</div>
			{/each}
			<!-- Spacer for scroll end -->
			<div class="flex-shrink-0 w-4 sm:w-6"></div>
		</div>
	</div>

	<!-- Scroll hint -->
	<div class="max-w-6xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
		<p class="text-sm text-gray-400 flex items-center gap-2">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
			<span>Drag to explore</span>
		</p>
	</div>
</section>

<style>
	/* Hide scrollbar but keep functionality */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
