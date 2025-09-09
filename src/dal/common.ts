import { notFound } from 'next/navigation';

export type CollectionResponse<T> = {
	data: Document<T>[];
	meta: Meta;
};

export type SingleResponse<T> = {
	data: Document<T>;
	meta: object;
};

export type Meta = {
	pagination: Pagination;
};

export type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type SingleMedia = MediaDocument & BaseImage;

export type MediaDocument = {
	caption: string;
	formats: Formats;
	previewUrl: string;
	provider: string;
	provider_metadata: unknown;
	alternativeText: string;
} & BaseDocument;

export type BaseDocument = {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type BaseImage = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	width: number;
	height: number;
	size: number;
	url: string;
};

export type Document<T> = BaseDocument & T;

export type MenuLink = {
	title: string;
	order: number;
	anchorType: 'section' | 'article';
	targetDocumentId: string;
	article: Document<Article>;
};
export type Article = {
	title: string;
	topContent: StrapiRichTextBlock[];
	content: StrapiRichTextBlock[];
	integratedInfo: string | null;
	image: SingleMedia;
	background: SingleMedia;
};
export type Section = {
	title: string;
	content: StrapiRichTextBlock[];
	image: Document<{ attributes: BaseImage }> | null;
	background: SingleMedia[];
};
export type ImageSizes =
	| 'thumbnail'
	| 'xsmall'
	| 'small'
	| 'medium'
	| 'large'
	| 'xlarge';
export type Formats = Record<ImageSizes, ImageDocument>;

export type ImageDocument = BaseImage & {
	path: string;
	sizeInBytes: number;
};
export type StrapiRichTextBlock = {
	type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote' | 'code' | 'link';
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	format?: 'ordered' | 'unordered';
	text?: string;
	url?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	image?: {
		url: string;
		alternativeText?: string | null;
		width?: number;
		height?: number;
		formats?: Formats;
	};
	children?: StrapiRichTextNode[];
};

export type StrapiRichTextNode = {
	type: 'text' | 'link';
	text?: string;
	url?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	children?: StrapiRichTextNode[];
};

type FeatureIcon = {
	order: number;
	title: string;
	image: SingleMedia;
	article: Document<Article> | null;
};

export type FeatureSection = {
	title: string;
	article: StrapiRichTextBlock[];
	feature_icons: Document<FeatureIcon>[];
};
export type Phone = {
	value: string;
	country: string;
};
export type HeroSection = {
	title: string;
	subtitle: string;
	buttonTargetDocumentId: string | null;
	background: SingleMedia[];
};
export type FooterSection = {
	title: string;
	entity: string;
	email: string;
	countryOfOrigin: string;
	phones: Document<Phone>[];
};
export type Product = {
	caption: string;
	image: SingleMedia;
};
export type AboutUsSection = {
	title: string;
	content: StrapiRichTextBlock[];
	background: SingleMedia[];
	productsTitle: string | null;
	products: Document<Product>[];
};

export type FeedbackSection = {
	title: string;
	background: SingleMedia[];
	// emailPlaceholder: string;
	// phonePlaceholder: string;
	// namePlaceholder: string;
	// messagePlaceholder: string;
};
export type NotFoundData = {
	title: string;
	code: number;
	description: string;
	buttonValue: string;
	seo: SEO;
};

export type SEO = {
	id: number;
	metaTitle: string;
	metaDescription: string;
	keywords: string;
	metaRobots: unknown;
	metaViewport: unknown;
	canonicalURL: string;
	structuredData: unknown;
	openGraph: {
		id: number;
		ogTitle: string;
		ogDescription: string;
		ogUrl: string;
		ogType: string;
	};
};
export type Locale = {
	name: string;
	code: string;
	isDefault: boolean;
};
export type SitemapLink = {
	value: string;
	link: string;
};

type FeedbackData = {
	email: string;
	name: string;
	phone: string;
	message: string;
};
export type FeedbackForm = {
	message: string;
	data: FeedbackData;
};

const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export class StrapiAPI {
	private readonly defaultLocale = 'en';
	private readonly options: RequestInit = {
		// next: { revalidate: 3600 },
		cache: 'no-store',
	};
	private readonly baseURL = `${STRAPI_URL}/api/`;

	constructor(private readonly locale: string) {}

	private async fetchJson<T>(url: URL, options?: RequestInit): Promise<T> {
		try {
			const response = await fetch(url, {
				...this.options,
				...options,
			});
			if (response.status === 404) {
				return notFound();
			}
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error(`API request failed: ${url.href}`, error);
			throw error;
		}
	}
	private initLocaleURL(path: string, params?: Record<string, string>) {
		const url = new URL(`${this.baseURL}${path}`);
		if (this.locale !== this.defaultLocale) {
			url.searchParams.append('locale', this.locale);
		}
		return url;
	}

	async getMenuLinks() {
		const url = this.initLocaleURL('menu-links');
		url.searchParams.append('populate', '*');
		url.searchParams.append('sort', 'order');
		return this.fetchJson<CollectionResponse<MenuLink>>(url);
	}
	async getSitemapLink() {
		const url = this.initLocaleURL('sitemap-link');
		return this.fetchJson<SingleResponse<SitemapLink>>(url);
	}
	async getFooter() {
		const url = this.initLocaleURL('footer');
		url.searchParams.append('populate', '*');
		return this.fetchJson<SingleResponse<FooterSection>>(url);
	}
	async getFeedback() {
		const url = this.initLocaleURL('feedback');
		url.searchParams.append('populate', '*');
		return this.fetchJson<SingleResponse<FeedbackSection>>(url);
	}
	async getMainPageSeo() {
		const url = this.initLocaleURL('main-page');
		url.searchParams.append('populate[seo][populate]', '*');
		return this.fetchJson<SingleResponse<{ seo: SEO }>>(url);
	}
	async getHeroSection() {
		const url = this.initLocaleURL('hero');
		url.searchParams.append('populate', '*');
		return this.fetchJson<SingleResponse<HeroSection>>(url);
	}
	async getFeatureSection() {
		const url = this.initLocaleURL('feature-section');
		url.searchParams.append('populate[feature_icons][populate]', '*');
		return this.fetchJson<SingleResponse<FeatureSection>>(url);
	}
	async getAboutUsSection() {
		const url = this.initLocaleURL('about');
		url.searchParams.append('populate[products][populate]', 'image');
		url.searchParams.append('populate', 'background');
		return this.fetchJson<SingleResponse<AboutUsSection>>(url);
	}
	async getArticles() {
		const url = this.initLocaleURL('articles');
		url.searchParams.append('populate', '*');
		url.searchParams.append('sort', 'order');
		return this.fetchJson<CollectionResponse<Article>>(url);
	}
	async getNotFound() {
		const url = this.initLocaleURL('not-found');
		url.searchParams.append('populate[seo][populate]', 'openGraph');
		return this.fetchJson<SingleResponse<NotFoundData>>(url);
	}
	async sendFeedbackForm(payload: FormData) {
		const url = this.initLocaleURL('form');
		return this.fetchJson<FeedbackForm>(url, {
			method: 'POST',
			body: payload,
		});
	}
}
