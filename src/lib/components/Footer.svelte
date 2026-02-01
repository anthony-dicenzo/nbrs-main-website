<script lang="ts">
	import SocialIcons from './SocialIcons.svelte';

	const navLinks = [
		{ label: 'Contact', href: '/contact' },
		{ label: 'Mission', href: '/mission' },
		{ label: 'FAQs', href: '/faqs' }
	];
</script>

<footer class="bg-nbrs-green">
	<div class="mx-auto flex min-h-[320px] sm:min-h-[400px] max-w-[1440px] flex-col px-4 py-6 text-white sm:p-4 md:p-6">
		<!-- Spacer for top -->
		<div class="h-8 sm:h-16 md:h-20"></div>

		<!-- Large brand text (decorative, not a heading) -->
		<p class="text-3xl xs:text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl" aria-hidden="true">
			Neighbourhood<br class="hidden xs:block" /> Scale
		</p>

		<!-- Flexible spacer -->
		<div class="min-h-10 sm:min-h-16 flex-1"></div>

		<!-- Bottom section: social | nav + form | copyright -->
		<div class="flex flex-col gap-5 sm:gap-6">
			<!-- Row: Social icons, nav links, email form -->
			<div class="flex flex-col items-start gap-4 sm:gap-6 sm:flex-row sm:items-center">
				<!-- Social icons -->
				<SocialIcons />

				<!-- Spacer -->
				<div class="hidden flex-1 sm:block"></div>

				<!-- Nav links -->
				<nav aria-label="Footer" class="flex flex-row flex-wrap gap-4 text-sm sm:gap-6 md:gap-10">
					{#each navLinks as link}
						<a href={link.href} class="link-underline hover:opacity-80 min-h-[44px] flex items-center">
							{link.label}
						</a>
					{/each}
				</nav>

				<!-- Email signup form (hidden on mobile, shown sm+) -->
				<form
					action="https://formspree.io/f/FORM_ID"
					method="POST"
					class="hidden items-center gap-2 border-b border-white/60 pb-1 sm:flex focus-within:border-white"
					aria-label="Newsletter signup"
				>
					<label for="footer-email-desktop" class="sr-only">Email address</label>
					<input
						type="email"
						id="footer-email-desktop"
						name="email"
						placeholder="Enter email"
						required
						autocomplete="email"
						class="w-32 bg-transparent text-sm text-white outline-none placeholder:text-white/50 focus:placeholder:text-white/70 md:w-40 min-h-[44px]"
					/>
					<button type="submit" class="btn text-sm hover:opacity-80 min-h-[44px] px-3">
						Sign up
					</button>
				</form>
			</div>

			<!-- Mobile email form -->
			<form
				action="https://formspree.io/f/FORM_ID"
				method="POST"
				class="flex items-center gap-2 border-b border-white/60 pb-1 focus-within:border-white sm:hidden"
				aria-label="Newsletter signup"
			>
				<label for="footer-email-mobile" class="sr-only">Email address</label>
				<input
					type="email"
					id="footer-email-mobile"
					name="email"
					placeholder="Enter email"
					required
					autocomplete="email"
					class="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50 focus:placeholder:text-white/70 min-h-[44px]"
				/>
				<button type="submit" class="btn text-sm hover:opacity-80 min-h-[44px] px-3">
					Sign up
				</button>
			</form>

			<!-- Copyright -->
			<div class="text-xs sm:text-sm opacity-70">Neighbourhood Scale, 2026</div>
		</div>

		<!-- Bottom spacer -->
		<div class="h-4 sm:h-8 md:h-10"></div>
	</div>
</footer>
