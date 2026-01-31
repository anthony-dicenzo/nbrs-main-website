import type { Action } from 'svelte/action';

// Store GSAP instance after first load
let gsapInstance: typeof import('gsap').gsap | null = null;
let ScrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;

/**
 * Dynamically load GSAP (safe for SSR).
 * Returns the same instance on subsequent calls.
 */
export async function loadGsap() {
	if (gsapInstance) return gsapInstance;

	const { gsap } = await import('gsap');
	gsapInstance = gsap;
	return gsap;
}

/**
 * Dynamically load ScrollTrigger plugin (safe for SSR).
 * Automatically registers with GSAP.
 */
export async function loadScrollTrigger() {
	if (ScrollTriggerInstance) return ScrollTriggerInstance;

	const gsap = await loadGsap();
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	gsap.registerPlugin(ScrollTrigger);
	ScrollTriggerInstance = ScrollTrigger;
	return ScrollTrigger;
}

/**
 * Type for the animation callback passed to useGsap.
 * Receives GSAP instance and the element, returns cleanup or void.
 */
type GsapAnimationCallback = (
	gsap: typeof import('gsap').gsap,
	element: HTMLElement
) => gsap.core.Timeline | gsap.core.Tween | void;

/**
 * Svelte action for GSAP animations with proper context cleanup.
 *
 * Creates a GSAP context scoped to the element, which is reverted on destroy.
 * This prevents memory leaks and animation artifacts when navigating between routes.
 *
 * @example Basic usage:
 * ```svelte
 * <div use:useGsap={(gsap, el) => {
 *   gsap.from(el, { opacity: 0, y: 20, duration: 0.5 });
 * }}>
 *   Animated content
 * </div>
 * ```
 *
 * @example With timeline:
 * ```svelte
 * <div use:useGsap={(gsap, el) => {
 *   const tl = gsap.timeline();
 *   tl.from(el, { opacity: 0 })
 *     .from(el.children, { y: 20, stagger: 0.1 });
 *   return tl;
 * }}>
 *   Content with staggered children
 * </div>
 * ```
 *
 * @example Respecting prefers-reduced-motion:
 * ```svelte
 * <div use:useGsap={(gsap, el) => {
 *   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 *   if (prefersReducedMotion) {
 *     gsap.set(el, { opacity: 1 });
 *     return;
 *   }
 *   gsap.from(el, { opacity: 0, y: 20, duration: 0.5 });
 * }}>
 *   Accessible animation
 * </div>
 * ```
 */
export const useGsap: Action<HTMLElement, GsapAnimationCallback> = (node, animationFn) => {
	let ctx: gsap.Context | null = null;
	let cleanup: (() => void) | null = null;

	// Initialize animation
	const init = async () => {
		const gsap = await loadGsap();

		// Create context scoped to the element
		ctx = gsap.context(() => {
			const result = animationFn(gsap, node);

			// If the callback returns a tween or timeline, we can track it
			// The context will automatically clean it up, but we store reference for update
			if (result && 'kill' in result) {
				cleanup = () => result.kill();
			}
		}, node);
	};

	init();

	return {
		update(newAnimationFn: GsapAnimationCallback) {
			// Revert previous animations and re-run with new params
			if (ctx) {
				ctx.revert();
			}
			animationFn = newAnimationFn;
			init();
		},
		destroy() {
			// Revert all animations in this context
			if (ctx) {
				ctx.revert();
			}
		}
	};
};

/**
 * Check if user prefers reduced motion.
 * Use this to conditionally skip or simplify animations.
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Helper to create a GSAP context manually for components that need more control.
 * Use this in onMount when you need ScrollTrigger or complex animation coordination.
 *
 * @example
 * ```svelte
 * <script>
 *   import { onMount, onDestroy } from 'svelte';
 *   import { createGsapContext, loadScrollTrigger } from '$lib/utils/gsap';
 *
 *   let container: HTMLElement;
 *   let ctx: gsap.Context | null = null;
 *
 *   onMount(async () => {
 *     ctx = await createGsapContext(container, async (gsap) => {
 *       const ScrollTrigger = await loadScrollTrigger();
 *       gsap.from('.item', {
 *         opacity: 0,
 *         y: 50,
 *         stagger: 0.1,
 *         scrollTrigger: { trigger: container, start: 'top 80%' }
 *       });
 *     });
 *   });
 *
 *   onDestroy(() => {
 *     ctx?.revert();
 *   });
 * </script>
 *
 * <div bind:this={container}>
 *   <div class="item">Item 1</div>
 *   <div class="item">Item 2</div>
 * </div>
 * ```
 */
export async function createGsapContext(
	scope: HTMLElement | string,
	animationFn: (gsap: typeof import('gsap').gsap) => void | Promise<void>
): Promise<gsap.Context> {
	const gsap = await loadGsap();

	const ctx = gsap.context(async () => {
		await animationFn(gsap);
	}, scope);

	return ctx;
}
