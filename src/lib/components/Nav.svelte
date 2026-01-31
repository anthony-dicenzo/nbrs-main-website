<script lang="ts">
	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let visible = $state(true);
	let atTop = $state(true);

	$effect(() => {
		atTop = scrollY < 50;

		if (atTop) {
			visible = true;
		} else {
			visible = scrollY < lastScrollY; // Show on scroll up
		}
		lastScrollY = scrollY;
	});
</script>

<svelte:window bind:scrollY />

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out {visible
		? 'translate-y-0'
		: '-translate-y-full'} {atTop ? 'bg-transparent' : 'bg-nbrs-green'}"
>
	<nav class="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
		<a href="/" class="text-xl font-bold text-white">NBRS</a>
		<div class="flex gap-8">
			<a href="/mission" class="text-white">Mission</a>
			<a href="/partner" class="text-white">Partner</a>
		</div>
	</nav>
</header>
