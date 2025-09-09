'use client';
import { useTranslations, useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { Link, usePathname } from '@/i18n/navigation';
import styles from './languageSwitcher.module.scss';
import classNames from 'classnames/bind';
import { useState, MouseEvent, useRef, useEffect } from 'react';

type LanguageSwitcherProps = {
	outerStyles: {
		[key: string]: string;
	};
};
const cx = classNames.bind(styles);

export default function LanguageSwitcher({
	outerStyles,
}: LanguageSwitcherProps) {
	const tMenu = useTranslations('menu');
	const currentLocale = useLocale();
	const pathname = usePathname();
	const { 0: expanded, 1: setExpanded } = useState(false);
	const languageRef = useRef<HTMLLIElement>(null);

	const otherLocales = routing.locales.filter(
		(locale) => locale !== currentLocale
	);
	const expandToggle = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation();
		setExpanded((prev) => !prev);
	};
	useEffect(() => {
		const handleInteraction = (event: Event) => {
			if (
				event.type === 'mousedown' &&
				languageRef.current &&
				!languageRef.current.contains(event.target as Node)
			) {
				setExpanded(false);
			}

			// Escape
			if (
				event.type === 'keydown' &&
				(event as globalThis.KeyboardEvent).key === 'Escape'
			) {
				setExpanded(false);
			}
		};

		document.addEventListener('keydown', handleInteraction);
		document.addEventListener('mousedown', handleInteraction);
		return () => {
			document.removeEventListener('keydown', handleInteraction);
			document.removeEventListener('mousedown', handleInteraction);
		};
	}, [setExpanded]);

	return (
		<li
			key={'languageSwitcher'}
			className={cx(outerStyles.navItem, 'customNavItem')}
			onClick={expandToggle}
			ref={languageRef}
		>
			<div
				className={cx(outerStyles.navLink, 'languageItem', {
					activeLang: expanded,
				})}
			>
				{tMenu('language')}
			</div>
			<div className={cx('localeList', { active: expanded })}>
				<div className={cx('localeItem', 'currentLocaleItem', 'visible')}>
					{currentLocale}
				</div>
				{otherLocales.map((otherLocale) => (
					<Link
						className={cx('localeItem', { visible: expanded })}
						key={otherLocale}
						locale={otherLocale}
						href={pathname}
					>
						{otherLocale.toUpperCase()}
					</Link>
				))}
			</div>
		</li>
	);
}
