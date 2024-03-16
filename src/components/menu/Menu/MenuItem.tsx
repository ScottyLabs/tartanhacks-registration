import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { ReactElement } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

const MenuItem = ({
	text,
	url,
	id,
}: {
	text: string;
	url: string;
	id: number;
}): ReactElement => {
	let linkColorClass;
	switch (id % 4) {
		case 0:
			linkColorClass = styles.menuItem0;
			break;
		case 1:
			linkColorClass = styles.menuItem1;
			break;
		case 2:
			linkColorClass = styles.menuItem2;
			break;
		case 3:
			linkColorClass = styles.menuItem3;
			break;
	}
	return (
		<NextLink href={url} passHref>
			<Link className={clsx(styles.link, linkColorClass)}>
				<div className={styles.menuItem}>
					<Typography variant="h5">{text}</Typography>
				</div>
			</Link>
		</NextLink>
	);
};

export default MenuItem;
