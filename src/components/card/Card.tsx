import classNames from 'classnames/bind';
import styles from './card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
type CardProps = {
	imgUrl: string;
	imgAlt: string;
	caption: string;
	captionAnchorId: string;
};

export const Card = ({
	caption,
	captionAnchorId,
	imgUrl,
	imgAlt,
}: CardProps) => {
	const cx = classNames.bind(styles);
	return (
		<div className={cx('card')}>
			<div className={cx('imgBox')}>
				<Image
					className={cx('img')}
					src={imgUrl}
					alt={imgAlt}
					fill
					sizes='(max-width: 769px) 116px, 300px'
					fetchPriority='high'
					unoptimized
				/>
			</div>
			<div className={cx('caption')}>
				{captionAnchorId ? (
					<Link href={`#${captionAnchorId}`}>{caption}</Link>
				) : (
					caption
				)}
			</div>
		</div>
	);
};
