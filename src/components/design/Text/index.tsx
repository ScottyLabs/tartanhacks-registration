import clsx from 'clsx';
import { ReactNode, ReactElement } from 'react';
import styles from './index.module.scss';

export type TextVariant =
	| 'hero'
	| 'h1'
	| 'h2'
	| 'body'
	| 'subtitle'
	| 'subtitle1'
	| 'button';

const Text = ({
	variant = 'body',
	children,
	className,
}: {
	variant?: TextVariant;
	children?: ReactNode;
	className?: string;
}): ReactElement => {
	return <div className={clsx(className, styles[variant])}>{children}</div>;
};

export default Text;
