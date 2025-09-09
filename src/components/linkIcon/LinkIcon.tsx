import { ReactNode } from 'react';
import styles from './linkIcon.module.scss';
type LinkIconProps = {
	href: string;
	children: ReactNode;
};
export const LinkIcon = ({ href, children }: LinkIconProps) => {
	return (
		<a className={styles.linkIcon} href={href}>
			{children}
		</a>
	);
};
