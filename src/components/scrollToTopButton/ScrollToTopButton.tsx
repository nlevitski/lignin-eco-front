'use client';
import { useEffect, useState } from 'react';
import styles from './scrollToTopButton.module.scss';

export default function ScrollTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > window.innerHeight) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className={styles.scrollTopBtn}
					title='Наверх'
				>
					<svg
						role='presentation'
						width='50'
						height='50'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							width='50'
							height='50'
							rx='50'
							fill='#ffffff'
							fillOpacity='0.90'
							stroke='none'
						></rect>
						<path
							d='M21 27L25.5 22L30 27'
							stroke='#000000'
							strokeWidth='1'
							fill='none'
						></path>
					</svg>
				</button>
			)}
		</>
	);
}
