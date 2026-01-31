import { gsap } from 'gsap';

/**
 * Svelte action for GSAP animations with automatic cleanup.
 *
 * Usage:
 * <div use:animate={{ opacity: 0, y: 50, duration: 1, ease: "power2.out" }}>
 *   Animated content
 * </div>
 *
 * IMPORTANT: This action runs on the client only (Svelte actions don't run during SSR).
 * For complex animations or ScrollTrigger, use onMount with dynamic imports.
 */
export function animate(
	node: HTMLElement,
	params: gsap.TweenVars
): { destroy: () => void } {
	const tween = gsap.from(node, params);

	return {
		destroy() {
			tween.kill();
		}
	};
}
