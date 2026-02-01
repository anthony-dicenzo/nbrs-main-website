<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let ctx: gsap.Context | null = null;

	const steps = [
		{
			number: '1',
			title: 'Buy Land',
			description: 'We identify underutilized parcels in established neighbourhoods where gentle density makes sense.'
		},
		{
			number: '2',
			title: 'Build Homes',
			description: 'Quality construction with thoughtful design—homes that fit in and stand out.'
		},
		{
			number: '3',
			title: 'Sell Homes',
			description: 'Families move into spaces designed for real life—room to grow, room to thrive.'
		}
	];

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			// Animate SVG paths with line drawing effect
			const paths = container.querySelectorAll('.draw-path');
			paths.forEach((path) => {
				const svgPath = path as SVGPathElement;
				const length = svgPath.getTotalLength();

				gsap.set(svgPath, {
					strokeDasharray: length,
					strokeDashoffset: length
				});

				gsap.to(svgPath, {
					strokeDashoffset: 0,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: svgPath.closest('.step-card'),
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				});
			});

			// Animate step cards
			const cards = container.querySelectorAll('.step-card');
			gsap.from(cards, {
				opacity: 0,
				y: 30,
				duration: 0.8,
				stagger: 0.15,
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
	aria-labelledby="build-timeline-heading"
	class="py-16 sm:py-20 md:py-24 bg-amber-50"
	bind:this={container}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<!-- Timeline Grid - 3 columns with dividers -->
		<div class="grid md:grid-cols-3 relative">
			<!-- Vertical dividers (desktop only) -->
			<div class="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-nbrs-green/20" aria-hidden="true"></div>
			<div class="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-nbrs-green/20" aria-hidden="true"></div>

			{#each steps as step, i}
				<div class="step-card px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-0 {i > 0 ? 'border-t md:border-t-0 border-nbrs-green/20' : ''}">
					<!-- Step Header -->
					<h3 class="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
						<span class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 text-white text-lg sm:text-xl font-bold">
							{step.number}
						</span>
						<span>{step.title}</span>
					</h3>

					<!-- Illustration -->
					<div class="w-full aspect-[4/3] mb-6 md:mb-8">
						<svg viewBox="0 0 400 300" class="w-full h-full" aria-hidden="true">
							{#if step.number === '1'}
								<!-- Buy Land: Property lot with dashed lines, measurement marks, small vegetation -->
								<!-- Ground line -->
								<line class="draw-path" x1="40" y1="260" x2="360" y2="260" stroke="#4fa64f" stroke-width="2"/>

								<!-- Property boundary - dashed rectangle -->
								<rect class="draw-path" x="80" y="100" width="240" height="160" fill="none" stroke="#4fa64f" stroke-width="2" stroke-dasharray="12 6"/>

								<!-- Corner stakes -->
								<circle cx="80" cy="100" r="6" fill="#4fa64f"/>
								<circle cx="320" cy="100" r="6" fill="#4fa64f"/>
								<circle cx="80" cy="260" r="6" fill="#4fa64f"/>
								<circle cx="320" cy="260" r="6" fill="#4fa64f"/>

								<!-- Measurement lines left side -->
								<line class="draw-path" x1="50" y1="110" x2="50" y2="250" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="42" y1="110" x2="58" y2="110" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="42" y1="250" x2="58" y2="250" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Measurement lines bottom -->
								<line class="draw-path" x1="90" y1="280" x2="310" y2="280" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="90" y1="272" x2="90" y2="288" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="310" y1="272" x2="310" y2="288" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Small trees/vegetation -->
								<path class="draw-path" d="M140 240 L140 260" stroke="#4fa64f" stroke-width="2"/>
								<path class="draw-path" d="M120 240 Q140 200 160 240" stroke="#4fa64f" stroke-width="2" fill="none"/>

								<path class="draw-path" d="M280 240 L280 260" stroke="#4fa64f" stroke-width="2"/>
								<path class="draw-path" d="M260 240 Q280 200 300 240" stroke="#4fa64f" stroke-width="2" fill="none"/>

								<!-- Small grass tufts -->
								<path class="draw-path" d="M180 258 L185 248 M185 258 L188 250 M190 258 L193 252" stroke="#4fa64f" stroke-width="1.5" stroke-linecap="round"/>
								<path class="draw-path" d="M230 258 L235 250 M235 258 L240 252" stroke="#4fa64f" stroke-width="1.5" stroke-linecap="round"/>

							{:else if step.number === '2'}
								<!-- Build Homes: Building under construction with crane -->
								<!-- Ground -->
								<line class="draw-path" x1="20" y1="260" x2="380" y2="260" stroke="#4fa64f" stroke-width="2"/>

								<!-- Building structure -->
								<rect class="draw-path" x="60" y="120" width="180" height="140" fill="none" stroke="#4fa64f" stroke-width="2"/>

								<!-- Floor lines -->
								<line class="draw-path" x1="60" y1="160" x2="240" y2="160" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="60" y1="200" x2="240" y2="200" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Windows Row 1 -->
								<rect class="draw-path" x="75" y="130" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="90" y1="130" x2="90" y2="152" stroke="#4fa64f" stroke-width="1"/>
								<rect class="draw-path" x="125" y="130" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="140" y1="130" x2="140" y2="152" stroke="#4fa64f" stroke-width="1"/>
								<rect class="draw-path" x="195" y="130" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="210" y1="130" x2="210" y2="152" stroke="#4fa64f" stroke-width="1"/>

								<!-- Windows Row 2 -->
								<rect class="draw-path" x="75" y="170" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="125" y="170" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="195" y="170" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Windows Row 3 -->
								<rect class="draw-path" x="75" y="210" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="195" y="210" width="30" height="22" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Door opening -->
								<rect class="draw-path" x="125" y="210" width="50" height="50" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Crane tower -->
								<line class="draw-path" x1="310" y1="260" x2="310" y2="40" stroke="#4fa64f" stroke-width="3"/>
								<!-- Crane base -->
								<line class="draw-path" x1="290" y1="260" x2="330" y2="260" stroke="#4fa64f" stroke-width="3"/>
								<!-- Crane arm -->
								<line class="draw-path" x1="310" y1="50" x2="380" y2="50" stroke="#4fa64f" stroke-width="2.5"/>
								<line class="draw-path" x1="310" y1="50" x2="270" y2="50" stroke="#4fa64f" stroke-width="2.5"/>
								<!-- Crane cabin -->
								<rect class="draw-path" x="300" y="55" width="20" height="25" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<!-- Counter weight -->
								<rect class="draw-path" x="268" y="45" width="15" height="12" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<!-- Cable and hook -->
								<line class="draw-path" x1="360" y1="50" x2="360" y2="110" stroke="#4fa64f" stroke-width="1.5"/>
								<path class="draw-path" d="M352 110 L360 120 L368 110" stroke="#4fa64f" stroke-width="2" fill="none"/>
								<!-- Beam being lifted -->
								<rect class="draw-path" x="340" y="125" width="40" height="8" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

							{:else}
								<!-- Sell Homes: Completed townhouse with car -->
								<!-- Ground -->
								<line class="draw-path" x1="20" y1="260" x2="380" y2="260" stroke="#4fa64f" stroke-width="2"/>

								<!-- Main building -->
								<rect class="draw-path" x="50" y="100" width="220" height="160" fill="none" stroke="#4fa64f" stroke-width="2"/>

								<!-- Roof -->
								<line class="draw-path" x1="50" y1="100" x2="50" y2="80" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="270" y1="100" x2="270" y2="80" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="40" y1="80" x2="280" y2="80" stroke="#4fa64f" stroke-width="2"/>

								<!-- Vertical dividers (townhouse units) -->
								<line class="draw-path" x1="130" y1="80" x2="130" y2="260" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="190" y1="80" x2="190" y2="260" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Windows Unit 1 -->
								<rect class="draw-path" x="65" y="110" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="95" y="110" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="65" y="145" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="95" y="145" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Door Unit 1 -->
								<rect class="draw-path" x="75" y="200" width="35" height="60" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<circle cx="105" cy="235" r="3" fill="#4fa64f"/>

								<!-- Windows Unit 2 -->
								<rect class="draw-path" x="145" y="110" width="30" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="145" y="145" width="30" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Door Unit 2 -->
								<rect class="draw-path" x="147" y="200" width="28" height="60" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<circle cx="170" cy="235" r="3" fill="#4fa64f"/>

								<!-- Windows Unit 3 -->
								<rect class="draw-path" x="205" y="110" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="235" y="110" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="205" y="145" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="235" y="145" width="25" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Door Unit 3 -->
								<rect class="draw-path" x="212" y="200" width="35" height="60" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<circle cx="242" cy="235" r="3" fill="#4fa64f"/>

								<!-- Car -->
								<path class="draw-path" d="M295 260 L295 240 Q295 230 310 230 L355 230 Q370 230 370 240 L370 260" stroke="#4fa64f" stroke-width="2" fill="none"/>
								<line class="draw-path" x1="295" y1="245" x2="370" y2="245" stroke="#4fa64f" stroke-width="1.5"/>
								<!-- Car windows -->
								<path class="draw-path" d="M305 245 L310 235 L340 235 L345 245" stroke="#4fa64f" stroke-width="1.5" fill="none"/>
								<!-- Wheels -->
								<circle class="draw-path" cx="310" cy="260" r="10" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<circle class="draw-path" cx="355" cy="260" r="10" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<!-- For Sale sign -->
								<line class="draw-path" x1="320" y1="200" x2="320" y2="180" stroke="#4fa64f" stroke-width="2"/>
								<rect class="draw-path" x="300" y="165" width="55" height="18" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<text x="327" y="178" text-anchor="middle" fill="#4fa64f" font-size="8" font-weight="bold">For Sale</text>
							{/if}
						</svg>
					</div>

					<!-- Description -->
					<p class="text-sm sm:text-base text-gray-600 leading-relaxed">
						{step.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
