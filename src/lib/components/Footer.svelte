<script lang="ts">
	import SocialIcons from './SocialIcons.svelte';

	const navLinks = [
		{ label: 'Contact', href: '/contact' },
		{ label: 'Mission', href: '/mission' },
		{ label: 'FAQs', href: '/faqs' },
		{ label: 'Partner', href: '/partner' }
	];
</script>

<footer>
	<!-- Top section: Cream background with tagline -->
	<div class="bg-amber-50 py-12 sm:py-16 md:py-20">
		<div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
			<p class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium italic text-amber-800 leading-tight">
				Built for families.<br class="hidden sm:block" /> Rooted in community.
			</p>
		</div>
	</div>

	<!-- Bottom section: Green background with large brand name -->
	<div class="bg-nbrs-green text-white">
		<div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
			<!-- Large brand text -->
			<div class="py-8 sm:py-12 md:py-16">
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
						<form
							action="https://formspree.io/f/FORM_ID"
							method="POST"
							class="flex items-center gap-2 border-b border-white/40 pb-1 focus-within:border-white transition-colors"
							aria-label="Newsletter signup"
						>
							<label for="footer-email" class="sr-only">Email address</label>
							<input
								type="email"
								id="footer-email"
								name="email"
								placeholder="Enter email"
								required
								autocomplete="email"
								class="w-28 sm:w-32 md:w-40 bg-transparent text-sm text-white outline-none placeholder:text-white/50 focus:placeholder:text-white/70 min-h-[44px]"
							/>
							<button
								type="submit"
								class="text-sm font-medium hover:opacity-80 transition-opacity min-h-[44px] px-2"
							>
								Sign up
							</button>
						</form>
					</div>
				</div>

				<!-- Copyright -->
				<div class="mt-6 sm:mt-8 text-xs sm:text-sm opacity-70">
					© Neighbourhood Scale, 2026
				</div>
			</div>
		</div>
	</div>
</footer>
