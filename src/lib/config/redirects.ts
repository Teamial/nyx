/*
 * Copyright (c) 2025. Teanna Cole
 * All Rights Reserved
 */
import Site from '$lib/config/common';
import createRedirects from '$utils/redirects';

const redirects = createRedirects([
	{ paths: ['/github', '/gh'], url: Site.out.github },
	{ paths: ['/linkedin', '/li'], url: Site.out.linkedin },
	{ paths: ['/email', '/contact'], url: `mailto:${Site.out.email}` },
	{ paths: '/resume', url: '/resume.pdf' }
]);

export default redirects;
