<script>
	let { children } = $props();
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Nav />

<main class="min-h-screen pt-16">
	{@render children()}
</main>

<Footer />
