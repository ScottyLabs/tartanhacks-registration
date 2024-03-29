import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { ReactElement } from 'react';
import Text from '../Text';
import styles from './index.module.scss';
import Logo from '../Logo';
import clsx from 'clsx';

type WaveHeaderVariant = 'dark' | 'light';

interface WaveHeaderProps {
	variant: WaveHeaderVariant;
}

const WaveHeader = ({ variant }: WaveHeaderProps): ReactElement => {
	const wave = (
		<svg
			className={styles.waveSvg}
			viewBox="0 0 1440 420"
			preserveAspectRatio="none"
		>
			<path
				d="M1440 251.445C1337.08 331.37 1135.65 328.667 662.609 328.667C246.957 328.667 117.54 329.706 0 407L5.72619e-05 -248L1440 -248L1440 251.445Z"
				fill="url(#paint0_linear)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear"
					x1="720"
					y1="407"
					x2="720"
					y2="-248"
					gradientUnits="userSpaceOnUse"
				>
					<stop className={styles.waveSvgStart} />
					<stop className={styles.waveSvgEnd} offset="1" />
				</linearGradient>
			</defs>
		</svg>
	);
	const inner = new Map<WaveHeaderVariant, ReactElement>();
	inner.set(
		'dark',
		<div className={clsx(styles.headerAssets, styles.headerAssetsDark)}>
			<Link href="/">
				<Logo className={styles.logoLarge} variant="large" />
			</Link>
			<Typography variant="body1" className={styles.subtitle}>
				Feb 2-3, 2024
			</Typography>
		</div>,
	);

	inner.set(
		'light',
		<div className={`${styles.headerAssets} ${styles.light}`}>
			<Link href="/">
				<Logo className={styles.logo} variant="medium" />
			</Link>
			<div className={styles.link}>
				<NextLink href="/" passHref>
					<Link underline="none">
						<div className={styles.titleContainer}>
							<Text
								variant="h1"
								className={`${styles.title} ${styles.textDark}`}
							>
								TartanHacks
							</Text>
							<Text
								variant="h2"
								className={`${styles.subtitle} ${styles.textDark} ${styles.byline}`}
							>
								by ScottyLabs
							</Text>
						</div>
						<Text
							variant="h2"
							className={`${styles.subtitle} ${styles.textDark}`}
						>
							Feb 2-3, 2024
						</Text>
					</Link>
				</NextLink>
			</div>
		</div>,
	);

	return (
		<>
			<div className={styles.waveContainer}>
				{inner.get(variant)}
				{variant == 'dark' && wave}
			</div>
		</>
	);
};

export default WaveHeader;
