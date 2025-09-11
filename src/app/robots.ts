import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
const baseUrl = process.env.NEXT_PUBLIC_ORIGIN || 'https://lignineco.com';
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin'],
		},
		sitemap: routing.locales.map((locale) =>
			locale === routing.defaultLocale
				? `${baseUrl}/sitemap.xml`
				: `${baseUrl}/${locale}/sitemap.xml`
		),
	};
}
