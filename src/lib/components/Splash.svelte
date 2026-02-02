<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { loadGsap, prefersReducedMotion } from '$lib/utils/gsap';

	let { onComplete }: { onComplete?: () => void } = $props();

	let container: HTMLElement;
	let lettersContainer: HTMLElement;
	let circleOverlay: HTMLElement;
	let ctx: gsap.Context | null = null;
	let visible = $state(true);

	onMount(async () => {
		// TODO: Re-enable session check for production
		// Check if splash was already shown this session
		// if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('nbrs-splash-shown')) {
		// 	visible = false;
		// 	onComplete?.();
		// 	return;
		// }

		const gsap = await loadGsap();

		// Handle reduced motion preference
		if (prefersReducedMotion()) {
			await new Promise((resolve) => setTimeout(resolve, 500));
			visible = false;
			if (typeof sessionStorage !== 'undefined') {
				sessionStorage.setItem('nbrs-splash-shown', 'true');
			}
			onComplete?.();
			return;
		}

		ctx = gsap.context(() => {
			const letters = lettersContainer.querySelectorAll('.splash-letter');
			const tl = gsap.timeline({
				onComplete: () => {
					visible = false;
					if (typeof sessionStorage !== 'undefined') {
						sessionStorage.setItem('nbrs-splash-shown', 'true');
					}
					onComplete?.();
				}
			});

			// Initial state: letters invisible (matching nbrs.ca)
			gsap.set(letters, {
				opacity: 0,
				scale: 0,
				y: 100,
				rotationX: 180
			});

			gsap.set(circleOverlay, {
				scale: 0,
				opacity: 1
			});

			// Phase 1: Letters animate in with stagger (0.5s stagger like nbrs.ca)
			tl.to(letters, {
				opacity: 1,
				scale: 1.2,
				y: 0,
				rotationX: 0,
				duration: 0.6,
				stagger: 0.5,
				ease: 'back.out(1.7)'
			});

			// Phase 2: Letters settle to final size
			tl.to(
				letters,
				{
					scale: 1,
					duration: 0.4,
					ease: 'power2.out'
				},
				'-=0.2'
			);

			// Phase 3: Wiggle effect - each letter wiggles with stagger
			tl.to(letters, {
				rotation: 8,
				duration: 0.1,
				stagger: 0.08,
				ease: 'power1.inOut'
			});
			tl.to(letters, {
				rotation: -6,
				duration: 0.1,
				stagger: 0.08,
				ease: 'power1.inOut'
			});
			tl.to(letters, {
				rotation: 4,
				duration: 0.1,
				stagger: 0.08,
				ease: 'power1.inOut'
			});
			tl.to(letters, {
				rotation: 0,
				duration: 0.15,
				stagger: 0.08,
				ease: 'power2.out'
			});

			// Phase 4: Brief pause to let the logo sit
			tl.to({}, { duration: 0.4 });

			// Phase 5: White circle expands to reveal content (1.5s like nbrs.ca)
			tl.to(
				circleOverlay,
				{
					scale: 3,
					duration: 1.5,
					ease: 'power2.inOut'
				}
			);

			// Phase 6: Fade out letters as circle expands
			tl.to(
				letters,
				{
					opacity: 0,
					duration: 0.4,
					ease: 'power2.in'
				},
				'-=1.2'
			);
		}, container);
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

{#if visible}
	<div
		bind:this={container}
		class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
		aria-hidden="true"
	>
		<!-- Green background with subtle pattern (matching nbrs.ca) -->
		<div class="absolute inset-0 bg-nbrs-green">
			<svg class="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="splash-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
						<circle cx="20" cy="20" r="1.5" fill="white" fill-opacity="0.4" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#splash-pattern)" />
			</svg>
		</div>

		<!-- Letters container -->
		<div
			bind:this={lettersContainer}
			class="relative z-10 flex items-center justify-center gap-1 sm:gap-2 md:gap-4"
			style="perspective: 1000px;"
		>
			{#each ['N', 'B', 'R', 'S'] as letter}
				<span
					class="splash-letter select-none font-black text-white"
					style="font-size: clamp(2rem, 15vw, 8rem); transform-style: preserve-3d;"
				>
					{letter}
				</span>
			{/each}
		</div>

		<!-- White circle overlay for reveal (starts scaled to 0) -->
		<div
			bind:this={circleOverlay}
			class="absolute inset-0 flex items-center justify-center pointer-events-none"
			style="transform: scale(0);"
		>
			<div class="aspect-square w-[200vmax] rounded-full bg-white"></div>
		</div>
	</div>
{/if}
