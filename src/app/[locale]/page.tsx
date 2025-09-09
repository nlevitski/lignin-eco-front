// import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Card } from '@/components/card/Card';
import { Features } from '@/components/features/Features';
import {
  StrapiAPI,
} from '@/dal/common';
import { Brief } from '@/components/brief/Brief';
import { Hero } from '@/components/hero/Hero';
import { AboutUs } from '@/components/aboutUs/AboutUs';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export async function generateStaticParams(): Promise<{ locale: string }[]> {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
  const api = new StrapiAPI(locale);
	const {
		0: { data: heroSectionData },
		1: { data: featureData },
		2: { data: aboutUsData },
		3: { data: articles },
	} = await Promise.all([
    api.getHeroSection(),
    api.getFeatureSection(),
    api.getAboutUsSection(),
    api.getArticles()
	]);

	const firstArticle = articles[0];
	const restArticles = articles.slice(1);

	return (
		<div>
			<main>
				<Hero data={heroSectionData} />
				<Brief
					key={firstArticle.id}
					id={firstArticle.documentId}
					title={firstArticle.title}
					teaser={firstArticle.topContent}
					integratedInfo={firstArticle.integratedInfo}
					content={firstArticle.content}
					background={firstArticle.background}
					cover={firstArticle.image}
					style={{ objectFit: 'initial' }}
					aspectRatio={{ aspectRatio: '779 / 716' }}
				/>
				<Features
					title={featureData.title}
					article={featureData.article}
					documentId={featureData.documentId}
				>
					{featureData.feature_icons.map(({ image, title, id, article }) => (
						<Card
							key={id}
							imgUrl={image.url}
							imgAlt={image.alternativeText}
							caption={title}
							captionAnchorId={article ? article.documentId : ''}
						/>
					))}
				</Features>
				{restArticles.map(
					({
						id,
						topContent,
						integratedInfo,
						content,
						title,
						documentId,
						background,
						image,
					}) => (
						<Brief
							key={id}
							id={documentId}
							title={title}
							teaser={topContent}
							integratedInfo={integratedInfo}
							content={content}
							background={background}
							cover={image}
							style={{ objectPosition: '75% 50%' }}
						/>
					)
				)}
				<AboutUs data={aboutUsData} />
			</main>
		</div>
	);
}
