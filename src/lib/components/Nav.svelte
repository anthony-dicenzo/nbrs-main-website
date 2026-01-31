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
	<nav class="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-6">
		<a href="/" class="text-lg font-bold text-white md:text-xl">NBRS</a>
		<div class="flex gap-4 md:gap-8">
			<a href="/mission" class="text-sm text-white md:text-base">Mission</a>
			<a href="/partner" class="text-sm text-white md:text-base">Partner</a>
		</div>
	</nav>
</header>
