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
	return (
		<NextLink href={url} passHref>
			<Link className={clsx(styles.link)}>
				<div className={styles.menuItem}>
					<Typography variant="h5">{text}</Typography>
				</div>
			</Link>
		</NextLink>
	);
};

export default MenuItem;
