import Image from 'next/image';
import styles from './brief.module.scss';
import { CSSProperties } from 'react';
import { SingleMedia, StrapiRichTextBlock } from '@/dal/common';
import RichTextRenderer from '@/lib/RichTextRenderer';
import { Expandable } from '../expandable/Expandable';

type BriefProps = {
	title: string;
	background: SingleMedia;
	cover: SingleMedia;
	teaser: StrapiRichTextBlock[];
	integratedInfo: string | null;
	content?: StrapiRichTextBlock[];
	mission?: string;
	aspectRatio?: CSSProperties;
	style?: CSSProperties;
	id?: string;
	mobileBgOff?: boolean;
};

export const Brief = async ({
	title,
	teaser,
	integratedInfo,
	content = [],
	mission = '',
	id = '',
	background,
	cover,
	aspectRatio = {},
	style = {},
	mobileBgOff = false,
}: BriefProps) => {
	return (
		<>
			<style>
				{`
          @media (min-width: 960px) {
              .container-${id} {
                background-image: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%), url(${
									background?.formats?.large?.url ||
									background?.formats?.medium?.url ||
									background?.formats?.small?.url
								});
              }
        `}
			</style>
			<div
				className={`${styles.container} ${styles.container_bgFixed} container-${id}`}
			>
				<div
					className={`${styles.wrapper} ${
						mobileBgOff ? styles.mobileBgOff : ''
					}`}
					id={id}
				>
					<div className={styles.holder}>
						<div className={styles.imgWrapper}>
							<div
								className={styles.imgBox}
								style={{ aspectRatio: 1, ...aspectRatio }}
							>
								<Image
									src={
										cover?.url ||
										cover?.formats?.large?.url ||
										cover?.formats?.medium?.url ||
										cover?.formats?.small?.url ||
										''
									}
									alt={cover?.alternativeText || ''}
									sizes='(max-width: 768px) 80vw, 35vw'
									fill
									style={{ objectFit: 'cover', ...style }}
									fetchPriority='high'
								/>
							</div>
						</div>
						<h2 className={`${styles.title} ${styles.upper}`}>
							{title}
							<hr className={styles.hrLong} />
						</h2>

						<div className={styles.contentBox}>
							{mission && (
								<p>
									<strong>
										<em>{mission}</em>
									</strong>
								</p>
							)}
							<RichTextRenderer content={teaser} styles={styles} />
						</div>
					</div>
					<Expandable id={id} contentClassNames={styles.expandableContentBox}>
						<>
							{!!integratedInfo && (
								<div className={styles.integratedInfo}>{integratedInfo}</div>
							)}
							<RichTextRenderer content={content} classNames={styles} />
						</>
					</Expandable>
				</div>
			</div>
		</>
	);
};
