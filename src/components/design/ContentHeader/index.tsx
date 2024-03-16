import { Hidden, Typography } from '@mui/material';
import styles from './index.module.scss';

const ContentHeader = (props: any) => {
	return (
		<>
			<div className={styles.headerDiv}>
				<Typography
					variant="h4"
					className={`${styles.header} 
          ${props.longTitle ? styles.longTitle : ''}`}
				>
					{props.title}
				</Typography>
			</div>
			<Hidden xsDown>
				<hr className={styles.hrDivider} />
			</Hidden>
		</>
	);
};

export default ContentHeader;
