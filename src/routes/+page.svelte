<script>
	import { onMount } from 'svelte';

	let gsapLoaded = $state(false);

	onMount(async () => {
		const { gsap } = await import('gsap');
		gsapLoaded = true;

		gsap.from('.test-box', {
			opacity: 0,
			y: 20,
			duration: 0.5
		});
	});
</script>

<div class="min-h-screen bg-nbrs-green p-8">
	<h1 class="text-4xl font-bold text-white mb-4">NBRS Website v4</h1>

	<div class="space-y-2 text-white">
		<p>Tailwind: <span class="font-bold text-nbrs-coral">Working</span></p>
		<p>GSAP: <span class="font-bold">{gsapLoaded ? 'Loaded' : 'Loading...'}</span></p>
	</div>

	<div class="test-box mt-8 p-4 bg-white rounded-lg text-nbrs-green font-bold">
		If you see this animated in, GSAP works!
	</div>

	<nav class="mt-8 space-x-4">
		<a href="/partner" class="text-white hover:text-nbrs-coral underline">Partner</a>
		<a href="/waitlist" class="text-white hover:text-nbrs-coral underline">Waitlist</a>
		<a href="/family-1" class="text-white hover:text-nbrs-coral underline">FAMILY 1</a>
	</nav>
</div>
