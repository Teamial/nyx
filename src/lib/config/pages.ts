import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-svelte';
import Site from '$lib/config/common';

export const Home = {
	socialLinks: [
		{
			href: Site.out.github,
			text: 'GitHub',
			icon: IconBrandGithub
		},
		{
			href: Site.out.linkedin,
			text: 'LinkedIn',
			icon: IconBrandLinkedin
		},
		{
			href: `mailto:${Site.out.email}`,
			text: 'Email',
			icon: IconMail
		}
	]
};

export interface ExperienceTimelineItem {
	company: string;
	role: string;
	url: string;
	logoUrl: string;
	logoAlt: string;
	startDate: string;
	endDate?: string; // optional endDate. If present, it's a past role.
	details?: string; // Optional details for expansion
	logoScale?: number; // Optional logo scale multiplier
}

export const experienceTimeline: ExperienceTimelineItem[] = [
	{
		company: 'National Science Foundation (NSF)',
		role: 'Software Engineer Intern — ML',
		url: 'https://www.nsf.gov/',
		logoUrl: '/logos/nsf.svg',
		logoAlt: 'NSF',
		startDate: '2025-06-01',
		endDate: '2025-08-01',
		details:
			'Built RADAR signal detection queries in GNU Radio and validated detection algorithms across large datasets.'
	},
	{
		company: 'Morgan Stanley',
		role: 'Software Engineer Intern',
		url: 'https://www.morganstanley.com/',
		logoUrl: '/logos/morganstanley.svg',
		logoAlt: 'Morgan Stanley',
		startDate: '2025-01-01',
		endDate: '2025-02-01',
		details:
			'Built Redis CRUD API caching and authored API documentation to streamline adoption and reduce support tickets.'
	},
	{
		company: 'Break Through Tech (BTT AI)',
		role: 'Machine Learning Engineer Fellow',
		url: 'https://breakthroughtech.org/',
		logoUrl: '/logos/btt.svg',
		logoAlt: 'Break Through Tech',
		startDate: '2025-05-01',
		endDate: '2025-08-01',
		details:
			'Built and optimized NLP and vision models, improving inference time and accuracy through hyperparameter tuning.'
	}
];
