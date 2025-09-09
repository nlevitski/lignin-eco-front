import Link from 'next/link';
import { Socials } from '../socials/Socials';
import styles from './footer.module.scss';
import { FooterMap } from '../map/Map';
import { Document, FooterSection } from '@/dal/common';
import { getTranslations } from 'next-intl/server';

type FooterProps = {
	sitemapLink: Document<SitemapLink>;
	footer: Document<FooterSection>;
};
type SitemapLink = {
	value: string;
	link: string;
};

export const Footer = async ({ footer, sitemapLink }: FooterProps) => {
	const t = await getTranslations('footer');

	return (
		<footer className={styles.footer} id={footer.documentId}>
			<div className={styles.container}>
				<h2 className={`${styles.title} ${styles.center}`}>{footer.title}</h2>
				<h3 className={`${styles.entity} ${styles.center}`}>{footer.entity}</h3>
				<dl className={styles.contacts}>
					<dt>{t('phonesMessengers')}</dt>
					{footer.phones.map((phone) => (
						<dd key={phone.id}>
							<span className={styles.phone}>{phone.value}</span>
						</dd>
					))}
					<dt className={styles.emailDt}>{t('email')}&nbsp;</dt>
					<dd className={styles.emailDd}>{footer.email}</dd>
					<dd>{footer.countryOfOrigin}</dd>
				</dl>
				<Link className={styles.link} href={sitemapLink.link}>
					{sitemapLink.value}
				</Link>
				<Socials />
				<FooterMap />
			</div>
		</footer>
	);
};
