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
		// Check if splash was already shown this session
		if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('nbrs-splash-shown')) {
			visible = false;
			onComplete?.();
			return;
		}

		const gsap = await loadGsap();

		// Handle reduced motion preference
		if (prefersReducedMotion()) {
			// Skip animation, just show briefly then hide
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

			// Initial state: letters invisible
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

			// Phase 1: Letters animate in with stagger
			tl.to(letters, {
				opacity: 1,
				scale: 1.2,
				y: 0,
				rotationX: 0,
				duration: 0.6,
				stagger: 0.15,
				ease: 'back.out(1.7)'
			});

			// Phase 2: Letters settle to final size with subtle bounce
			tl.to(
				letters,
				{
					scale: 1,
					duration: 0.3,
					ease: 'power2.out'
				},
				'-=0.1'
			);

			// Phase 3: Brief pause to let the logo sit
			tl.to({}, { duration: 0.4 });

			// Phase 4: White circle expands to reveal content
			tl.to(
				circleOverlay,
				{
					scale: 3,
					duration: 0.8,
					ease: 'power2.inOut'
				},
				'-=0.1'
			);

			// Phase 5: Fade out letters as circle expands
			tl.to(
				letters,
				{
					opacity: 0,
					duration: 0.3,
					ease: 'power2.in'
				},
				'-=0.6'
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
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-nbrs-green"
		aria-hidden="true"
	>
		<!-- Letters container -->
		<div
			bind:this={lettersContainer}
			class="relative z-10 flex items-center justify-center gap-2 sm:gap-4"
			style="perspective: 1000px;"
		>
			{#each ['N', 'B', 'R', 'S'] as letter}
				<span
					class="splash-letter text-6xl sm:text-8xl md:text-9xl font-bold text-white select-none"
					style="transform-style: preserve-3d;"
				>
					{letter}
				</span>
			{/each}
		</div>

		<!-- White circle overlay for reveal -->
		<div
			bind:this={circleOverlay}
			class="absolute inset-0 flex items-center justify-center pointer-events-none"
		>
			<div class="w-[150vmax] h-[150vmax] rounded-full bg-white"></div>
		</div>
	</div>
{/if}
