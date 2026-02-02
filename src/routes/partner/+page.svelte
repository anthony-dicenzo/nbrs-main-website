<script lang="ts">
	interface PartnerFormData {
		name: string;
		email: string;
		organization: string;
		partnerType: string;
		message: string;
	}

	let formData = $state<PartnerFormData>({
		name: '',
		email: '',
		organization: '',
		partnerType: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let fieldErrors = $state<Record<string, string>>({});
	let generalError = $state('');

	const partnerTypes = [
		{ value: 'investor', label: 'Accredited Investor' },
		{ value: 'landowner', label: 'Landowner' },
		{ value: 'broker', label: 'Broker with Sites' },
		{ value: 'nonprofit', label: 'Nonprofit Organization' },
		{ value: 'municipality', label: 'Municipality / Government' },
		{ value: 'other', label: 'Other' }
	];

	function validateForm(): Record<string, string> {
		const errors: Record<string, string> = {};
		if (!formData.name.trim()) errors.name = 'Name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
		if (!formData.partnerType) errors.partnerType = 'Please select a partner type';
		return errors;
	}

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

		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			fieldErrors = errors;
			isSubmitting = false;
			return;
		}

		try {
			const response = await fetch('https://formspree.io/f/xlglobnk', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitStatus = 'success';
				formData = { name: '', email: '', organization: '', partnerType: '', message: '' };
			} else {
				submitStatus = 'error';
				generalError = 'Something went wrong. Please try again.';
			}
		} catch {
			submitStatus = 'error';
			generalError = 'Something went wrong. Please try again.';
		}

		isSubmitting = false;
	}
</script>

<svelte:head>
	<title>Partner With NBRS | Investment & Partnership Opportunities</title>
	<meta name="description" content="Join NBRS in building quality rental housing at the neighbourhood scale." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/partner" />
	<meta property="og:title" content="Partner With NBRS | Investment & Partnership Opportunities" />
	<meta property="og:description" content="Join NBRS in building quality rental housing at the neighbourhood scale. We're looking for investors, landowners, brokers, and nonprofits." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Partner With NBRS" />
	<meta name="twitter:description" content="Join NBRS in building quality rental housing at the neighbourhood scale." />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
</svelte:head>

<!-- Single screen layout - no scroll needed -->
<div class="bg-nbrs-green min-h-screen flex flex-col">
	<!-- Spacer for nav -->
	<div class="h-[64px] md:h-[80px]"></div>

	<div class="flex-1 max-w-[1440px] mx-auto px-4 md:px-6 w-full py-8 md:py-12 flex flex-col">
		<!-- Header -->
		<div class="mb-8 md:mb-12">
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95]">
				Build With Us
			</h1>
		</div>

		<!-- Main content grid -->
		<div class="flex-1 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
			<!-- Left: Partner info -->
			<div class="flex flex-col justify-between">
				<div>
					<p class="text-lg md:text-xl text-white/80 mb-8">
						We're looking for partners who share our vision of quality rental housing at the neighbourhood scale.
					</p>

					<!-- Partner types - compact list -->
					<div class="space-y-3 mb-8">
						<p class="text-white"><span class="font-bold">Investors</span> <span class="text-white/60">· stable returns with social impact</span></p>
						<p class="text-white"><span class="font-bold">Landowners</span> <span class="text-white/60">· underutilized parcels</span></p>
						<p class="text-white"><span class="font-bold">Brokers</span> <span class="text-white/60">· off-market or as-of-right sites</span></p>
						<p class="text-white"><span class="font-bold">Nonprofits</span> <span class="text-white/60">· expand community housing</span></p>
					</div>
				</div>

				<!-- Email -->
				<div class="hidden md:block">
					<p class="text-white/60 text-sm mb-1">Or email us directly</p>
					<a href="mailto:hello@nbrs.ca" class="text-white text-lg hover:underline">hello@nbrs.ca</a>
				</div>
			</div>

			<!-- Right: Form -->
			<div>
				{#if submitStatus === 'success'}
					<div class="flex flex-col items-center justify-center h-full text-center py-8">
						<div class="w-12 h-12 mb-4 rounded-full bg-white/20 flex items-center justify-center">
							<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<p class="text-xl font-bold text-white">Thank you</p>
						<p class="text-white/70">We'll be in touch soon.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-4">
						<div class="grid sm:grid-cols-2 gap-4">
							<!-- Name -->
							<div>
								<div class="border-b border-white/30 focus-within:border-white transition-colors">
									<input
										type="text"
										bind:value={formData.name}
										oninput={() => clearFieldError('name')}
										required
										class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
										placeholder="Name *"
									/>
								</div>
								{#if fieldErrors.name}<p class="text-red-300 text-xs mt-1">{fieldErrors.name}</p>{/if}
							</div>

							<!-- Email -->
							<div>
								<div class="border-b border-white/30 focus-within:border-white transition-colors">
									<input
										type="email"
										bind:value={formData.email}
										oninput={() => clearFieldError('email')}
										required
										class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
										placeholder="Email *"
									/>
								</div>
								{#if fieldErrors.email}<p class="text-red-300 text-xs mt-1">{fieldErrors.email}</p>{/if}
							</div>
						</div>

						<div class="grid sm:grid-cols-2 gap-4">
							<!-- Organization -->
							<div>
								<div class="border-b border-white/30 focus-within:border-white transition-colors">
									<input
										type="text"
										bind:value={formData.organization}
										class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
										placeholder="Organization"
									/>
								</div>
							</div>

							<!-- Partner Type -->
							<div>
								<div class="border-b border-white/30 focus-within:border-white transition-colors flex">
									<select
										bind:value={formData.partnerType}
										onchange={() => clearFieldError('partnerType')}
										required
										class="flex-1 bg-transparent py-2 text-white focus:outline-none appearance-none cursor-pointer {formData.partnerType === '' ? 'text-white/50' : ''}"
									>
										<option value="" class="text-gray-900">Type *</option>
										{#each partnerTypes as type}
											<option value={type.value} class="text-gray-900">{type.label}</option>
										{/each}
									</select>
									<svg class="w-4 h-4 text-white/50 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</div>
								{#if fieldErrors.partnerType}<p class="text-red-300 text-xs mt-1">{fieldErrors.partnerType}</p>{/if}
							</div>
						</div>

						<!-- Message -->
						<div>
							<div class="border-b border-white/30 focus-within:border-white transition-colors">
								<textarea
									bind:value={formData.message}
									rows="2"
									class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none resize-none"
									placeholder="Tell us about your interest"
								></textarea>
							</div>
						</div>

						{#if submitStatus === 'error'}
							<p class="text-red-300 text-sm">{generalError || 'Something went wrong. Please try again.'}</p>
						{/if}

						<!-- Submit -->
						<div class="pt-2">
							<button
								type="submit"
								disabled={isSubmitting}
								class="inline-flex items-center gap-2 text-white font-semibold hover:opacity-80 transition-opacity disabled:opacity-50"
							>
								{#if isSubmitting}
									<span>Sending...</span>
								{:else}
									<span>Send message</span>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
									</svg>
								{/if}
							</button>
						</div>
					</form>

					<!-- Mobile email -->
					<div class="md:hidden mt-8 pt-6 border-t border-white/20">
						<p class="text-white/60 text-sm mb-1">Or email us directly</p>
						<a href="mailto:hello@nbrs.ca" class="text-white hover:underline">hello@nbrs.ca</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
