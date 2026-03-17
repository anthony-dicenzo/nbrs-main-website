<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, loadGsap, loadScrollTrigger } from '$lib/utils/gsap';

	let illustrationContainer: HTMLElement;
	let ctx: gsap.Context | null = null;

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const gsap = await loadGsap();
		const ScrollTrigger = await loadScrollTrigger();

		ctx = gsap.context(() => {
			const paths = illustrationContainer.querySelectorAll('.draw-path');
			paths.forEach((path, index) => {
				const svgPath = path as SVGPathElement;
				const length = svgPath.getTotalLength();

				gsap.set(svgPath, {
					strokeDasharray: length,
					strokeDashoffset: length
				});

				gsap.to(svgPath, {
					strokeDashoffset: 0,
					duration: 1.2,
					delay: index * 0.03,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: illustrationContainer,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				});
			});

			const fills = illustrationContainer.querySelectorAll('.fill-element');
			gsap.from(fills, {
				opacity: 0,
				duration: 0.6,
				stagger: 0.05,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: illustrationContainer,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}, illustrationContainer);
	});

	onDestroy(() => {
		ctx?.revert();
	});

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
	<title>Partner With NBRS | Toronto Multiplex Investment Opportunities</title>
	<meta name="description" content="Partner with NBRS to build multiplex rental housing in Toronto. Investment opportunities in fourplex and missing middle family housing development." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/partner" />
	<meta property="og:title" content="Partner With NBRS | Toronto Multiplex Investment Opportunities" />
	<meta property="og:description" content="Join NBRS in building multiplex rental housing in Toronto. We're looking for investors, landowners, brokers, and nonprofits." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/building-render-dusk.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Partner With NBRS | Toronto Multiplex Investment Opportunities" />
	<meta name="twitter:description" content="Join NBRS in building multiplex rental housing in Toronto." />
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
		<div class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
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

		<!-- Neighbourhood Story Illustration -->
		<div class="mt-4 md:mt-6" bind:this={illustrationContainer}>
			<svg viewBox="0 0 1200 280" class="w-full h-auto" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
				<!-- Ground line -->
				<line class="draw-path" x1="0" y1="240" x2="1200" y2="240" stroke="white" stroke-width="2" opacity="0.4"/>

				<!-- === HOUSE 1 (small single-family, left) === -->
				<!-- Walls -->
				<rect class="draw-path" x="40" y="150" width="100" height="90" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Roof -->
				<line class="draw-path" x1="30" y1="150" x2="90" y2="100" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="90" y1="100" x2="150" y2="150" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Door -->
				<rect class="draw-path" x="75" y="195" width="30" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Window -->
				<rect class="draw-path" x="55" y="165" width="20" height="18" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="110" y="165" width="20" height="18" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<!-- Step -->
				<rect class="draw-path" x="70" y="235" width="40" height="5" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>

				<!-- === TREE 1 === -->
				<line class="draw-path" x1="195" y1="240" x2="195" y2="175" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="195" cy="155" r="25" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="195" cy="155" r="15" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
				<circle class="fill-element" cx="195" cy="155" r="4" fill="white" opacity="0.4"/>

				<!-- === DUPLEX (slightly taller) === -->
				<!-- Walls -->
				<rect class="draw-path" x="250" y="120" width="120" height="120" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Roof -->
				<line class="draw-path" x1="240" y1="120" x2="310" y2="75" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="310" y1="75" x2="380" y2="120" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Unit divider -->
				<line class="draw-path" x1="310" y1="120" x2="310" y2="240" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Doors -->
				<rect class="draw-path" x="275" y="195" width="25" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<rect class="draw-path" x="320" y="195" width="25" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<circle class="fill-element" cx="296" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<circle class="fill-element" cx="341" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<!-- Windows -->
				<rect class="draw-path" x="265" y="135" width="25" height="22" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<line class="draw-path" x1="277" y1="135" x2="277" y2="157" stroke="white" stroke-width="1" opacity="0.3"/>
				<rect class="draw-path" x="330" y="135" width="25" height="22" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<line class="draw-path" x1="342" y1="135" x2="342" y2="157" stroke="white" stroke-width="1" opacity="0.3"/>

				<!-- === TREE 2 === -->
				<line class="draw-path" x1="430" y1="240" x2="430" y2="180" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="430" cy="160" r="22" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="430" cy="160" r="12" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
				<circle class="fill-element" cx="430" cy="160" r="3.5" fill="white" opacity="0.4"/>

				<!-- === MULTIPLEX (central, tallest — the NBRS building) === -->
				<!-- Main structure -->
				<rect class="draw-path" x="480" y="60" width="240" height="180" fill="none" stroke="white" stroke-width="2" opacity="0.7"/>
				<!-- Roof -->
				<line class="draw-path" x1="470" y1="60" x2="730" y2="60" stroke="white" stroke-width="2.5" opacity="0.7"/>
				<line class="draw-path" x1="475" y1="55" x2="725" y2="55" stroke="white" stroke-width="1" opacity="0.5"/>
				<!-- Floor lines -->
				<line class="draw-path" x1="480" y1="120" x2="720" y2="120" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="480" y1="180" x2="720" y2="180" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Unit dividers -->
				<line class="draw-path" x1="540" y1="60" x2="540" y2="240" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="600" y1="60" x2="600" y2="240" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="660" y1="60" x2="660" y2="240" stroke="white" stroke-width="1.5" opacity="0.5"/>

				<!-- Windows - top floor -->
				<rect class="draw-path" x="495" y="72" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<line class="draw-path" x1="510" y1="72" x2="510" y2="96" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="555" y="72" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<line class="draw-path" x1="570" y1="72" x2="570" y2="96" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="615" y="72" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<line class="draw-path" x1="630" y1="72" x2="630" y2="96" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="675" y="72" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<line class="draw-path" x1="690" y1="72" x2="690" y2="96" stroke="white" stroke-width="1" opacity="0.4"/>

				<!-- Windows - middle floor -->
				<rect class="draw-path" x="495" y="132" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<rect class="draw-path" x="555" y="132" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<rect class="draw-path" x="615" y="132" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
				<rect class="draw-path" x="675" y="132" width="30" height="24" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>

				<!-- Doors - ground floor -->
				<rect class="draw-path" x="497" y="195" width="28" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.6"/>
				<circle class="fill-element" cx="520" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<rect class="draw-path" x="557" y="195" width="28" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.6"/>
				<circle class="fill-element" cx="580" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<rect class="draw-path" x="617" y="195" width="28" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.6"/>
				<circle class="fill-element" cx="640" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<rect class="draw-path" x="677" y="195" width="28" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.6"/>
				<circle class="fill-element" cx="700" cy="220" r="2.5" fill="white" opacity="0.5"/>

				<!-- Steps -->
				<rect class="draw-path" x="492" y="236" width="38" height="4" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="552" y="236" width="38" height="4" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="612" y="236" width="38" height="4" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="672" y="236" width="38" height="4" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>

				<!-- === TREE 3 === -->
				<line class="draw-path" x1="775" y1="240" x2="775" y2="175" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="775" cy="155" r="25" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="775" cy="155" r="15" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
				<circle class="fill-element" cx="775" cy="155" r="4" fill="white" opacity="0.4"/>

				<!-- === DUPLEX 2 (right side) === -->
				<rect class="draw-path" x="830" y="125" width="110" height="115" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Roof -->
				<line class="draw-path" x1="820" y1="125" x2="885" y2="82" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="885" y1="82" x2="950" y2="125" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Unit divider -->
				<line class="draw-path" x1="885" y1="125" x2="885" y2="240" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Doors -->
				<rect class="draw-path" x="850" y="195" width="25" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<rect class="draw-path" x="895" y="195" width="25" height="45" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<circle class="fill-element" cx="871" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<circle class="fill-element" cx="916" cy="220" r="2.5" fill="white" opacity="0.5"/>
				<!-- Windows -->
				<rect class="draw-path" x="843" y="140" width="24" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="903" y="140" width="24" height="20" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>

				<!-- === TREE 4 === -->
				<line class="draw-path" x1="1000" y1="240" x2="1000" y2="185" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="1000" cy="168" r="20" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/>
				<circle class="draw-path" cx="1000" cy="168" r="11" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
				<circle class="fill-element" cx="1000" cy="168" r="3" fill="white" opacity="0.4"/>

				<!-- === HOUSE 2 (right) === -->
				<rect class="draw-path" x="1055" y="155" width="95" height="85" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Roof -->
				<line class="draw-path" x1="1045" y1="155" x2="1102" y2="108" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<line class="draw-path" x1="1102" y1="108" x2="1160" y2="155" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Door -->
				<rect class="draw-path" x="1085" y="198" width="28" height="42" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
				<!-- Window -->
				<rect class="draw-path" x="1065" y="168" width="18" height="16" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
				<rect class="draw-path" x="1120" y="168" width="18" height="16" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>

				<!-- Pathway lines (subtle) -->
				<line class="draw-path" x1="90" y1="240" x2="90" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="290" y1="240" x2="290" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="335" y1="240" x2="335" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="510" y1="240" x2="510" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="570" y1="240" x2="570" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="630" y1="240" x2="630" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="690" y1="240" x2="690" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="862" y1="240" x2="862" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="907" y1="240" x2="907" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>
				<line class="draw-path" x1="1099" y1="240" x2="1099" y2="255" stroke="white" stroke-width="1" opacity="0.25"/>

				<!-- Sidewalk -->
				<line class="draw-path" x1="0" y1="258" x2="1200" y2="258" stroke="white" stroke-width="1" opacity="0.2"/>
			</svg>
		</div>
	</div>
</div>
