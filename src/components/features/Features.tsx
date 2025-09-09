import { StrapiRichTextBlock } from '@/dal/common';
import styles from './features.module.scss';
import { Expandable } from '../expandable/Expandable';
import RichTextRenderer from '@/lib/RichTextRenderer';
type FeatureProps = {
	children: React.ReactNode;
	title: string;
	article: StrapiRichTextBlock[];
	documentId: string;
};
export const Features = async ({
	children,
	title,
	article,
	documentId,
}: FeatureProps) => {
	return (
		<div className={styles.features}>
			<h2 className={styles.title}>{title}</h2>
			<ul className={styles.featureList}>{children}</ul>
			{/* <Button
				href={'/application'}
				value={tButton('more')}
				type={'primary'}
				bold
				alignSelf
			/> */}
			<Expandable id={documentId} contentClassNames={styles.expandableContent}>
				<RichTextRenderer content={article} styles={styles} />
			</Expandable>
		</div>
	);
};
