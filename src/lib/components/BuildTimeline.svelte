<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let ctx: gsap.Context | null = null;

	// Step data
	const steps = [
		{
			number: '1',
			title: 'Find Land',
			description: 'We identify underutilized parcels in established neighbourhoods where gentle density makes sense.'
		},
		{
			number: '2',
			title: 'Build Together',
			description: 'Quality construction with thoughtful design—homes that fit in and stand out.'
		},
		{
			number: '3',
			title: 'Welcome Home',
			description: 'Families move into spaces designed for real life—room to grow, room to thrive.'
		}
	];

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			// Animate the SVG paths (line drawing effect)
			const paths = container.querySelectorAll('.draw-path');
			paths.forEach((path) => {
				const svgPath = path as SVGPathElement;
				const length = svgPath.getTotalLength();

				// Set up initial state
				gsap.set(svgPath, {
					strokeDasharray: length,
					strokeDashoffset: length
				});

				// Animate on scroll
				gsap.to(svgPath, {
					strokeDashoffset: 0,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: svgPath.closest('.step-card'),
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				});
			});

			// Animate fill elements with delay
			const fills = container.querySelectorAll('.draw-fill');
			fills.forEach((fill) => {
				gsap.from(fill, {
					opacity: 0,
					duration: 0.8,
					delay: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: fill.closest('.step-card'),
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				});
			});

			// Animate step cards staggered
			const cards = container.querySelectorAll('.step-card');
			gsap.from(cards, {
				opacity: 0,
				y: 40,
				duration: 0.8,
				stagger: 0.2,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
					toggleActions: 'play none none none'
				}
			});

			// Animate connecting lines
			const connectors = container.querySelectorAll('.connector-line');
			connectors.forEach((line, i) => {
				gsap.from(line, {
					scaleX: 0,
					duration: 0.6,
					delay: 0.3 + i * 0.2,
					ease: 'power2.out',
					transformOrigin: 'left center',
					scrollTrigger: {
						trigger: container,
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				});
			});
		}, container);
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

