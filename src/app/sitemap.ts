import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const ORIGIN = (
	process.env.NEXT_PUBLIC_ORIGIN || 'https://lignineco.com'
).replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
	const { locales, defaultLocale } = routing;
	const pages = ['', 'sitemap'];

	const makeUrl = (page: string) => (page ? `${ORIGIN}/${page}` : ORIGIN);

	return pages.map((page) => ({
		url: makeUrl(page), // <-- абсолютный URL здесь
		lastModified: new Date(),
		priority: page === '' ? 1 : 0.8,
		alternates: {
			languages: locales.reduce((acc, locale) => {
				if (locale === defaultLocale) return acc;
				acc[locale] = `${ORIGIN}/${locale}${page ? `/${page}` : ''}`;
				return acc;
			}, {} as Record<string, string>),
		},
	}));
}
