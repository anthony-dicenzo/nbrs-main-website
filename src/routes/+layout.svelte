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

	// Build canonical URL from pathname
	const canonicalUrl = $derived(`https://nbrs.ca${data.pathname === '/' ? '' : data.pathname}`);

	// Track navigation to prevent splash on client-side nav
	onNavigate(() => {
		isNavigating = true;
	});
</script>

<svelte:head>
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:locale" content="en_CA" />
	<meta property="og:site_name" content="NBRS" />
</svelte:head>

{#if showSplash}
	<Splash onComplete={() => (splashComplete = true)} />
{/if}

<Nav />

<main id="main-content" class="min-h-screen pt-16">
	{@render children()}
</main>

<Footer />