<section
	aria-labelledby="build-timeline-heading"
	class="py-16 sm:py-20 md:py-32 bg-amber-50"
	bind:this={container}
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<!-- Section Header -->
		<div class="text-center mb-12 sm:mb-16 md:mb-20">
			<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
				Our Approach
			</span>
			<h2 id="build-timeline-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
				How We Build
			</h2>
			<p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
				A simple process that creates quality homes in the neighbourhoods that need them.
			</p>
		</div>

		<!-- Timeline Steps -->
		<div class="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-12 relative">
			<!-- Connecting lines (desktop only) -->
			<div class="hidden md:block absolute top-32 left-1/3 right-1/3 h-0.5" aria-hidden="true">
				<div class="connector-line h-full bg-nbrs-green/30 w-full absolute left-0"></div>
			</div>

			{#each steps as step, i}
				<div class="step-card relative">
					<!-- Illustration Container -->
					<div class="relative w-full aspect-square max-w-[280px] mx-auto mb-6 sm:mb-8">
						<!-- Background circle -->
						<div class="absolute inset-4 rounded-full bg-white shadow-sm" aria-hidden="true"></div>

						<!-- SVG Illustration -->
						<svg
							viewBox="0 0 200 200"
							class="w-full h-full relative z-10"
							aria-hidden="true"
						>
							{#if step.number === '1'}
								<!-- Step 1: Find Land - Empty lot with dashed property lines -->
								<!-- Ground line -->
								<path
									class="draw-path"
									d="M 30 150 L 170 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Property lines (dashed) -->
								<path
									class="draw-path"
									d="M 50 150 L 50 80 L 150 80 L 150 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-dasharray="8 4"
									stroke-linecap="round"
								/>
								<!-- Corner markers -->
								<circle class="draw-fill" cx="50" cy="150" r="4" fill="#4fa64f"/>
								<circle class="draw-fill" cx="150" cy="150" r="4" fill="#4fa64f"/>
								<circle class="draw-fill" cx="50" cy="80" r="4" fill="#4fa64f"/>
								<circle class="draw-fill" cx="150" cy="80" r="4" fill="#4fa64f"/>
								<!-- Measurement lines -->
								<path
									class="draw-path"
									d="M 40 90 L 40 140"
									stroke="#4fa64f"
									stroke-width="1"
									fill="none"
									stroke-linecap="round"
								/>
								<path
									class="draw-path"
									d="M 36 90 L 44 90 M 36 140 L 44 140"
									stroke="#4fa64f"
									stroke-width="1"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Tree suggestion -->
								<path
									class="draw-path"
									d="M 120 130 L 120 140 M 110 130 Q 120 110 130 130"
									stroke="#4fa64f"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
								/>
							{:else if step.number === '2'}
								<!-- Step 2: Build Together - Building under construction with crane -->
								<!-- Building base -->
								<path
									class="draw-path"
									d="M 60 150 L 60 90 L 140 90 L 140 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<!-- Floor lines -->
								<path
									class="draw-path"
									d="M 60 110 L 140 110 M 60 130 L 140 130"
									stroke="#4fa64f"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Windows -->
								<rect class="draw-fill" x="70" y="95" width="15" height="10" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<rect class="draw-fill" x="115" y="95" width="15" height="10" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<rect class="draw-fill" x="70" y="115" width="15" height="10" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<rect class="draw-fill" x="115" y="115" width="15" height="10" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<!-- Crane -->
								<path
									class="draw-path"
									d="M 160 150 L 160 50 L 180 50 L 180 55 L 160 55"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<!-- Crane arm -->
								<path
									class="draw-path"
									d="M 160 55 L 90 55"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Crane cable and hook -->
								<path
									class="draw-path"
									d="M 100 55 L 100 75 M 95 75 L 105 75 L 100 82 Z"
									stroke="#4fa64f"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<!-- Ground -->
								<path
									class="draw-path"
									d="M 30 150 L 170 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
								/>
							{:else}
								<!-- Step 3: Welcome Home - Completed building with welcome elements -->
								<!-- Building complete -->
								<path
									class="draw-path"
									d="M 50 150 L 50 70 L 100 50 L 150 70 L 150 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<!-- Roof detail -->
								<path
									class="draw-path"
									d="M 45 70 L 100 48 L 155 70"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<!-- Windows row 1 -->
								<rect class="draw-fill" x="60" y="80" width="20" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<rect class="draw-fill" x="120" y="80" width="20" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<!-- Windows row 2 -->
								<rect class="draw-fill" x="60" y="105" width="20" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<rect class="draw-fill" x="120" y="105" width="20" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5" rx="1"/>
								<!-- Door -->
								<path
									class="draw-path"
									d="M 88 150 L 88 125 L 112 125 L 112 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<!-- Door handle -->
								<circle class="draw-fill" cx="108" cy="138" r="2" fill="#4fa64f"/>
								<!-- Ground -->
								<path
									class="draw-path"
									d="M 30 150 L 170 150"
									stroke="#4fa64f"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Welcome path -->
								<path
									class="draw-path"
									d="M 100 150 L 100 165 Q 100 175 90 175 L 70 175"
									stroke="#4fa64f"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Simple family figure -->
								<circle class="draw-fill" cx="40" cy="160" r="5" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<path
									class="draw-path"
									d="M 40 165 L 40 180 M 35 172 L 45 172 M 40 180 L 35 190 M 40 180 L 45 190"
									stroke="#4fa64f"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
								/>
								<!-- Smaller figure (child) -->
								<circle class="draw-fill" cx="55" cy="167" r="3.5" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<path
									class="draw-path"
									d="M 55 170 L 55 180 M 52 175 L 58 175 M 55 180 L 52 188 M 55 180 L 58 188"
									stroke="#4fa64f"
									stroke-width="1.5"
									fill="none"
									stroke-linecap="round"
								/>
							{/if}
						</svg>
					</div>

					<!-- Step Content -->
					<div class="text-center">
						<h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
							<span class="text-nbrs-green">{step.number}</span>
							{' '}{step.title}
						</h3>
						<p class="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs mx-auto">
							{step.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
