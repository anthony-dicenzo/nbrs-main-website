<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';
	import {
		submitWaitlistForm,
		validateWaitlistForm,
		type WaitlistFormData,
		type ValidationErrors
	} from '$lib/utils/hubspot';

	// Form state using Svelte 5 runes
	let formData = $state<WaitlistFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		householdSize: '',
		neighbourhood: '',
		unitType: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let fieldErrors = $state<ValidationErrors>({});
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
		{ value: '2-bed', label: '2 Bedroom' },
		{ value: '3-bed', label: '3 Bedroom' },
		{ value: '3-bed-plus', label: '3+ Bedroom' },
		{ value: 'flexible', label: 'Flexible / No Preference' }
	];

	// Features of FAMILY 1 units
	const features = [
		{ icon: 'bedroom', title: '3 Bedrooms', description: 'Real family-sized units' },
		{ icon: 'storage', title: 'Storage Space', description: 'Room for life to happen' },
		{ icon: 'outdoor', title: 'Outdoor Access', description: 'Private outdoor space' },
		{ icon: 'community', title: 'Vibrant Area', description: 'Established neighbourhood' }
	];

	// Clear field error when user starts typing
	function clearFieldError(field: keyof WaitlistFormData) {
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
		const errors = validateWaitlistForm(formData);
		if (Object.keys(errors).length > 0) {
			fieldErrors = errors;
			isSubmitting = false;
			return;
		}

		// Submit to HubSpot
		const result = await submitWaitlistForm(formData);

		if (result.success) {
			submitStatus = 'success';
			formData = {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				householdSize: '',
				neighbourhood: '',
				unitType: ''
			};
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
	<title>Join the FAMILY 1 Waitlist | NBRS</title>
	<meta name="description" content="Be first to know about FAMILY 1 - six family-sized rental units in Toronto. Join the waitlist for 3-bedroom homes designed for families." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-24 md:py-32 bg-gray-900 text-white overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-1/4 right-1/4 w-96 h-96 bg-nbrs-green rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-nbrs-green rounded-full blur-3xl"></div>
	</div>
	<div class="relative max-w-6xl mx-auto px-6">
		<div class="max-w-3xl" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<span class="inline-block bg-nbrs-green text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
				Coming 2026
			</span>
			<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
				FAMILY 1<br />Waitlist
			</h1>
			<p class="text-xl md:text-2xl font-light opacity-90 max-w-2xl">
				Six family-sized rental units in a vibrant Toronto neighbourhood. Three-bedroom homes with real storage and outdoor space.
			</p>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-16 md:py-20 bg-white border-b border-gray-100">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
			{#each features as feature, i}
				<div
					class="text-center"
					use:scrollReveal={{ type: 'slide-up', duration: 0.6, delay: i * 0.1 }}
				>
					<div class="w-14 h-14 mx-auto mb-4 rounded-full bg-nbrs-green/10 flex items-center justify-center">
						{#if feature.icon === 'bedroom'}
							<svg class="w-7 h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
							</svg>
						{:else if feature.icon === 'storage'}
							<svg class="w-7 h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
							</svg>
						{:else if feature.icon === 'outdoor'}
							<svg class="w-7 h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
							</svg>
						{:else}
							<svg class="w-7 h-7 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						{/if}
					</div>
					<h3 class="font-bold text-gray-900 mb-1">{feature.title}</h3>
					<p class="text-sm text-gray-600">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Waitlist Form Section -->
<section class="py-20 md:py-28 bg-gray-50">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
			<div use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
				<span class="text-nbrs-green font-semibold text-sm tracking-wider uppercase mb-4 block">
					Join the Waitlist
				</span>
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
					Be First to Know
				</h2>
				<p class="text-lg text-gray-600 mb-6">
					FAMILY 1 is our first project—six family-sized rental units designed from the ground up for families who need space to grow.
				</p>
				<p class="text-lg text-gray-600 mb-6">
					Join the waitlist to get early access to floor plans, pricing, and availability updates. No commitment required.
				</p>

				<div class="bg-white rounded-xl p-6 border border-gray-200">
					<h3 class="font-bold text-gray-900 mb-4">What to Expect</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<svg class="w-5 h-5 text-nbrs-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-gray-600">Early notification when units become available</span>
						</li>
						<li class="flex items-start gap-3">
							<svg class="w-5 h-5 text-nbrs-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-gray-600">Exclusive preview of floor plans and pricing</span>
						</li>
						<li class="flex items-start gap-3">
							<svg class="w-5 h-5 text-nbrs-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-gray-600">Priority application window before public release</span>
						</li>
						<li class="flex items-start gap-3">
							<svg class="w-5 h-5 text-nbrs-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-gray-600">Updates on construction progress and timeline</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="bg-white rounded-2xl p-8 shadow-lg" use:scrollReveal={{ type: 'fade', duration: 1, delay: 0.2 }}>
				{#if submitStatus === 'success'}
					<div class="text-center py-8">
						<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-nbrs-green/10 flex items-center justify-center">
							<svg class="w-8 h-8 text-nbrs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">You're on the List!</h3>
						<p class="text-gray-600 mb-6">We'll reach out as soon as units become available. Thank you for your interest in FAMILY 1.</p>
						<a
							href="/family-1"
							class="btn btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-nbrs-green border-nbrs-green"
						>
							Learn More About FAMILY 1
						</a>
					</div>
				{:else}
					<h3 class="text-2xl font-bold text-gray-900 mb-6">Join the Waitlist</h3>
					<form onsubmit={handleSubmit} class="space-y-4">
						<div class="grid sm:grid-cols-2 gap-4">
							<div>
								<label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
								<input
									type="text"
									id="firstName"
									bind:value={formData.firstName}
									oninput={() => clearFieldError('firstName')}
									required
									class="form-input {fieldErrors.firstName ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
									placeholder="First name"
									aria-invalid={!!fieldErrors.firstName}
									aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
								/>
								{#if fieldErrors.firstName}
									<p id="firstName-error" class="text-red-600 text-sm mt-1">{fieldErrors.firstName}</p>
								{/if}
							</div>
							<div>
								<label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
								<input
									type="text"
									id="lastName"
									bind:value={formData.lastName}
									oninput={() => clearFieldError('lastName')}
									required
									class="form-input {fieldErrors.lastName ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
									placeholder="Last name"
									aria-invalid={!!fieldErrors.lastName}
									aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
								/>
								{#if fieldErrors.lastName}
									<p id="lastName-error" class="text-red-600 text-sm mt-1">{fieldErrors.lastName}</p>
								{/if}
							</div>
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
							<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
							<input
								type="tel"
								id="phone"
								bind:value={formData.phone}
								oninput={() => clearFieldError('phone')}
								required
								class="form-input {fieldErrors.phone ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								placeholder="(416) 555-0123"
								aria-invalid={!!fieldErrors.phone}
								aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
							/>
							{#if fieldErrors.phone}
								<p id="phone-error" class="text-red-600 text-sm mt-1">{fieldErrors.phone}</p>
							{/if}
						</div>
						<div>
							<label for="householdSize" class="block text-sm font-medium text-gray-700 mb-1">Household Size *</label>
							<select
								id="householdSize"
								bind:value={formData.householdSize}
								onchange={() => clearFieldError('householdSize')}
								required
								class="form-input {fieldErrors.householdSize ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								aria-invalid={!!fieldErrors.householdSize}
								aria-describedby={fieldErrors.householdSize ? 'householdSize-error' : undefined}
							>
								<option value="">Select household size</option>
								{#each householdSizes as size}
									<option value={size.value}>{size.label}</option>
								{/each}
							</select>
							{#if fieldErrors.householdSize}
								<p id="householdSize-error" class="text-red-600 text-sm mt-1">{fieldErrors.householdSize}</p>
							{/if}
						</div>
						<div>
							<label for="neighbourhood" class="block text-sm font-medium text-gray-700 mb-1">Current Neighbourhood *</label>
							<select
								id="neighbourhood"
								bind:value={formData.neighbourhood}
								onchange={() => clearFieldError('neighbourhood')}
								required
								class="form-input {fieldErrors.neighbourhood ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								aria-invalid={!!fieldErrors.neighbourhood}
								aria-describedby={fieldErrors.neighbourhood ? 'neighbourhood-error' : undefined}
							>
								<option value="">Where do you currently live?</option>
								{#each neighbourhoods as area}
									<option value={area.value}>{area.label}</option>
								{/each}
							</select>
							{#if fieldErrors.neighbourhood}
								<p id="neighbourhood-error" class="text-red-600 text-sm mt-1">{fieldErrors.neighbourhood}</p>
							{/if}
						</div>
						<div>
							<label for="unitType" class="block text-sm font-medium text-gray-700 mb-1">Preferred Unit Type *</label>
							<select
								id="unitType"
								bind:value={formData.unitType}
								onchange={() => clearFieldError('unitType')}
								required
								class="form-input {fieldErrors.unitType ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}"
								aria-invalid={!!fieldErrors.unitType}
								aria-describedby={fieldErrors.unitType ? 'unitType-error' : undefined}
							>
								<option value="">What size unit do you need?</option>
								{#each unitTypes as unit}
									<option value={unit.value}>{unit.label}</option>
								{/each}
							</select>
							{#if fieldErrors.unitType}
								<p id="unitType-error" class="text-red-600 text-sm mt-1">{fieldErrors.unitType}</p>
							{/if}
						</div>

						{#if submitStatus === 'error' && generalError}
							<div class="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
								{generalError}
							</div>
						{:else if submitStatus === 'error'}
							<div class="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
								Something went wrong. Please try again or email us directly at <a href="mailto:waitlist@nbrs.ca" class="underline">waitlist@nbrs.ca</a>
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
									Joining...
								</span>
							{:else}
								Join Waitlist
							{/if}
						</button>

						<p class="text-xs text-gray-500 text-center mt-4">
							By joining, you agree to receive occasional updates about FAMILY 1. We respect your privacy and will never share your information.
						</p>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Learn More CTA -->
<section class="py-16 md:py-24 bg-white">
	<div class="max-w-4xl mx-auto px-6 text-center" use:scrollReveal={{ type: 'fade', duration: 0.8 }}>
		<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
			Want to Learn More?
		</h2>
		<p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
			Explore the FAMILY 1 project in detail—floor plans, neighbourhood, and our vision for family-first housing.
		</p>
		<a
			href="/family-1"
			class="btn btn-primary group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold"
		>
			<span>Explore FAMILY 1</span>
			<svg class="w-4 h-4 icon-arrow" fill="currentColor" viewBox="0 0 12 10">
				<path d="M7.5 0L6.4 1.1L9.3 4H0V5.5H9.3L6.4 8.4L7.5 9.5L12 5L7.5 0Z" />
			</svg>
		</a>
	</div>
</section>
