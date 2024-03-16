import { FunctionComponent, ReactElement } from 'react';
import styles from './index.module.scss';

/**
 * A basic centered layout containing a dialog centered to the middle of the page
 */
const DialogLayout = (Page: FunctionComponent) => (): ReactElement => {
	return (
		<>
			<div className={styles.dialog}>
				<Page />
			</div>
		</>
	);
};

export default DialogLayout;
