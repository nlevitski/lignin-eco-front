import styles from './burger.module.scss';

export const Burger = ({ isActive = false }: { isActive?: boolean }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		version='1.1'
		viewBox='0 0 32 32'
		width='32px'
		className={`${styles.burgerIcon} ${isActive ? styles.active : ''}`}
	>
		<path
			className={`${styles.line} ${styles.topLine}`}
			fill='currentColor'
			d='M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z'
		/>
		<path
			className={`${styles.line} ${styles.middleLine}`}
			fill='currentColor'
			d='M28,14H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z'
		/>
		<path
			className={`${styles.line} ${styles.bottomLine}`}
			fill='currentColor'
			d='M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,22,28,22z'
		/>
	</svg>
);
