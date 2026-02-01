<script lang="ts">
	import Logo from './Logo.svelte';
	import Rollover from './Rollover.svelte';

	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let visible = $state(true);

	$effect(() => {
		const atTop = scrollY < 50;
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
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-nbrs-green focus:px-4 focus:py-2 focus:text-white"
>
	Skip to main content
</a>

<!-- Nav container - always green background -->
<header
	class="pointer-events-none fixed top-0 right-0 left-0 z-50 bg-nbrs-green transition-transform duration-300"
	class:translate-y-0={visible}
	class:-translate-y-full={!visible}
>
	<div class="pointer-events-none relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 md:h-20 md:px-6">
		<!-- Logo - white on green -->
		<a
			href="/"
			aria-label="Home"
			class="pointer-events-auto"
		>
			<Logo variant="white" />
		</a>

		<!-- Nav links - aligned with logo -->
		<nav
			aria-label="Main"
			class="pointer-events-auto flex items-center gap-2 sm:gap-3"
		>
			<!-- Mission - white outlined pill -->
			<a
				href="/mission"
				class="group hidden xs:inline-flex items-center rounded-full border border-white/60 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 min-h-[44px]"
			>
				<Rollover text="Mission" />
			</a>

			<!-- Partner - white solid pill with green text -->
			<a
				href="/partner"
				class="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-nbrs-green transition-all hover:bg-white/90 hover:shadow-md min-h-[44px]"
			>
				<Rollover text="Partner" />
				<svg
					width="12"
					height="10"
					viewBox="0 0 12 10"
					fill="currentColor"
					class="icon-arrow"
					aria-hidden="true"
				>
					<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
				</svg>
			</a>
		</nav>
	</div>
</header>
