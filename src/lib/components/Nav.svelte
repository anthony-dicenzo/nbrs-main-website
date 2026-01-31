<script lang="ts">
	import Logo from './Logo.svelte';
	import Rollover from './Rollover.svelte';

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

<!-- Skip to content link for accessibility -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-nbrs-green"
>
	Skip to main content
</a>

<!-- Nav container -->
<div
	class="pointer-events-none fixed top-0 right-0 left-0 z-50 transition-transform duration-300"
	class:translate-y-0={visible}
	class:-translate-y-full={!visible}
>
	<div class="pointer-events-none relative mx-auto w-full max-w-[1440px]">
		<!-- Logo -->
		<a
			href="/"
			aria-label="Home"
			class="pointer-events-auto absolute top-4 left-4 md:top-6 md:left-6"
		>
			<Logo variant={atTop ? 'white' : 'color'} />
		</a>

		<!-- Nav links -->
		<nav
			aria-label="Main"
			class="pointer-events-auto absolute top-4 right-4 flex items-center gap-3 md:top-6 md:right-6"
		>
			<!-- Mission - outlined pill with backdrop blur -->
			<a
				href="/mission"
				class="group flex rounded-full border border-white/60 bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/30"
			>
				<Rollover text="Mission" />
			</a>

			<!-- Partner - solid pill -->
			<a
				href="/partner"
				class="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-nbrs-green transition-colors hover:bg-gray-100"
			>
				<Rollover text="Partner" />
				<svg
					width="12"
					height="10"
					viewBox="0 0 12 10"
					fill="currentColor"
					class="transition-transform group-hover:translate-x-0.5"
				>
					<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
				</svg>
			</a>
		</nav>
	</div>

	<!-- Background that fades in when scrolled -->
	<div
		class="absolute inset-0 -z-10 bg-white shadow-sm transition-opacity duration-300"
		class:opacity-0={atTop}
		class:opacity-100={!atTop}
	></div>
</div>
