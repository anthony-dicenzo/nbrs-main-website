<script>
	import { fade } from 'svelte/transition';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data } = $props();
</script>

<Nav />

{#key data.pathname}
	<main
		class="min-h-screen pt-16"
		in:fade={{ duration: 150, delay: 150 }}
		out:fade={{ duration: 150 }}
	>
		{@render children()}
	</main>
{/key}

<Footer />
