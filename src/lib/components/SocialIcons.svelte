<script lang="ts">
	const socials = [
		{ name: 'LinkedIn', href: 'https://linkedin.com/company/nbrs', icon: '/icons/social-linkedin.svg' },
		{ name: 'X', href: 'https://x.com/nbrs', icon: '/icons/social-x.svg' },
		{ name: 'Instagram', href: 'https://instagram.com/nbrs', icon: '/icons/social-instagram.svg' }
	];
</script>

<div class="flex items-center gap-6">
	{#each socials as social}
		<a
			href={social.href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={social.name}
			class="social-icon opacity-80"
		>
			<img src={social.icon} width="18" height="18" alt="" class="invert" />
		</a>
	{/each}
</div>
