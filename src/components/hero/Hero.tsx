import { Document, HeroSection } from '@/dal/common';
import styles from './hero.module.scss';

type HeroProps = {
	data: Document<HeroSection>;
};

export const Hero = ({
	data: { title, subtitle, background, documentId },
}: HeroProps) => {
	const { 0: desktop, 1: mobile } = background;
	return (
		<>
			<style>
				{`
        @media (min-width: 240px) and (max-width: 319px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${mobile.formats.xsmall.url});
          }
        }
        @media (min-width: 320px) and (max-width: 480px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${mobile.formats.small.url});
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${mobile.formats.medium.url});
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${desktop.formats.medium.url});
          }
        }
        @media (min-width: 1025px) and (max-width: 1440px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${desktop.formats.large.url});
          }
        }
        @media (min-width: 1441px) and (max-width: 1920px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${desktop.formats.xlarge.url});
          }
        }
        @media (min-width: 1921px) {
          .container-${documentId} {
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${desktop.url});
          }
        }
        `}
			</style>
			<div className={`${styles.container} container-${documentId}`}>
				<h1 className={styles.title}>{title}</h1>
				<h2 className={styles.subtitle}>{subtitle}</h2>
				{/* <RichTextRenderer content={content} styles={styles} /> */}
				{/* <Button
					value={'Оставить заявку'}
					bold
					big
					href={'#feedback-section'}
					alpha50
				/> */}
			</div>
		</>
	);
};
