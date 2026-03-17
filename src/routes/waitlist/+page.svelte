<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';

	interface WaitlistFormData {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		householdSize: string;
		neighbourhoods: string[];
		unitType: string;
	}

	let formData = $state<WaitlistFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		householdSize: '',
		neighbourhoods: [],
		unitType: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let fieldErrors = $state<Record<string, string>>({});
	let generalError = $state('');

	const householdSizes = [
		{ value: '1', label: '1 person' },
		{ value: '2', label: '2 people' },
		{ value: '3', label: '3 people' },
		{ value: '4', label: '4 people' },
		{ value: '5+', label: '5 or more' }
	];

	const neighbourhoods = [
		{ value: 'downtown', label: 'Downtown Toronto' },
		{ value: 'east-york', label: 'East York' },
		{ value: 'scarborough', label: 'Scarborough' },
		{ value: 'north-york', label: 'North York' },
		{ value: 'etobicoke', label: 'Etobicoke' },
		{ value: 'other-gta', label: 'Other GTA' },
		{ value: 'outside-gta', label: 'Outside GTA' }
	];

	const unitTypes = [
		{ value: '1-bed', label: '1 Bedroom' },
		{ value: '1-bed-den', label: '1 Bedroom + Den' },
		{ value: '2-bed', label: '2 Bedroom' },
		{ value: '3-bed', label: '3 Bedroom' },
		{ value: '3-bed-plus', label: '3+ Bedroom' },
		{ value: 'flexible', label: 'Flexible / No Preference' }
	];

	function toggleNeighbourhood(value: string) {
		if (formData.neighbourhoods.includes(value)) {
			formData.neighbourhoods = formData.neighbourhoods.filter(n => n !== value);
		} else {
			formData.neighbourhoods = [...formData.neighbourhoods, value];
		}
		clearFieldError('neighbourhoods');
	}

	function validateForm(): Record<string, string> {
		const errors: Record<string, string> = {};
		if (!formData.firstName.trim()) errors.firstName = 'First name is required';
		if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
		if (!formData.phone.trim()) errors.phone = 'Phone is required';
		if (!formData.householdSize) errors.householdSize = 'Please select household size';
		if (formData.neighbourhoods.length === 0) errors.neighbourhoods = 'Please select at least one neighbourhood';
		if (!formData.unitType) errors.unitType = 'Please select unit type';
		return errors;
	}

	function clearFieldError(field: string) {
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
			const response = await fetch('https://formspree.io/f/xykpbwjq', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					neighbourhoods: formData.neighbourhoods.join(', ')
				})
			});

			if (response.ok) {
				submitStatus = 'success';
				formData = {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					householdSize: '',
					neighbourhoods: [],
					unitType: ''
				};
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
	<title>FAMILY 1 Waitlist | Toronto 3-Bedroom Multiplex Rentals | NBRS</title>
	<meta name="description" content="Join the waitlist for FAMILY 1 — 3-bedroom multiplex rental homes in Toronto with real storage and outdoor space. Family-sized units by NBRS." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/waitlist" />
	<meta property="og:title" content="FAMILY 1 Waitlist | Toronto 3-Bedroom Multiplex Rentals | NBRS" />
	<meta property="og:description" content="Join the waitlist for FAMILY 1 — 3-bedroom multiplex rental homes in Toronto with real storage and outdoor space." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="FAMILY 1 Waitlist | Toronto 3-Bedroom Multiplex Rentals | NBRS" />
	<meta name="twitter:description" content="Join the waitlist for FAMILY 1 — 3-bedroom multiplex rental homes in Toronto with real storage and outdoor space." />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
</svelte:head>

<div class="bg-nbrs-green min-h-screen">
	<div class="h-[64px] md:h-[80px]"></div>

	<div class="max-w-[1440px] mx-auto px-4 md:px-6">
		<!-- Hero Title -->
		<h1
			class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] pt-4 pb-8 md:pb-12"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			Join the<br/>Waitlist
		</h1>

		<!-- Form Section -->
		<section aria-labelledby="waitlist-heading" class="pb-16 md:pb-24">
			<div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
				<!-- Left: Info -->
				<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
					<p class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed mb-8 md:mb-12">
						FAMILY 1 is our first project—six family-sized rental units designed from the ground up for families who need space to grow. Get early access to floor plans, pricing, and availability.
					</p>

					<div class="border-t border-white/20 pt-6 md:pt-8">
						<h3 class="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">What to Expect</h3>
						<ul class="space-y-3 md:space-y-4">
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span class="text-white/80">Early notification when units become available</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span class="text-white/80">Exclusive preview of floor plans and pricing</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span class="text-white/80">Priority application window before public release</span>
							</li>
						</ul>
					</div>
				</div>

				<!-- Right: Form -->
				<div use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
					{#if submitStatus === 'success'}
						<div class="flex flex-col items-center justify-center text-center py-12">
							<div class="w-14 h-14 mb-4 rounded-full bg-white/20 flex items-center justify-center">
								<svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h3 class="text-xl md:text-2xl font-bold text-white mb-2">Welcome to the NBRHOOD!</h3>
							<p class="text-white/70 mb-6">You're on the list. We'll reach out as soon as units become available.</p>
							<a
								href="/family-1"
								class="inline-flex items-center gap-2 bg-white text-nbrs-green px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
							>
								Learn More About FAMILY 1
							</a>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-4">
							<div class="grid sm:grid-cols-2 gap-4">
								<!-- First Name -->
								<div>
									<div class="border-b border-white/30 focus-within:border-white transition-colors">
										<input
											type="text"
											id="firstName"
											bind:value={formData.firstName}
											oninput={() => clearFieldError('firstName')}
											required
											class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
											placeholder="First Name *"
											aria-invalid={!!fieldErrors.firstName}
											aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
										/>
									</div>
									{#if fieldErrors.firstName}
										<p id="firstName-error" class="text-red-300 text-xs mt-1">{fieldErrors.firstName}</p>
									{/if}
								</div>

								<!-- Last Name -->
								<div>
									<div class="border-b border-white/30 focus-within:border-white transition-colors">
										<input
											type="text"
											id="lastName"
											bind:value={formData.lastName}
											oninput={() => clearFieldError('lastName')}
											required
											class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
											placeholder="Last Name *"
											aria-invalid={!!fieldErrors.lastName}
											aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
										/>
									</div>
									{#if fieldErrors.lastName}
										<p id="lastName-error" class="text-red-300 text-xs mt-1">{fieldErrors.lastName}</p>
									{/if}
								</div>
							</div>

							<!-- Email -->
							<div>
								<div class="border-b border-white/30 focus-within:border-white transition-colors">
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										oninput={() => clearFieldError('email')}
										required
										class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
										placeholder="Email *"
										aria-invalid={!!fieldErrors.email}
										aria-describedby={fieldErrors.email ? 'email-error' : undefined}
									/>
								</div>
								{#if fieldErrors.email}
									<p id="email-error" class="text-red-300 text-xs mt-1">{fieldErrors.email}</p>
								{/if}
							</div>

							<!-- Phone -->
							<div>
								<div class="border-b border-white/30 focus-within:border-white transition-colors">
									<input
										type="tel"
										id="phone"
										bind:value={formData.phone}
										oninput={() => clearFieldError('phone')}
										required
										class="w-full bg-transparent py-2 text-white placeholder-white/50 focus:outline-none"
										placeholder="Phone *"
										aria-invalid={!!fieldErrors.phone}
										aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
									/>
								</div>
								{#if fieldErrors.phone}
									<p id="phone-error" class="text-red-300 text-xs mt-1">{fieldErrors.phone}</p>
								{/if}
							</div>

							<div class="grid sm:grid-cols-2 gap-4">
								<!-- Household Size -->
								<div>
									<div class="border-b border-white/30 focus-within:border-white transition-colors flex">
										<select
											id="householdSize"
											bind:value={formData.householdSize}
											onchange={() => clearFieldError('householdSize')}
											required
											class="flex-1 bg-transparent py-2 text-white focus:outline-none appearance-none cursor-pointer {formData.householdSize === '' ? 'text-white/50' : ''}"
											aria-invalid={!!fieldErrors.householdSize}
											aria-describedby={fieldErrors.householdSize ? 'householdSize-error' : undefined}
										>
											<option value="" class="text-gray-900">Household Size *</option>
											{#each householdSizes as size}
												<option value={size.value} class="text-gray-900">{size.label}</option>
											{/each}
										</select>
										<svg class="w-4 h-4 text-white/50 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
									{#if fieldErrors.householdSize}
										<p id="householdSize-error" class="text-red-300 text-xs mt-1">{fieldErrors.householdSize}</p>
									{/if}
								</div>

								<!-- Unit Type -->
								<div>
									<div class="border-b border-white/30 focus-within:border-white transition-colors flex">
										<select
											id="unitType"
											bind:value={formData.unitType}
											onchange={() => clearFieldError('unitType')}
											required
											class="flex-1 bg-transparent py-2 text-white focus:outline-none appearance-none cursor-pointer {formData.unitType === '' ? 'text-white/50' : ''}"
											aria-invalid={!!fieldErrors.unitType}
											aria-describedby={fieldErrors.unitType ? 'unitType-error' : undefined}
										>
											<option value="" class="text-gray-900">Preferred Unit Type *</option>
											{#each unitTypes as unit}
												<option value={unit.value} class="text-gray-900">{unit.label}</option>
											{/each}
										</select>
										<svg class="w-4 h-4 text-white/50 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
									{#if fieldErrors.unitType}
										<p id="unitType-error" class="text-red-300 text-xs mt-1">{fieldErrors.unitType}</p>
									{/if}
								</div>
							</div>

							<!-- Neighbourhoods (multi-select checkboxes) -->
							<fieldset>
								<legend class="text-white/80 text-sm mb-3">Neighbourhoods You Would Love to Live In *</legend>
								<div class="grid grid-cols-2 gap-2">
									{#each neighbourhoods as area}
										<label class="flex items-center gap-2 cursor-pointer group">
											<div
												class="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors {formData.neighbourhoods.includes(area.value) ? 'bg-white border-white' : 'border-white/40 group-hover:border-white/70'}"
											>
												{#if formData.neighbourhoods.includes(area.value)}
													<svg class="w-3 h-3 text-nbrs-green" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
													</svg>
												{/if}
											</div>
											<input
												type="checkbox"
												value={area.value}
												checked={formData.neighbourhoods.includes(area.value)}
												onchange={() => toggleNeighbourhood(area.value)}
												class="sr-only"
											/>
											<span class="text-white/80 text-sm group-hover:text-white transition-colors">{area.label}</span>
										</label>
									{/each}
								</div>
								{#if fieldErrors.neighbourhoods}
									<p class="text-red-300 text-xs mt-1">{fieldErrors.neighbourhoods}</p>
								{/if}
							</fieldset>

							{#if submitStatus === 'error' && generalError}
								<p class="text-red-300 text-sm">{generalError}</p>
							{:else if submitStatus === 'error'}
								<p class="text-red-300 text-sm">
									Something went wrong. Please try again or email us at <a href="mailto:waitlist@nbrs.ca" class="underline">waitlist@nbrs.ca</a>
								</p>
							{/if}

							<div class="pt-2">
								<button
									type="submit"
									disabled={isSubmitting}
									class="w-full inline-flex items-center justify-center gap-2 bg-white text-nbrs-green px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 min-h-[48px]"
								>
									{#if isSubmitting}
										<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span>Joining...</span>
									{:else}
										Join Waitlist
									{/if}
								</button>
							</div>

							<p class="text-xs text-white/50 text-center">
								By joining, you agree to receive occasional updates about FAMILY 1. We respect your privacy and will never share your information.
							</p>
						</form>
					{/if}
				</div>
			</div>
		</section>

		<div class="h-8 md:h-12"></div>
	</div>
</div>
