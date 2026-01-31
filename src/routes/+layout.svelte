<script>
	import { fade } from 'svelte/transition';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Splash from '$lib/components/Splash.svelte';

	let { children, data } = $props();

	let splashComplete = $state(false);
</script>

<Splash onComplete={() => (splashComplete = true)} />

<Nav />

{#key data.pathname}
	<main
		id="main-content"
		class="min-h-screen pt-16"
		in:fade={{ duration: 150, delay: 150 }}
		out:fade={{ duration: 150 }}
	>
		{@render children()}
	</main>
{/key}

<Footer />
