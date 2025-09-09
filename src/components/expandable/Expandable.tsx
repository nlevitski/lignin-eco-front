import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { getTranslations } from 'next-intl/server';
import styles from './expandable.module.scss';
type ExpandableProps = {
	id: string;
	children: ReactNode;
	contentClassNames?: string;
};
const cx = classNames.bind(styles);

export const Expandable = async ({
	id,
	children,
	contentClassNames = '',
}: ExpandableProps) => {
	const tButton = await getTranslations('button');

	return (
		<>
			<input type='checkbox' id={`toggle-${id}`} className={cx('checkbox')} />
			<label
				htmlFor={`toggle-${id}`}
				className={cx(
					'labelButton',
					'labelButton_primary',
					'labelButton_bold',
					'labelButton_alignSelf'
				)}
				style={{ textTransform: 'uppercase', fontWeight: 600 }}
			>
				<span className={cx('more')}>{tButton('more')}</span>
				<span className={cx('less')}>{tButton('less')}</span>
			</label>
			<div className={cx('expandableContent')}>
				<div className={styles.expandableBox}>
					<div className={contentClassNames}>{children}</div>
				</div>
			</div>
		</>
	);
};
