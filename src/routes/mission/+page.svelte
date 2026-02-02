<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';
</script>

<svelte:head>
	<title>Our Mission | NBRS</title>
	<meta name="description" content="NBRS is building the missing middle - quality rental housing at the neighbourhood scale for Toronto families." />
	<!-- Open Graph / Social -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nbrs.ca/mission" />
	<meta property="og:title" content="Our Mission | NBRS" />
	<meta property="og:description" content="NBRS is building the missing middle - quality rental housing at the neighbourhood scale for Toronto families." />
	<meta property="og:image" content="https://nbrs.ca/videos/new/fountain-park-people.jpg" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Our Mission | NBRS" />
	<meta name="twitter:description" content="NBRS is building the missing middle - quality rental housing at the neighbourhood scale for Toronto families." />
	<meta name="twitter:image" content="https://nbrs.ca/videos/new/fountain-park-people.jpg" />
</svelte:head>

<div class="bg-nbrs-green min-h-screen">
	<div class="h-[80px] md:h-[100px]"></div>

	<div class="max-w-[1440px] mx-auto px-4 md:px-6">
		<!-- Hero Title -->
		<h1
			class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] pt-8 pb-16 md:pb-24"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			Building the<br/>Missing Middle
		</h1>

		<!-- Opening paragraph -->
		<p
			class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mb-16 md:mb-24"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.1 }}
		>
			Toronto used to build neighbourhood-scale housing. Walk down any established street and you'll see them—the 5-10 unit buildings our grandparents grew up in. The homes that made neighbourhoods feel like neighbourhoods.
		</p>

		<!-- Section 1: Video Left, Text Right -->
		<div class="flex flex-col md:flex-row mb-16 md:mb-24" use:scrollReveal={{ type: 'fade', duration: 1 }}>
			<div class="flex-1 md:mr-6">
				<video
					autoplay
					muted
					loop
					playsinline
					poster="/videos/new/fountain-park-people.jpg"
					class="w-full aspect-[4/5] object-cover rounded-sm"
				>
					<source src="/videos/new/fountain-park-people.mp4" type="video/mp4" />
				</video>
			</div>
			<div class="hidden md:block bg-white/20 min-w-[1px]"></div>
			<div class="flex-1 md:pl-6 mt-6 md:mt-0">
				<div class="md:sticky md:top-[120px]">
					<p class="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-snug mb-4">
						Then we stopped. For decades, it was either single-family homes or high-rise towers. Nothing in between.
					</p>
					<p class="text-lg md:text-xl text-white/70">
						The middle class got squeezed out.
					</p>
				</div>
			</div>
		</div>

		<!-- Divider -->
		<div class="border-t border-white/20 mb-16 md:mb-24"></div>

		<!-- Big Quote -->
		<blockquote
			class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-5xl mb-16 md:mb-24"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			"The missing middle isn't just about buildings—it's about the missing middle class."
		</blockquote>

		<!-- Continued text -->
		<p
			class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mb-16 md:mb-24"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			People who should be able to raise a family without leaving the city they love. From the moment they plan for a child until their oldest enters school, they want to stay where community thrives—but a shortage of the right kind of homes makes that impossible.
		</p>

		<!-- Section 2: Text Left, Image Right (Mirrored) -->
		<div class="flex flex-col md:flex-row mb-16 md:mb-24" use:scrollReveal={{ type: 'fade', duration: 1 }}>
			<div class="flex-1 md:mr-6 order-2 md:order-1">
				<div class="md:sticky md:top-[120px]">
					<p class="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-snug mb-4">
						When families are priced out, neighbourhoods hollow out.
					</p>
					<p class="text-lg md:text-xl text-white/70">
						That's why we build.
					</p>
				</div>
			</div>
			<div class="hidden md:block bg-white/20 min-w-[1px] order-2"></div>
			<div class="flex-1 md:pl-6 mt-6 md:mt-0 order-1 md:order-3">
				<video
					autoplay
					muted
					loop
					playsinline
					poster="/videos/new/cyclists-downtown.jpg"
					class="w-full aspect-[4/5] object-cover rounded-sm"
				>
					<source src="/videos/new/cyclists-downtown.mp4" type="video/mp4" />
				</video>
			</div>
		</div>

		<!-- Divider -->
		<div class="border-t border-white/20 mb-16 md:mb-24"></div>

		<!-- Who we are text -->
		<p
			class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mb-8"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			We're developers, designers, and operators who believe quality rental housing shouldn't require leaving the city.
		</p>
		<p
			class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mb-16 md:mb-24"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8, delay: 0.1 }}
		>
			Our tech-enabled approach cuts through red tape to deliver new housing in 12-18 months—not years.
		</p>

		<!-- How We Work Section -->
		<section class="mb-16 md:mb-24" use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}>
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12">Here's how we work</h2>

			<div class="border-t border-white/20">
				<div class="border-b border-white/20 py-5 md:py-6 flex gap-4 md:gap-8">
					<span class="text-4xl md:text-5xl font-bold text-white/30">1</span>
					<p class="text-lg md:text-xl lg:text-2xl text-white font-medium pt-1">We target as-of-right sites in established Toronto neighbourhoods.</p>
				</div>
				<div class="border-b border-white/20 py-5 md:py-6 flex gap-4 md:gap-8">
					<span class="text-4xl md:text-5xl font-bold text-white/30">2</span>
					<p class="text-lg md:text-xl lg:text-2xl text-white font-medium pt-1">We design 5-10 unit buildings that fit naturally into the streetscape.</p>
				</div>
				<div class="border-b border-white/20 py-5 md:py-6 flex gap-4 md:gap-8">
					<span class="text-4xl md:text-5xl font-bold text-white/30">3</span>
					<p class="text-lg md:text-xl lg:text-2xl text-white font-medium pt-1">We build quality homes for families—real bedrooms, real storage, real space.</p>
				</div>
				<div class="border-b border-white/20 py-5 md:py-6 flex gap-4 md:gap-8">
					<span class="text-4xl md:text-5xl font-bold text-white/30">4</span>
					<p class="text-lg md:text-xl lg:text-2xl text-white font-medium pt-1">We deliver new housing in 12-18 months from acquisition.</p>
				</div>
				<div class="border-b border-white/20 py-5 md:py-6 flex gap-4 md:gap-8">
					<span class="text-4xl md:text-5xl font-bold text-white/30">5</span>
					<p class="text-lg md:text-xl lg:text-2xl text-white font-medium pt-1">We rent directly to families who want to stay in the city they love.</p>
				</div>
			</div>
		</section>

		<!-- Vision text -->
		<p
			class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mb-16 md:mb-24"
			use:scrollReveal={{ type: 'slide-up', duration: 0.8 }}
		>
			This is just the beginning of a larger vision: thriving neighbourhoods where families can grow, find opportunity, and build community.
		</p>

		<!-- Section 3: Video Left, Text Right (FAMILY 1) -->
		<div class="flex flex-col md:flex-row mb-16 md:mb-24" use:scrollReveal={{ type: 'fade', duration: 1 }}>
			<div class="flex-1 md:mr-6">
				<video
					autoplay
					muted
					loop
					playsinline
					poster="/videos/new/building-render-dusk.jpg"
					class="w-full aspect-[4/5] object-cover rounded-sm"
				>
					<source src="/videos/new/building-render-dusk.mp4" type="video/mp4" />
				</video>
			</div>
			<div class="hidden md:block bg-white/20 min-w-[1px]"></div>
			<div class="flex-1 md:pl-6 mt-6 md:mt-0">
				<div class="md:sticky md:top-[120px]">
					<p class="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-snug">
						Building by building, neighbourhood by neighbourhood, let's bring back the missing middle.
					</p>
				</div>
			</div>
		</div>

		<div class="h-16 md:h-24"></div>
	</div>
</div>
