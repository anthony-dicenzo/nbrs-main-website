/**
 * Mobile detection utility for video fallback
 * Uses screen width for detection (more reliable than user agent)
 * Threshold: 768px (standard tablet breakpoint)
 *
 * Note: This file uses .svelte.ts extension to enable Svelte 5 runes
 */

// Mobile breakpoint (matches Tailwind md: breakpoint)
const MOBILE_BREAKPOINT = 768;

// Track whether we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Reactive state for mobile detection
let mobileState = $state(false);
let initialized = false;

/**
 * Initialize mobile detection (call in onMount)
 * Sets up window resize listener for reactive updates
 */
export function initMobileDetection(): void {
	if (!isBrowser || initialized) return;

	const checkMobile = () => {
		mobileState = window.innerWidth < MOBILE_BREAKPOINT;
	};

	// Initial check
	checkMobile();
	initialized = true;

	// Listen for resize (debounced by browser)
	window.addEventListener('resize', checkMobile);
}

/**
 * Get current mobile state (reactive)
 * Returns false during SSR
 */
export function isMobile(): boolean {
	return mobileState;
}

/**
 * Check if device is mobile (one-time check, not reactive)
 * Useful for initial render decisions
 * Returns false during SSR (safe default to not block video on server)
 */
export function checkIsMobile(): boolean {
	if (!isBrowser) return false;
	return window.innerWidth < MOBILE_BREAKPOINT;
}
