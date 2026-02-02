<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let ctx: gsap.Context | null = null;

	// Timeline milestones - richer story with specific dates
	const milestones = [
		{
			year: '2023',
			title: 'The Vision',
			description: 'NBRS was born from a simple idea: what if we could build the kind of homes Toronto actually needs? Not towers. Not single-family houses. Something in between.',
			image: '/videos/new/park-tulips-skyline.jpg'
		},
		{
			year: '2024',
			title: 'The Opportunity',
			description: 'As-of-right permissions finally permit neighbourhood-scale buildings in Toronto. We saw our chance to build without the years-long rezoning battles.',
			image: '/videos/new/toronto-skyline-sunset.jpg'
		},
		{
			year: '2025',
			title: 'First Site Secured',
			description: 'We acquired our first property in an established Toronto neighbourhood—a site perfect for family-sized rental homes.',
			image: '/videos/new/construction-site-tree.jpg'
		},
		{
			year: '2025',
			title: 'Approvals Secured',
			description: 'Permits in hand. Our tech-enabled approach cut through the typical approval timeline. FAMILY 1 moves from vision to reality.',
			image: '/videos/new/construction-crane-progress.jpg'
		},
		{
			year: 'Fall 2026',
			title: 'Construction Begins',
			description: 'Shovels in the ground. Six family-sized rental units taking shape in a neighbourhood that needs them.',
			image: '/videos/new/construction-site-barriers.jpg'
		},
		{
			year: 'Fall 2027',
			title: 'Families Move In',
			description: 'The first NBRS residents call FAMILY 1 home. Real families, real community, real neighbourhood scale.',
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
				stagger: 0.1,
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
	class="py-16 sm:py-20 md:py-32 bg-gray-50"
	bind:this={container}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<!-- Compact Header -->
		<div class="text-center mb-10 sm:mb-12 md:mb-16">
			<h2 id="story-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
				Our Journey
			</h2>
			<p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
				From idea to keys in hand—building the rental housing Toronto families deserve.
			</p>
		</div>

		<!-- Visual Timeline Grid - 6 milestones, 2 rows of 3 on desktop -->
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
			{#each milestones as milestone}
				<div class="milestone-card group">
					<!-- Image with year overlay -->
					<div class="relative aspect-[4/3] overflow-hidden rounded-lg mb-3 sm:mb-4">
						<img
							src={milestone.image}
							alt={milestone.title}
							class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
						<!-- Gradient overlay for text readability -->
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
						<!-- Year badge -->
						<div class="absolute bottom-3 left-3">
							<span class="text-white text-xs sm:text-sm font-bold bg-nbrs-green px-2 sm:px-3 py-1 rounded">
								{milestone.year}
							</span>
						</div>
					</div>
					<!-- Text content -->
					<h3 class="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{milestone.title}</h3>
					<p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
				</div>
			{/each}
		</div>

		<!-- Partner CTA -->
		<div class="text-center mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 border-t border-gray-200">
			<p class="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
				We're building the future of rental housing in Toronto—and we're looking for partners who share our vision.
			</p>
			<a
				href="/partner"
				class="btn btn-primary group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg min-h-[48px]"
			>
				<span>Partner With Us</span>
				<svg class="w-4 h-4 sm:w-5 sm:h-5 icon-arrow" fill="currentColor" viewBox="0 0 12 10" aria-hidden="true">
					<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
				</svg>
			</a>
			<p class="text-sm text-gray-500 mt-4">
				Investors • Landowners • Brokers • Non-profits
			</p>
		</div>
	</div>
</section>
