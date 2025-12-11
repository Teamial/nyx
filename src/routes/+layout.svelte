<script lang="ts">
	import '../app.css';
	import Header from '../components/layout/Header.svelte';
	import Footer from '../components/layout/Footer.svelte';
	import Sidebar from '../components/layout/Sidebar.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import Site from '$lib/config/common';
	import BackgroundEffect from '$components/BackgroundEffect.svelte';
	import { BackgroundEnabled } from '$lib/stores/theme';

	const { data, children } = $props();

	let title = $derived(
		[Site.name, ...page.url.pathname.split('/').slice(1)].filter(Boolean).join(' - ')
	);

	let isSidebarOpen = $state(false);
	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
	function closeSidebar() {
		isSidebarOpen = false;
	}

	const personSchema = $derived(() => {
		const schema: Record<string, unknown> = {
			'@context': 'https://schema.org',
			'@type': ['Person', 'ProfilePage'],
			name: Site.seo.author,
			givenName: 'Teanna',
			familyName: 'Cole',
			url: Site.url,
			description: Site.description,
			jobTitle: 'Computer Science Student',
			address: {
				'@type': 'PostalAddress',
				addressLocality: Site.seo.location.city,
				addressRegion: Site.seo.location.region,
				addressCountry: Site.seo.location.country
			},
			sameAs: [Site.out.github, Site.out.linkedin].filter(Boolean),
			knowsAbout: [
				'Software Engineering',
				'Machine Learning',
				'Backend Development',
				'Web Development',
				'Python',
				'Java',
				'TypeScript'
			],
			mainEntity: {
				'@type': 'Person',
				name: Site.seo.author
			},
			identifier: Site.url
		};

		if (Site.seo.birthDate) schema.birthDate = Site.seo.birthDate;
		if (Site.seo.worksFor) {
			schema.worksFor = {
				'@type': 'Organization',
				name: Site.seo.worksFor.name,
				url: Site.seo.worksFor.url
			};
		}

		return schema;
	});

	// Enable View Transitions API for SvelteKit navigation
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={Site.description} />

	<!-- Open Graph (OG) Tags -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={Site.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={Site.url} />
	<meta property="og:image" content={`${Site.url}/og-image.png`} />
	<meta property="og:site_name" content={Site.name} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={Site.description} />
	<meta name="twitter:image" content={`${Site.url}/og-image.png`} />

	<!-- Additional Meta Tags -->
	<meta name="author" content={Site.seo.author} />
	<meta name="keywords" content={Site.tags.join(', ')} />
	<meta name="robots" content="index, follow" />
	<meta name="geo.region" content="US-NY" />
	<meta name="geo.placename" content={Site.seo.location.city} />
	<link rel="canonical" href={Site.url + page.url.pathname} />

	<!-- JSON-LD Person Schema -->
	{@html `<script type="application/ld+json">
		${JSON.stringify(personSchema)}
	</script>`}
</svelte:head>

<div class="text-text mx-auto flex min-h-screen max-w-[90%] flex-col md:max-w-[80%]">
	{#if $BackgroundEnabled}
		<BackgroundEffect />
	{/if}
	<Header {toggleSidebar} />
	<Sidebar isOpen={isSidebarOpen} {closeSidebar} />
	<main class="flex-1 px-0 py-8 md:px-5">
		{@render children?.()}
	</main>
	<Footer value={data.footerData.value} />
</div>
