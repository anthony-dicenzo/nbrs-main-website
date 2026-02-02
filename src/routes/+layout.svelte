<script>
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Splash from '$lib/components/Splash.svelte';

	let { children, data } = $props();

	let splashComplete = $state(false);
	let isNavigating = $state(false);

	// Only show splash on homepage on initial load (not after navigation)
	const showSplash = $derived(data.pathname === '/' && !splashComplete && !isNavigating);

	// Track navigation to prevent splash on client-side nav
	onNavigate(() => {
		isNavigating = true;
	});
</script>

{#if showSplash}
	<Splash onComplete={() => (splashComplete = true)} />
{/if}

<Nav />

<main id="main-content" class="min-h-screen pt-16">
	{@render children()}
</main>

<Footer />
