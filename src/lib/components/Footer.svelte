<script lang="ts">
	// Social media links (placeholders)
	const socialLinks = [
		{ name: 'LinkedIn', href: '#', icon: 'in' },
		{ name: 'X', href: '#', icon: 'X' },
		{ name: 'Instagram', href: '#', icon: 'ig' }
	];

	// Navigation links
	const navLinks = [
		{ name: 'Contact', href: '/contact' },
		{ name: 'Mission', href: '/mission' },
		{ name: 'FAQs', href: '/faqs' }
	];
</script>

<footer class="bg-nbrs-green py-12 md:py-16">
	<div class="mx-auto max-w-[1280px] px-4 md:px-6">
		<!-- Large brand heading -->
		<h2 class="mb-8 text-3xl font-bold text-white md:mb-12 md:text-4xl lg:text-6xl">
			Neighbourhood Scale
		</h2>

		<!-- Bottom section: two columns -->
		<div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
			<!-- Left: Social icons -->
			<div class="flex gap-4 md:gap-6">
				{#each socialLinks as link}
					<a
						href={link.href}
						aria-label={link.name}
						class="flex h-9 w-9 items-center justify-center rounded-full border border-white text-xs font-bold text-white transition-colors hover:bg-white hover:text-nbrs-green md:h-10 md:w-10 md:text-sm"
					>
						{link.icon}
					</a>
				{/each}
			</div>

			<!-- Right: Nav links + email signup -->
			<div class="flex flex-col gap-6 md:items-end">
				<!-- Nav links -->
				<nav class="flex flex-wrap gap-4 md:gap-6">
					{#each navLinks as link}
						<a href={link.href} class="text-sm text-white hover:underline md:text-base"
							>{link.name}</a
						>
					{/each}
				</nav>

				<!-- Email signup form -->
				<form
					action="https://formspree.io/f/FORM_ID"
					method="POST"
					class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
				>
					<input
						type="email"
						name="email"
						required
						placeholder="Enter your email"
						class="w-full rounded px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white sm:w-auto"
					/>
					<button
						type="submit"
						class="rounded bg-white px-4 py-2 font-semibold text-nbrs-green transition-colors hover:bg-gray-100"
					>
						Sign up
					</button>
				</form>
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-8 border-t border-white/30 pt-6 text-center text-sm text-white/80 md:mt-12">
			Neighbourhood Scale, 2026
		</div>
	</div>
</footer>
