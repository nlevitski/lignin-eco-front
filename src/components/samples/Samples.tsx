import Image from 'next/image';
import styles from './samples.module.scss';
import { Document, Product } from '@/dal/common';
// const cards = [
// 	{
// 		title: 'high-degree-purified-lignin',
// 		href: '/images/webp/pics/high-degree-purified-lignin.webp',
// 		caption: 'Лигнин высокой степени очистки',
// 	},
// 	{
// 		title: 'pellet-bricket-lignin',
// 		href: '/images/webp/pics/pellet-bricket-lignin.webp',
// 		caption: 'Пеллеты и брикет из лигнина',
// 	},
// 	{
// 		title: 'purified-lignin',
// 		href: '/images/webp/pics/purified-lignin.webp',
// 		caption: 'Лигнин очищенный технический',
// 	},
// ];
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
