import { MetadataRoute } from 'next/types';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const url = new URL('https://lignin-eco.com');
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
			});
		});
	});
	return urls;
}
