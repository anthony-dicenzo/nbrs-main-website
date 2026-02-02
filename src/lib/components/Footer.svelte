<script lang="ts">
	import SocialIcons from './SocialIcons.svelte';

	const navLinks = [
		{ label: 'Contact', href: '/partner' },
		{ label: 'Mission', href: '/mission' },
		{ label: 'FAQs', href: '/faqs' }
	];

	let email = $state('');
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || status === 'submitting') return;

		status = 'submitting';

		try {
			const response = await fetch('https://formspree.io/f/mreloqkl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			if (response.ok) {
				status = 'success';
				email = '';
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}
</script>

<footer>
	<!-- Top section: White background with tagline -->
	<div class="bg-white py-8 sm:py-10 md:py-12">
		<div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
			<p class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight">
				Built for families.<br class="hidden sm:block" /> Rooted in community.
			</p>
		</div>
	</div>

	<!-- Bottom section: Green background with large brand name -->
	<div class="bg-nbrs-green text-white">
		<div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
			<!-- Large brand text -->
			<div class="py-6 sm:py-8 md:py-12">
				<p
					class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight"
					aria-hidden="true"
				>
					Neighbourhood<br />Scale
				</p>
			</div>

			<!-- Bottom bar: social, nav, email, copyright -->
			<div class="border-t border-white/20 py-6 sm:py-8">
				<div class="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
					<!-- Left: Social icons -->
					<div class="order-2 sm:order-1">
						<SocialIcons />
					</div>

					<!-- Right: Nav links and email form -->
					<div class="order-1 sm:order-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
						<!-- Nav links -->
						<nav aria-label="Footer" class="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-sm">
							{#each navLinks as link}
								<a
									href={link.href}
									class="hover:opacity-80 transition-opacity min-h-[44px] flex items-center"
								>
									{link.label}
								</a>
							{/each}
						</nav>

						<!-- Email signup -->
						{#if status === 'success'}
							<div class="flex items-center gap-2 text-sm text-white/90 min-h-[44px]">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span>You're signed up!</span>
							</div>
						{:else}
							<form
								onsubmit={handleSubmit}
								class="flex items-center gap-2 border-b border-white/40 pb-1 focus-within:border-white transition-colors"
								aria-label="Newsletter signup"
							>
								<label for="footer-email" class="sr-only">Email address</label>
								<input
									type="email"
									id="footer-email"
									bind:value={email}
									placeholder="Enter email"
									required
									autocomplete="email"
									disabled={status === 'submitting'}
									class="w-28 sm:w-32 md:w-40 bg-transparent text-sm text-white outline-none placeholder:text-white/50 focus:placeholder:text-white/70 min-h-[44px] disabled:opacity-50"
								/>
								<button
									type="submit"
									disabled={status === 'submitting'}
									class="text-sm font-medium hover:opacity-80 transition-opacity min-h-[44px] px-2 disabled:opacity-50"
								>
									{#if status === 'submitting'}
										...
									{:else if status === 'error'}
										Retry
									{:else}
										Sign up
									{/if}
								</button>
							</form>
						{/if}
					</div>
				</div>

				<!-- Copyright -->
				<div class="mt-6 sm:mt-8 text-xs sm:text-sm opacity-70">
					© NBRS Developments Inc., 2026
				</div>
			</div>
		</div>
	</div>
</footer>
