import Image from 'next/image';
import styles from './samples.module.scss';
import { Document, Product } from '@/dal/common';

type SamplesProps = {
	samples: Document<Product>[];
};

export const Samples = ({ samples }: SamplesProps) => {
	return (
		<div className={styles.panel}>
			{samples.map((sample, i) => {
				return (
					<div className={styles.card} key={i}>
						<div className={styles.imgBox}>
							<Image
								className={styles.img}
								alt={sample.image.alternativeText}
								fill
								sizes='280px'
								src={sample.image.url}
								fetchPriority='high'
							/>
						</div>
						<div className={styles.caption}>{sample.caption}</div>
					</div>
				);
			})}
		</div>
	);
};
