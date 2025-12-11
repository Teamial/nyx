import {
	type Icon,
	IconBrandBluesky,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX
} from '@tabler/icons-svelte';
import { dev } from '$app/environment';
import Wakatime from '$lib/icons/Wakatime.svelte';

interface Site {
	name: string;
	url: string;
	description: string;
	tags: string[];
	seo: {
		author: string;
		birthDate?: string;
		worksFor?: {
			name: string;
			url: string;
		};
		location: {
			city: string;
			region: string;
			country: string;
		};
	};
	abacus: { instance: string; namespace: string; key: string };
	out: {
		github: string;
		linkedin: string;
		email: string;
		calcom?: string;
		wakatime?: string;
		bluesky?: string;
		instagram?: string;
		x?: string;
	};
	repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
	name: 'Teanna Cole',
	// TODO: replace with your production domain once deployed
	url: dev ? 'http://localhost:5173' : 'https://example.com',
	description:
		'Teanna Cole — Computer Science student in New York, NY, focused on software engineering and machine learning.',
	tags: [
		'Teanna Cole',
		'Computer Science Student',
		'New York Software Developer',
		'New York, NY',
		'Machine Learning',
		'Software Engineering',
		'Backend Development',
		'Full Stack Development',
		'Web Development',
		'API Development'
	],
	seo: {
		author: 'Teanna Cole',
		location: {
			city: 'New York',
			region: 'NY',
			country: 'US'
		}
	},
	abacus: {
		// TODO: analytics service is template-specific; disable by default
		instance: '',
		namespace: '',
		key: ''
	},
	out: {
		github: 'https://github.com/teamial',
		linkedin: 'https://www.linkedin.com/in/teanna-cole/',
		email: '48teanna@gmail.com'
	},
	repo: {
		// TODO: point to your fork once you publish it
		url: '',
		commitBaseUrl: ''
	}
};

export default Site;

export const Socials = [
	{
		url: Site.out.github,
		label: 'GitHub',
		icon: IconBrandGithub,
		footer: true
	},
	{
		url: Site.out.linkedin,
		label: 'LinkedIn',
		icon: IconBrandLinkedin,
		footer: true
	}
	// Template socials removed by default; add more once you have accounts you want to link.
];
