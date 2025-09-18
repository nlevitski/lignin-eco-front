import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { StrapiAPI } from '@/dal/common';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { tildaSans } from '@/fonts/fonts';
import { Menu } from '@/components/menu/Menu';
import { Feedback } from '@/components/feedback/Feedback';
import { Footer } from '@/components/footer/Footer';
import { icons } from '@/lib/icons';
import { getLocale } from 'next-intl/server';
import ScrollTopButton from '@/components/scrollToTopButton/ScrollToTopButton';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const baseUrl = process.env.NEXT_PUBLIC_ORIGIN || 'https://lignineco.com';
export async function generateMetadata() {
	const locale = await getLocale();
	const url = new URL(baseUrl);
	const api = new StrapiAPI(locale);
	const {
		data: { seo },
	} = await api.getMainPageSeo();
	const canonicalPaths = routing.locales.map((locale) => {
		const path = locale === routing.defaultLocale ? './' : `./${locale}/`;
		return { locale, path };
	});

	return {
		metadataBase: url.origin,
		siteName: 'Lignin Eco',
		alternates: {
			canonical: './',
			languages: Object.fromEntries(
				canonicalPaths.map((c) => [c.locale, c.path])
			),
		},
		title: seo?.metaTitle,
		description: seo?.metaDescription,
		keywords: seo?.keywords,
		openGraph: {
			title: seo?.openGraph.ogTitle,
			description: seo?.openGraph.ogDescription,
			type: seo?.openGraph?.ogType,
			url: seo?.openGraph?.ogUrl,
			// images: [
			// 	{
			// 		url: seo?.openGraph?.ogImage?.url || '',
			// 		width: seo?.openGraph?.ogImage?.width || 0,
			// 		height: seo?.openGraph?.ogImage?.height || 0,
			// 		alt: seo?.openGraph?.ogImage?.alternativeText || 'Лигнин',
			// 	},
			// ],
		},
		icons,
	};
}

// const isProduciton = process.env.NODE_ENV === 'production';

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	const api = new StrapiAPI(locale);
	const {
		0: { data: menu },
		1: { data: sitemapLink },
		2: { data: footerData },
		3: { data: feedbackData },
	} = await Promise.all([
		api.getMenuLinks(),
		api.getSitemapLink(),
		api.getFooter(),
		api.getFeedback(),
	]);
	const isProduciton = process.env.NODE_ENV === 'production';
	return (
		<html lang={locale}>
			<body className={tildaSans.variable}>
				<NextIntlClientProvider>
					<Menu menu={menu} />
				</NextIntlClientProvider>
				{children}
				<NextIntlClientProvider>
					<Feedback data={feedbackData} />
				</NextIntlClientProvider>
				<Footer footer={footerData} sitemapLink={sitemapLink} />
				<ScrollTopButton />
				{isProduciton && (
					<GoogleAnalytics
						gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
					/>
				)}
				<Script id='consent-default' strategy='afterInteractive'>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              personalization_storage: 'denied',
              functionality_storage: 'denied',
              security_storage: 'granted'
            });
          `}
				</Script>
			</body>
		</html>
	);
}
