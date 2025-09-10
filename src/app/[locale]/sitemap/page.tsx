import Link from 'next/link';
import styles from './sitemap.module.scss';
import { getLocale } from 'next-intl/server';
import { StrapiAPI } from '@/dal/common';
import { routing } from '@/i18n/routing';

// const links = [
// 	{
// 		title:
// 			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН очищенный. Сорбент для ЛАРН. Брикеты пеллеты из лигнина',
// 		description:
// 			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
// 		href: '/',
// 	},
// 	{
// 		title: 'Cтатьи о применении лигнина в различных сферах',
// 		description: 'Сорбент лигнин статьи научные исследования использование',
// 		href: '/articles',
// 	},
// ];
// const defaultMetaTags = {
// 	title: 'Карта сайта - Лигнин гидролизный',
// 	description:
// 		'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
// 	alternates: {
// 		canonical: 'https://ligninsorbent.ru/sitemap',
// 	},
// 	openGraph: {
// 		title: 'Карта сайта - Лигнин гидролизный',
// 		description:
// 			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки',
// 		type: 'website',
// 		url: 'https://ligninsorbent.ru/sitemap',
// 	},
// };

export async function generateMetadata() {
	const locale = await getLocale();
	const api = new StrapiAPI(locale);
	const {
		data: { seo },
	} = await api.getSitemapPage();

	return {
		alternates: {
			canonical: seo?.canonicalURL || '',
		},
		title: seo.metaTitle,
		description: seo.metaDescription,
		openGraph: {
			title: seo.openGraph?.ogTitle,
			description: seo.openGraph?.ogDescription,
			type: seo.openGraph?.ogType || 'website',
			url: seo.openGraph?.ogUrl,
		},
	};
}
export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}
export default async function SitemapPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const api = new StrapiAPI(locale);

	const { 0: sitemapPage, 1: heroSection } = await Promise.all([
		api.getSitemapPage(),
		api.getHeroSection(),
	]);
	const { data: sitemap } = sitemapPage;
	const { data: hero } = heroSection;
	// const origin = process.env.NEXT_PUBLIC_ORIGIN!;

	return (
		<div className={styles.container}>
			<div className={styles.holder}>
				<h1 className={styles.header}>{sitemap.title}</h1>
				<Link
					className={styles.link}
					href={routing.defaultLocale === locale ? '/' : `/${locale}`}
				>
					<h2 className={styles.title}>{hero.title}</h2>
					<p className={styles.description}>{hero.subtitle}</p>
				</Link>
			</div>
		</div>
	);
}
