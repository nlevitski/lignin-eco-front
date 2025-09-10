import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
	const url = new URL('https://lignineco.com');
	const pages = [''];
	const urls: MetadataRoute.Sitemap = [];
	routing.locales.forEach((locale) => {
		pages.forEach((page) => {
			const path =
				locale === routing.defaultLocale ? `/${page}` : `/${locale}/${page}`;

			urls.push({
				url: `${url.origin}${path}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: page === '' ? 1 : 0.8,
				alternates: {
					languages: Object.fromEntries(
						routing.locales
							.filter((l) => l !== locale)
							.map((l) => [
								l,
								l === routing.defaultLocale
									? `${url.origin}/${page}`
									: `${url.origin}/${l}/${page}`,
							])
					),
				},
			});
		});
	});
	console.log(urls);
	return urls;
	return [
		{
			url: `${url.href}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${url.href}/pl`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	];
}

// export default function sitemap(): MetadataRoute.Sitemap {
// 	return [
// 		{
// 			url: 'https://lignineco.com',
// 			lastModified: new Date(),
// 			changeFrequency: 'yearly',
// 			priority: 1,
// 			alternates: {
// 				languages: {
// 					pl: 'https://lignineco.com/pl',
// 				},
// 			},
// 		},
// 		{
// 			url: 'https://lignineco.com/pl',
// 			lastModified: new Date(),
// 			changeFrequency: 'yearly',
// 			priority: 1,
// 			alternates: {
// 				languages: {
// 					en: 'https://lignineco.com',
// 				},
// 			},
// 		},
// 	];
// }
