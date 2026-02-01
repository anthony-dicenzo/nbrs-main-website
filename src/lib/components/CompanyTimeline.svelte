<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let ctx: gsap.Context | null = null;

	const milestones = [
		{
			year: '2023',
			title: 'The Beginning',
			description: 'Founded with a mission to bring quality rental housing to Toronto neighbourhoods.'
		},
		{
			year: '2024',
			title: 'First Site Acquired',
			description: 'Secured our first property in a vibrant Toronto community.'
		},
		{
			year: '2025',
			title: 'FAMILY 1 Begins',
			description: 'Broke ground on our flagship project—six family-sized rental units.'
		},
		{
			year: '2026',
			title: 'Doors Open',
			description: 'First families move into FAMILY 1. The neighbourhood grows stronger.'
		}
	];

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			// Animate timeline line
			const line = container.querySelector('.timeline-line');
			if (line) {
				gsap.from(line, {
					scaleY: 0,
					duration: 1.5,
					ease: 'power2.out',
					transformOrigin: 'top center',
					scrollTrigger: {
						trigger: container,
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				});
			}

			// Animate milestones
			const items = container.querySelectorAll('.milestone-item');
			gsap.from(items, {
				opacity: 0,
				x: -30,
				duration: 0.6,
				stagger: 0.2,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 75%',
					toggleActions: 'play none none none'
				}
			});

			// Animate dots
			const dots = container.querySelectorAll('.milestone-dot');
			gsap.from(dots, {
				scale: 0,
				duration: 0.4,
				stagger: 0.2,
				delay: 0.3,
				ease: 'back.out(2)',
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
	aria-labelledby="company-timeline-heading"
	class="py-16 sm:py-20 md:py-32 bg-gray-50"
	bind:this={container}
>
	<div class="max-w-4xl mx-auto px-4 sm:px-6">
		<!-- Section Header -->
		<div class="text-center mb-12 sm:mb-16">
			<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
				Our Story
			</span>
			<h2 id="company-timeline-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
				A Growing Journey
			</h2>
		</div>

		<!-- Timeline -->
		<div class="relative">
			<!-- Vertical line -->
			<div
				class="timeline-line absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-nbrs-green/30 sm:-translate-x-1/2"
				aria-hidden="true"
			></div>

			<!-- Milestones -->
			<div class="space-y-8 sm:space-y-12">
				{#each milestones as milestone, i}
					<div class="milestone-item relative pl-12 sm:pl-0 {i % 2 === 0 ? 'sm:pr-[50%] sm:text-right' : 'sm:pl-[50%]'}">
						<!-- Dot -->
						<div
							class="milestone-dot absolute left-2 sm:left-1/2 top-1 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-nbrs-green border-4 border-white shadow-sm"
							aria-hidden="true"
						></div>

						<!-- Content -->
						<div class="{i % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}">
							<span class="text-nbrs-green font-bold text-lg sm:text-xl">{milestone.year}</span>
							<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mt-1 mb-2">{milestone.title}</h3>
							<p class="text-sm sm:text-base text-gray-600">{milestone.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
