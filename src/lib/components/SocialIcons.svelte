<script lang="ts">
	const socials = [
		{ name: 'LinkedIn', icon: '/icons/social-linkedin.svg' },
		{ name: 'X', icon: '/icons/social-x.svg' },
		{ name: 'Instagram', icon: '/icons/social-instagram.svg' }
	];
</script>

<div class="flex items-center gap-6">
	{#each socials as social}
		<span class="opacity-50" aria-label={social.name}>
			<img src={social.icon} width="18" height="18" alt="" class="invert" />
		</span>
	{/each}
</div>
