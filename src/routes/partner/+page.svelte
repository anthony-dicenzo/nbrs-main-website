<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';
	import {
		submitPartnerForm,
		validatePartnerForm,
		type PartnerFormData,
		type ValidationErrors
	} from '$lib/utils/hubspot';

	// Form state using Svelte 5 runes
	let formData = $state<PartnerFormData>({
		name: '',
		email: '',
		organization: '',
		partnerType: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let fieldErrors = $state<ValidationErrors>({});
	let generalError = $state('');

	const partnerTypes = [
		{ value: 'investor', label: 'Investor' },
		{ value: 'nonprofit', label: 'Nonprofit Organization' },
		{ value: 'landowner', label: 'Landowner' },
		{ value: 'municipality', label: 'Municipality / Government' },
		{ value: 'other', label: 'Other' }
	];

	// Partnership benefits
	const benefits = [
		{
			icon: 'chart',
			title: 'Stable Returns',
			description: 'Long-term rental income from quality housing in established neighbourhoods.'
		},
		{
			icon: 'community',
			title: 'Community Impact',
			description: 'Create housing that serves families and strengthens neighbourhoods.'
		},
		{
			icon: 'scale',
			title: 'Scalable Model',
			description: 'A proven approach that can expand across multiple sites and markets.'
		}
	];

	// Clear field error when user starts typing
	function clearFieldError(field: keyof PartnerFormData) {
		if (fieldErrors[field]) {
			fieldErrors = { ...fieldErrors, [field]: '' };
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';
		fieldErrors = {};
		generalError = '';

		// Client-side validation first
		const errors = validatePartnerForm(formData);
		if (Object.keys(errors).length > 0) {
			fieldErrors = errors;
			isSubmitting = false;
			return;
		}

		// Submit to HubSpot
		const result = await submitPartnerForm(formData);

		if (result.success) {
			submitStatus = 'success';
			formData = { name: '', email: '', organization: '', partnerType: '', message: '' };
		} else {
			submitStatus = 'error';
			if (result.errors) {
				fieldErrors = result.errors;
			}
			if (result.message) {
				generalError = result.message;
			}
		}

		isSubmitting = false;
	}
</script>

<svelte:head>
	<title>Partner With NBRS | Investment & Partnership Opportunities</title>
	<meta name="description" content="Join NBRS in building quality rental housing. Investment opportunities, partnership programs for nonprofits, landowners, and municipalities." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-24 md:py-32 bg-nbrs-green text-white overflow-hidden">
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
		<div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
	</div>
	<div class="relative max-w-6xl mx-auto px-6">
		<div class="max-w-3xl" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<span class="text-white/80 font-semibold text-sm tracking-wider uppercase mb-4 block">
				Partnership Opportunities
			</span>
			<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
				Build Housing<br />That Works
			</h1>
			<p class="text-xl md:text-2xl font-light opacity-90 max-w-2xl">
				We're looking for partners who share our vision of quality rental housing at the neighbourhood scale.
			</p>
		</div>
	</div>
</section>

<!-- Why Partner Section -->
<section class="py-20 md:py-28 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center mb-16" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-4 block">
				Why Partner With Us
			</span>
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
				Mission-Aligned Investment
			</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				NBRS creates quality rental housing that generates stable returns while addressing the housing crisis in meaningful ways.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 md:gap-12">
			{#each benefits as benefit, i}
				<div
					class="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
					use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: i * 0.15 }}
				>
					<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-nbrs-green/10 flex items-center justify-center">
						{#if benefit.icon === 'chart'}
							<svg class="w-8 h-8 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
							</svg>
						{:else if benefit.icon === 'community'}
							<svg class="w-8 h-8 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						{:else}
							<svg class="w-8 h-8 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
							</svg>
						{/if}
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
					<p class="text-gray-600 leading-relaxed">{benefit.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Who We Work With Section -->
<section class="py-20 md:py-28 bg-gray-50">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-4 block">
					Who We Work With
				</span>
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
					Partners at Every Scale
				</h2>
				<div class="space-y-6">
					<div class="flex gap-4">
						<div class="w-12 h-12 rounded-full bg-nbrs-green/10 flex items-center justify-center flex-shrink-0">
							<span class="text-nbrs-green font-bold">1</span>
						</div>
						<div>
							<h3 class="font-bold text-gray-900 mb-1">Impact Investors</h3>
							<p class="text-gray-600">Seeking stable returns with measurable social impact in the housing sector.</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 rounded-full bg-nbrs-green/10 flex items-center justify-center flex-shrink-0">
							<span class="text-nbrs-green font-bold">2</span>
						</div>
						<div>
							<h3 class="font-bold text-gray-900 mb-1">Nonprofit Organizations</h3>
							<p class="text-gray-600">Looking to expand affordable housing in the communities you serve.</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 rounded-full bg-nbrs-green/10 flex items-center justify-center flex-shrink-0">
							<span class="text-nbrs-green font-bold">3</span>
						</div>
						<div>
							<h3 class="font-bold text-gray-900 mb-1">Landowners</h3>
							<p class="text-gray-600">With underutilized parcels ready for sensitive, community-friendly development.</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 rounded-full bg-nbrs-green/10 flex items-center justify-center flex-shrink-0">
							<span class="text-nbrs-green font-bold">4</span>
						</div>
						<div>
							<h3 class="font-bold text-gray-900 mb-1">Municipalities</h3>
							<p class="text-gray-600">Committed to adding quality rental housing without changing neighbourhood character.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-white rounded-2xl p-8 shadow-lg" use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
				<div class="text-center mb-8">
					<h3 class="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h3>
					<p class="text-gray-600">Tell us about your partnership interests.</p>
				</div>

				{#if submitStatus === 'success'}
					<div class="text-center py-8">
						<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-nbrs-green/10 flex items-center justify-center">
							<svg class="w-8 h-8 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h4 class="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
						<p class="text-gray-600">We'll be in touch soon to discuss partnership opportunities.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-4">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								oninput={() => clearFieldError('name')}
								required
								class="form-input {fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								placeholder="Your name"
								aria-invalid={!!fieldErrors.name}
								aria-describedby={fieldErrors.name ? 'name-error' : undefined}
							/>
							{#if fieldErrors.name}
								<p id="name-error" class="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
							{/if}
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								oninput={() => clearFieldError('email')}
								required
								class="form-input {fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								placeholder="you@example.com"
								aria-invalid={!!fieldErrors.email}
								aria-describedby={fieldErrors.email ? 'email-error' : undefined}
							/>
							{#if fieldErrors.email}
								<p id="email-error" class="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
							{/if}
						</div>
						<div>
							<label for="organization" class="block text-sm font-medium text-gray-700 mb-1">Organization</label>
							<input
								type="text"
								id="organization"
								bind:value={formData.organization}
								class="form-input"
								placeholder="Your organization (optional)"
							/>
						</div>
						<div>
							<label for="partnerType" class="block text-sm font-medium text-gray-700 mb-1">Partnership Type *</label>
							<select
								id="partnerType"
								bind:value={formData.partnerType}
								onchange={() => clearFieldError('partnerType')}
								required
								class="form-input {fieldErrors.partnerType ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								aria-invalid={!!fieldErrors.partnerType}
								aria-describedby={fieldErrors.partnerType ? 'partnerType-error' : undefined}
							>
								<option value="">Select an option</option>
								{#each partnerTypes as type}
									<option value={type.value}>{type.label}</option>
								{/each}
							</select>
							{#if fieldErrors.partnerType}
								<p id="partnerType-error" class="text-red-600 text-sm mt-1">{fieldErrors.partnerType}</p>
							{/if}
						</div>
						<div>
							<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								rows="4"
								class="form-input resize-none"
								placeholder="Tell us about your interest in partnering with NBRS"
							></textarea>
						</div>

						{#if submitStatus === 'error' && generalError}
							<div class="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
								{generalError}
							</div>
						{:else if submitStatus === 'error'}
							<div class="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
								Something went wrong. Please try again or email us directly at <a href="mailto:partner@nbrs.ca" class="underline">partner@nbrs.ca</a>
							</div>
						{/if}

						<button
							type="submit"
							disabled={isSubmitting}
							class="btn btn-primary w-full py-3 rounded-lg font-semibold text-lg {isSubmitting ? 'loading' : ''}"
						>
							{#if isSubmitting}
								<span class="inline-flex items-center gap-2">
									<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Sending...
								</span>
							{:else}
								Send Message
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-16 md:py-24 bg-white">
	<div class="max-w-4xl mx-auto px-6 text-center" use:scrollReveal={{ type: 'fade', duration: 0.8 }}>
		<p class="text-lg text-gray-600 mb-6">
			Prefer to reach out directly?
		</p>
		<a
			href="mailto:partner@nbrs.ca"
			class="text-nbrs-green text-xl md:text-2xl font-semibold hover:underline"
		>
			partner@nbrs.ca
		</a>
	</div>
</section>
