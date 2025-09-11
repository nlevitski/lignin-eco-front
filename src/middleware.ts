import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
	matcher: [
		'/((?!api|uploads|icons|robots.txt|sitemap.xml|robots|_next/static|_next/image|favicon|apple-icon|android-icon).*)',
	],
};
