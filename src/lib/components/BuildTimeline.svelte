<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let container: HTMLElement;
	let ctx: gsap.Context | null = null;

	const steps = [
		{
			number: '1',
			title: 'Buy Land',
			description: 'We target as-of-right sites that permit neighbourhood-scale buildings—no rezoning required.'
		},
		{
			number: '2',
			title: 'Build Homes',
			description: 'Our tech-enabled process delivers new housing in 12-18 months from acquisition.'
		},
		{
			number: '3',
			title: 'Rent Homes',
			description: 'Quality rental housing for families who want to stay in the neighbourhoods they love.'
		}
	];

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			// Animate SVG paths with line drawing effect
			const paths = container.querySelectorAll('.draw-path');
			paths.forEach((path, index) => {
				const svgPath = path as SVGPathElement;
				const length = svgPath.getTotalLength();

				gsap.set(svgPath, {
					strokeDasharray: length,
					strokeDashoffset: length
				});

				gsap.to(svgPath, {
					strokeDashoffset: 0,
					duration: 1.2,
					delay: index * 0.03,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: svgPath.closest('.step-panel'),
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				});
			});

			// Fade in circles and fills
			const fills = container.querySelectorAll('.fill-element');
			gsap.from(fills, {
				opacity: 0,
				duration: 0.6,
				stagger: 0.05,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 75%',
					toggleActions: 'play none none none'
				}
			});

			// Animate headers
			const headers = container.querySelectorAll('.step-header');
			gsap.from(headers, {
				opacity: 0,
				y: 20,
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
	aria-labelledby="build-timeline-heading"
	class="py-20 sm:py-24 md:py-32 bg-amber-50"
	bind:this={container}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<!-- Section Header -->
		<div class="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
			<h2 id="build-timeline-heading" class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
				The Missing Middle
			</h2>
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				It's not just about buildings—it's about people. The missing middle isn't just the neighbourhood-scale homes we love in our city, it's the missing middle class. Families shouldn't have to leave Toronto to afford a home.
			</p>
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
				We build 5-10 unit buildings in established neighbourhoods. Our experience in high-rise development taught us what's broken—now we're using that knowledge to deliver new housing faster.
			</p>
		</div>

		<!-- 3-Panel Grid -->
		<div class="grid md:grid-cols-3 relative">
			{#each steps as step, i}
				<div class="step-panel relative {i < 2 ? 'md:border-r md:border-gray-300' : ''} px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
					<!-- Step Header: Number + Title -->
					<div class="step-header mb-6 md:mb-8">
						<div class="flex items-center gap-4 mb-3">
							<span class="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900 text-white text-xl sm:text-2xl font-bold fill-element">
								{step.number}
							</span>
							<h3 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
								{step.title}
							</h3>
						</div>
						<p class="text-sm sm:text-base text-gray-600 leading-relaxed pl-0 sm:pl-[4.5rem]">
							{step.description}
						</p>
					</div>

					<!-- Large Illustration Area -->
					<div class="w-full aspect-square">
						<svg viewBox="0 0 400 400" class="w-full h-full" aria-hidden="true">
							{#if step.number === '1'}
								<!-- BUY LAND: Detailed property lot blueprint -->
								<!-- Ground baseline -->
								<line class="draw-path" x1="20" y1="360" x2="380" y2="360" stroke="#4fa64f" stroke-width="2"/>

								<!-- Property boundary - main rectangle -->
								<rect class="draw-path" x="60" y="80" width="280" height="260" fill="none" stroke="#4fa64f" stroke-width="2.5"/>

								<!-- Property corner stakes with circles -->
								<circle class="fill-element" cx="60" cy="80" r="8" fill="#4fa64f"/>
								<circle class="fill-element" cx="340" cy="80" r="8" fill="#4fa64f"/>
								<circle class="fill-element" cx="60" cy="340" r="8" fill="#4fa64f"/>
								<circle class="fill-element" cx="340" cy="340" r="8" fill="#4fa64f"/>

								<!-- Dashed setback lines -->
								<rect class="draw-path" x="90" y="110" width="220" height="200" fill="none" stroke="#4fa64f" stroke-width="1.5" stroke-dasharray="8 4"/>

								<!-- Left dimension line -->
								<line class="draw-path" x1="35" y1="90" x2="35" y2="330" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="28" y1="90" x2="42" y2="90" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="28" y1="330" x2="42" y2="330" stroke="#4fa64f" stroke-width="1.5"/>
								<text x="35" y="215" text-anchor="middle" fill="#4fa64f" font-size="12" transform="rotate(-90 35 215)" class="fill-element">40'</text>

								<!-- Bottom dimension line -->
								<line class="draw-path" x1="70" y1="375" x2="330" y2="375" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="70" y1="368" x2="70" y2="382" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="330" y1="368" x2="330" y2="382" stroke="#4fa64f" stroke-width="1.5"/>
								<text x="200" y="390" text-anchor="middle" fill="#4fa64f" font-size="12" class="fill-element">120'</text>

								<!-- Trees (architectural style) -->
								<circle class="draw-path" cx="140" cy="180" r="25" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<circle class="draw-path" cx="140" cy="180" r="15" fill="none" stroke="#4fa64f" stroke-width="1"/>
								<circle class="fill-element" cx="140" cy="180" r="4" fill="#4fa64f"/>

								<circle class="draw-path" cx="260" cy="260" r="30" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<circle class="draw-path" cx="260" cy="260" r="18" fill="none" stroke="#4fa64f" stroke-width="1"/>
								<circle class="fill-element" cx="260" cy="260" r="5" fill="#4fa64f"/>

								<!-- North arrow -->
								<line class="draw-path" x1="350" y1="50" x2="350" y2="20" stroke="#4fa64f" stroke-width="2"/>
								<path class="draw-path" d="M343 30 L350 18 L357 30" stroke="#4fa64f" stroke-width="2" fill="none"/>
								<text x="350" y="62" text-anchor="middle" fill="#4fa64f" font-size="10" class="fill-element">N</text>

								<!-- Scale indicator -->
								<line class="draw-path" x1="60" y1="30" x2="120" y2="30" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="60" y1="25" x2="60" y2="35" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="120" y1="25" x2="120" y2="35" stroke="#4fa64f" stroke-width="2"/>
								<text x="90" y="48" text-anchor="middle" fill="#4fa64f" font-size="10" class="fill-element">1" = 20'</text>

							{:else if step.number === '2'}
								<!-- BUILD HOMES: Construction site with detailed building -->
								<!-- Ground -->
								<line class="draw-path" x1="20" y1="360" x2="380" y2="360" stroke="#4fa64f" stroke-width="2"/>

								<!-- Building foundation -->
								<rect class="draw-path" x="40" y="340" width="220" height="20" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="40" y1="350" x2="260" y2="350" stroke="#4fa64f" stroke-width="1"/>

								<!-- Building frame - main structure -->
								<rect class="draw-path" x="50" y="140" width="200" height="200" fill="none" stroke="#4fa64f" stroke-width="2"/>

								<!-- Floor levels -->
								<line class="draw-path" x1="50" y1="200" x2="250" y2="200" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="50" y1="260" x2="250" y2="260" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Roof trusses (under construction) -->
								<line class="draw-path" x1="50" y1="140" x2="150" y2="80" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="150" y1="80" x2="250" y2="140" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="100" y1="110" x2="100" y2="140" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="150" y1="80" x2="150" y2="140" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="200" y1="110" x2="200" y2="140" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Window openings (framed but not filled) -->
								<rect class="draw-path" x="70" y="155" width="35" height="30" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="130" y="155" width="40" height="30" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="195" y="155" width="35" height="30" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<rect class="draw-path" x="70" y="215" width="35" height="30" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="195" y="215" width="35" height="30" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Door frame -->
								<rect class="draw-path" x="125" y="275" width="50" height="65" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Scaffolding left side -->
								<line class="draw-path" x1="30" y1="360" x2="30" y2="100" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="20" y1="360" x2="40" y2="360" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="30" y1="180" x2="50" y2="180" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="30" y1="240" x2="50" y2="240" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="30" y1="300" x2="50" y2="300" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Tower crane -->
								<line class="draw-path" x1="330" y1="360" x2="330" y2="30" stroke="#4fa64f" stroke-width="3"/>
								<!-- Crane base -->
								<rect class="draw-path" x="315" y="340" width="30" height="20" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<!-- Crane arm (jib) -->
								<line class="draw-path" x1="330" y1="40" x2="380" y2="40" stroke="#4fa64f" stroke-width="2.5"/>
								<line class="draw-path" x1="330" y1="40" x2="280" y2="40" stroke="#4fa64f" stroke-width="2.5"/>
								<!-- Counter jib -->
								<rect class="draw-path" x="275" y="35" width="15" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<!-- Crane cabin -->
								<rect class="draw-path" x="322" y="50" width="16" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<!-- Cable and hook -->
								<line class="draw-path" x1="360" y1="40" x2="360" y2="120" stroke="#4fa64f" stroke-width="1.5"/>
								<path class="draw-path" d="M353 118 L360 130 L367 118" stroke="#4fa64f" stroke-width="2" fill="none"/>
								<!-- Beam being lifted -->
								<rect class="draw-path" x="340" y="135" width="40" height="8" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Construction materials on ground -->
								<rect class="draw-path" x="280" y="340" width="40" height="20" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="280" y1="350" x2="320" y2="350" stroke="#4fa64f" stroke-width="1"/>

							{:else}
								<!-- SELL HOMES: Completed townhouse row -->
								<!-- Ground -->
								<line class="draw-path" x1="20" y1="360" x2="380" y2="360" stroke="#4fa64f" stroke-width="2"/>

								<!-- Main building structure -->
								<rect class="draw-path" x="40" y="120" width="280" height="240" fill="none" stroke="#4fa64f" stroke-width="2"/>

								<!-- Roof -->
								<line class="draw-path" x1="40" y1="120" x2="40" y2="100" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="320" y1="120" x2="320" y2="100" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="30" y1="100" x2="330" y2="100" stroke="#4fa64f" stroke-width="2.5"/>
								<!-- Roof detail lines -->
								<line class="draw-path" x1="35" y1="95" x2="325" y2="95" stroke="#4fa64f" stroke-width="1"/>

								<!-- Unit dividers (3 townhouses) -->
								<line class="draw-path" x1="133" y1="100" x2="133" y2="360" stroke="#4fa64f" stroke-width="2"/>
								<line class="draw-path" x1="227" y1="100" x2="227" y2="360" stroke="#4fa64f" stroke-width="2"/>

								<!-- UNIT 1 (left) -->
								<!-- Upper windows -->
								<rect class="draw-path" x="55" y="135" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="69" y1="135" x2="69" y2="170" stroke="#4fa64f" stroke-width="1"/>
								<line class="draw-path" x1="55" y1="152" x2="83" y2="152" stroke="#4fa64f" stroke-width="1"/>

								<rect class="draw-path" x="93" y="135" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="107" y1="135" x2="107" y2="170" stroke="#4fa64f" stroke-width="1"/>
								<line class="draw-path" x1="93" y1="152" x2="121" y2="152" stroke="#4fa64f" stroke-width="1"/>

								<!-- Lower windows -->
								<rect class="draw-path" x="55" y="195" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="69" y1="195" x2="69" y2="230" stroke="#4fa64f" stroke-width="1"/>

								<rect class="draw-path" x="93" y="195" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="107" y1="195" x2="107" y2="230" stroke="#4fa64f" stroke-width="1"/>

								<!-- Door -->
								<rect class="draw-path" x="67" y="275" width="40" height="70" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="87" y1="275" x2="87" y2="345" stroke="#4fa64f" stroke-width="1"/>
								<circle class="fill-element" cx="95" cy="315" r="4" fill="#4fa64f"/>
								<!-- Step -->
								<rect class="draw-path" x="60" y="345" width="54" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- UNIT 2 (middle) -->
								<rect class="draw-path" x="150" y="135" width="30" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="165" y1="135" x2="165" y2="170" stroke="#4fa64f" stroke-width="1"/>
								<line class="draw-path" x1="150" y1="152" x2="180" y2="152" stroke="#4fa64f" stroke-width="1"/>

								<rect class="draw-path" x="190" y="135" width="30" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="205" y1="135" x2="205" y2="170" stroke="#4fa64f" stroke-width="1"/>
								<line class="draw-path" x1="190" y1="152" x2="220" y2="152" stroke="#4fa64f" stroke-width="1"/>

								<rect class="draw-path" x="150" y="195" width="30" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="190" y="195" width="30" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<rect class="draw-path" x="160" y="275" width="40" height="70" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="180" y1="275" x2="180" y2="345" stroke="#4fa64f" stroke-width="1"/>
								<circle class="fill-element" cx="188" cy="315" r="4" fill="#4fa64f"/>
								<rect class="draw-path" x="153" y="345" width="54" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- UNIT 3 (right) -->
								<rect class="draw-path" x="242" y="135" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="256" y1="135" x2="256" y2="170" stroke="#4fa64f" stroke-width="1"/>

								<rect class="draw-path" x="280" y="135" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="294" y1="135" x2="294" y2="170" stroke="#4fa64f" stroke-width="1"/>

								<rect class="draw-path" x="242" y="195" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<rect class="draw-path" x="280" y="195" width="28" height="35" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<rect class="draw-path" x="254" y="275" width="40" height="70" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="274" y1="275" x2="274" y2="345" stroke="#4fa64f" stroke-width="1"/>
								<circle class="fill-element" cx="282" cy="315" r="4" fill="#4fa64f"/>
								<rect class="draw-path" x="247" y="345" width="54" height="15" fill="none" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- Landscaping -->
								<circle class="draw-path" cx="350" cy="320" r="18" fill="none" stroke="#4fa64f" stroke-width="1.5"/>
								<circle class="draw-path" cx="350" cy="320" r="10" fill="none" stroke="#4fa64f" stroke-width="1"/>
								<circle class="fill-element" cx="350" cy="320" r="3" fill="#4fa64f"/>

								<!-- Pathway -->
								<line class="draw-path" x1="87" y1="360" x2="87" y2="380" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="180" y1="360" x2="180" y2="380" stroke="#4fa64f" stroke-width="1.5"/>
								<line class="draw-path" x1="274" y1="360" x2="274" y2="380" stroke="#4fa64f" stroke-width="1.5"/>

								<!-- HOME banner -->
								<rect class="draw-path" x="340" y="140" width="50" height="22" fill="none" stroke="#4fa64f" stroke-width="2"/>
								<text x="365" y="156" text-anchor="middle" fill="#4fa64f" font-size="11" font-weight="bold" class="fill-element">HOME</text>
							{/if}
						</svg>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
