<script lang="ts">
	let { text, class: className = '' }: { text: string; class?: string } = $props();
</script>

<span class="rollover-container relative inline-block overflow-hidden {className}">
	<!-- Invisible sizer to maintain width -->
	<span class="invisible">{text}</span>
	<!-- Visible text that slides up on hover -->
	<span
		class="absolute top-0 left-0 transition-transform duration-300 group-hover:-translate-y-full"
	>
		{text}
	</span>
	<!-- Text that slides in from below -->
	<span
		class="absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full"
	>
		{text}
	</span>
</span>
