import RichTextRenderer from '@/lib/RichTextRenderer';
import { Document, AboutUsSection } from '@/dal/common';
import styles from './aboutUs.module.scss';
import { Samples } from '../samples/Samples';
import classNames from 'classnames/bind';

type AboutUsProps = {
	data: Document<AboutUsSection>;
};
const cx = classNames.bind(styles);
export const AboutUs = ({ data }: AboutUsProps) => {
	const { products, background, title, productsTitle, documentId } = data;

	return (
		<>
			<style>
				{`
          @media (min-width: 960px) {
              .container-${documentId} {
                background-image: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%), url(${
									background[0]?.formats?.large?.url ||
									background[0]?.formats?.medium?.url ||
									background[0]?.formats?.small?.url
								});
              }
        `}
			</style>
			<div
				className={`${styles.container} ${styles.container_bgFixed} container-${documentId}`}
			>
				<div
					className={cx('wrapper', {
						mobileBgOff: false,
					})}
					id={documentId}
				>
					<div className={styles.holder}>
						<h2 className={styles.heading2}>{title}</h2>
						<RichTextRenderer content={data.content} styles={styles} />
					</div>
					<h3 className={styles.productsTitle}>{productsTitle}</h3>
					<Samples samples={products} />
				</div>
			</div>
		</>
	);
};
