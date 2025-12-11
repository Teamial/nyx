export type AchievementItem =
	| string
	| {
			title: string;
			description?: string;
			href: string;
			date?: string;
	  };

export const achievements: AchievementItem[] = [
	'B.S. Computer Science @ Lehman College (CUNY) — Expected May 2027',
	{
		title: 'Software Engineer Intern — ML (NSF)',
		description: 'Built RADAR signal detection queries and validated detection algorithms.',
		href: 'https://www.nsf.gov/',
		date: '2025'
	},
	{
		title: 'Software Engineer Intern (Morgan Stanley)',
		description: 'Built API caching features and authored API documentation.',
		href: 'https://www.morganstanley.com/',
		date: '2025'
	},
	{
		title: 'Machine Learning Engineer Fellow (Break Through Tech / BTT AI)',
		href: 'https://breakthroughtech.org/',
		date: '2025'
	},
	'Google (Code2Career & VSWEP) — Software Engineering Mentee',
	'Atlassian — Software Engineering Mentee',
	'Management Leadership for Tomorrow (MLT) — Career Preparation Fellow'
];

export const latestCommits = [
	// Optional: wire this to your GitHub activity later
];
