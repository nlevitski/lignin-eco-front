import { getLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { StrapiAPI } from '@/dal/common';
import { icons } from '@/lib/icons';
import { tildaSans } from '@/fonts/fonts';
import styles from './not-found.module.css';
import { Button } from '@/components/button/Button';

export async function generateMetadata() {
	const locale = await getLocale();
	const api = new StrapiAPI(locale);
	const {
		data: { seo },
	} = await api.getNotFound();
	const canonicalPaths = routing.locales.map((locale) => {
		const path = locale === routing.defaultLocale ? '/' : `/${locale}/`;
		return { locale, path };
	});
	return {
		metadataBase: new URL('https://lignin-eco.com'),
		alternates: {
			canonical: '/',
			languages: Object.fromEntries(
				canonicalPaths.map((c) => [c.locale, c.path])
			),
		},
		title: seo?.metaTitle || '404 - Page Not Found',
		description:
			seo?.metaDescription ||
			'Sorry, the page you are looking for does not exist.',
		keywords: seo.keywords,
		openGraph: {
			title: seo?.openGraph?.ogTitle || '404 - Page Not Found',
			description:
				seo?.openGraph?.ogDescription ||
				'Sorry, the page you are looking for does not exist.',
			type: seo?.openGraph?.ogType || 'website',
			// images: [
			// 	{
			// 		url: seo.openGraph.ogImage?.url || '',
			// 		width: seo.openGraph.ogImage?.width || 0,
			// 		height: seo.openGraph.ogImage?.height || 0,
			// 		alt: seo.openGraph.ogImage?.alternativeText || 'Лигнин',
			// 	},
			// ],
			siteName: 'Lignin Eco',
			// },
			icons,
		},
	};
}
export default async function NotFound() {
	const locale = await getLocale();
	const api = new StrapiAPI(locale);
	const {
		data: { title, code, description, buttonValue },
	} = await api.getNotFound();
	return (
		<html lang={locale}>
			<body className={tildaSans.variable}>
				<div className={styles.container}>
					<div className={styles.notFound}>
						<h1 className={styles.notFoundTitle}>
							<span>{code}</span>
							<br />
							{title}
						</h1>
						<p className={styles.notFoundText}>{description}</p>
						<div className={styles.notFoundButtonWrapper}>
							<Button href={'/'} value={buttonValue} />
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
