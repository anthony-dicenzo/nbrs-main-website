<script lang="ts">
	let { variant = 'color', class: className = '' }: { variant?: 'color' | 'white'; class?: string } =
		$props();

	const src = variant === 'white' ? '/images/logo-white.svg' : '/images/logo.svg';
</script>

<img {src} alt="NBRS - Neighbourhood Scale" width="80" height="32" class={className} />
