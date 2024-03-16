import { ReactElement } from 'react';
import styles from './index.module.scss';

const MenuLine = (): ReactElement => {
	return (
		<svg className={styles.menuLine} viewBox="0 0 422 7">
			<line
				x1="3.5"
				y1="3.5"
				x2="418.5"
				y2="3.5"
				stroke="white"
				strokeOpacity="0.3"
				strokeWidth="7"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default MenuLine;
