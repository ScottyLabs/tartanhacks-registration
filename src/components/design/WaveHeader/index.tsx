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
			<span className={clsx(styles.smallsubtitle, styles.byline)}>
				Feb 7-8, 2025
			</span>
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
							<div className={styles.subContainer}>
								<span className={clsx(styles.title, styles.textDark)}>
									TartanHacks
								</span>
								<span className={clsx(styles.subsubtitle, styles.textDark, styles.byline)}>
									by
								</span>
								<span className={clsx(styles.subtitle, styles.textDark, styles.byline)}>
									ScottyLabs
								</span>
							</div>
						</div>
						<span className={clsx(styles.subsubtitle, styles.textDark, styles.byline)}>
							Feb 7-8, 2025
						</span>
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
