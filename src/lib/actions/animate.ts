import type { Action } from 'svelte/action';
import { loadGsap } from '$lib/utils/gsap';

/**
 * Svelte action for simple GSAP "from" animations with automatic cleanup.
 *
 * For more complex animations (timelines, ScrollTrigger, etc.), use
 * the `useGsap` action from `$lib/utils/gsap` instead.
 *
 * @example
 * ```svelte
 * <div use:animate={{ opacity: 0, y: 50, duration: 1, ease: "power2.out" }}>
 *   Animated content
 * </div>
 * ```
 *
 * @deprecated Prefer `useGsap` from `$lib/utils/gsap` for better cleanup and flexibility.
 */
export const animate: Action<HTMLElement, gsap.TweenVars> = (node, params) => {
	let tween: gsap.core.Tween | null = null;

	const init = async () => {
		const gsap = await loadGsap();
		tween = gsap.from(node, params);
	};

	init();

	return {
		update(newParams: gsap.TweenVars) {
			if (tween) {
				tween.kill();
			}
			params = newParams;
			init();
		},
		destroy() {
			if (tween) {
				tween.kill();
			}
		}
	};
};
