import localFont from 'next/font/local';

export const tildaSans = localFont({
	src: [
		{
			path: '../../public/fonts/tildaSans/TildaSans-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/tildaSans/TildaSans-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/tildaSans/TildaSans-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/tildaSans/TildaSans-Semibold.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/tildaSans/TildaSans-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/tildaSans/TildaSans-Black.woff2',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--font-tilda-sans',
	display: 'swap',
});
