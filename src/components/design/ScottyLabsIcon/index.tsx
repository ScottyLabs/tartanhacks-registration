import React, { ReactElement } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

const ScottyLabsIcon = ({ className }: { className: string }): ReactElement => {
	return (
		<div className={clsx(className, styles.svgContainer)}>
			<svg viewBox="0 0 697 550" fill="none">
				<path d="M35.4008 598H0C0 537.395 10.9574 478.485 32.4508 423.389C40.8795 402.198 50.5726 381.855 61.9514 361.936L66.5872 353.884L75.8589 353.036C93.9808 351.765 122.639 347.95 155.089 336.084C202.29 319.131 240.641 292.007 269.299 255.559C291.635 227.164 307.229 194.53 315.657 158.082L277.728 24.1573L313.55 0L323.665 7.62863C346.844 25.005 371.287 41.5337 396.573 55.5195C412.588 64.8434 429.446 73.3196 446.303 80.9483C478.754 79.6768 511.626 76.2863 543.655 71.6244C583.692 65.691 623.729 57.6385 662.922 47.0432L678.937 42.8051L684.416 58.91C694.109 88.5769 698.323 119.091 696.638 150.03C695.373 179.273 688.63 207.668 677.251 234.369L644.801 220.383C654.494 197.497 659.972 172.916 661.237 147.911C662.501 127.144 660.394 106.377 655.337 86.034C620.357 94.9341 584.535 102.139 548.713 107.225C514.155 112.31 478.754 115.277 443.353 116.972H439.139L435.346 115.277C416.381 106.377 397.416 97.0531 378.873 86.4578C359.487 75.4387 340.101 63.1481 321.557 50.0099L352.744 157.235L351.901 161.473C342.208 205.125 324.086 244.116 297.535 277.597C264.663 319.555 220.834 350.069 167.311 369.565C136.125 380.584 108.31 385.67 88.0806 387.789C79.6518 403.47 72.066 419.999 65.323 436.527C45.5154 487.385 35.4008 541.633 35.4008 598Z" />
				<path d="M129.803 598V590.795C129.803 572.995 134.439 559.433 143.289 550.957C157.197 538.243 177.847 539.09 179.111 539.09H179.533H433.66H434.503H435.767C437.032 539.09 453.889 537.819 466.111 549.262C476.647 559.01 482.125 575.114 482.125 598H517.526C517.526 564.519 507.833 539.09 489.29 522.138C466.954 502.219 439.56 503.066 432.817 503.49H181.64C175.319 503.066 143.711 502.642 119.689 524.257C102.831 539.514 94.4023 561.976 94.4023 590.372V597.576H129.803V598Z" />
				<path d="M547.87 344.56C571.471 425.932 582.428 511.118 581.164 598H616.565C617.829 507.728 606.029 419.151 582.007 334.388C576.949 317.012 571.471 299.635 565.149 282.683L641.008 314.045L654.494 280.988L549.977 237.759L522.584 270.392L526.377 280.14C534.384 301.331 541.549 322.945 547.87 344.56Z" />
			</svg>
		</div>
	);
};

export default ScottyLabsIcon;
