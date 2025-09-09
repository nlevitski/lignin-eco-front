'use client';
// import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './map.module.scss';

export const FooterMap = () => {
	return (
		<div className={styles.box}>
			<div className={styles.wrapper}>
				{/* <YMaps>
					<Map
						defaultState={{
							center: [55.751574, 37.573856], // Координаты центра (Москва)
							zoom: 10, // Масштаб
						}}
						className={styles.map}
					>
						<Placemark geometry={[55.751574, 37.573856]} />
					</Map>
				</YMaps> */}
			</div>
		</div>
	);
};
