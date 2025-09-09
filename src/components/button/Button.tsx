import styles from './button.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { CSSProperties } from 'react';

const cx = classNames.bind(styles);
type ButtonProps = {
	value: string;
	type?: 'primary' | 'secondary' | 'tertiary';
	bold?: boolean;
	semibold?: boolean;
	extraBold?: boolean;
	large?: boolean;
	big?: boolean;
	reducePaddingH?: boolean;
	alpha50?: boolean;
	href?: string;
	alignSelf?: boolean;
	style?: CSSProperties;
	disabled?: boolean;

	onClick?: (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => void;
};

export const Button = ({
	value,
	type = 'primary',
	bold = false,
	semibold = false,
	href = '',
	large = false,
	big = false,
	extraBold = false,
	reducePaddingH = false,
	alpha50 = false,
	alignSelf = false,
	disabled = false,
	style = {},
	onClick,
}: ButtonProps) => {
	const resultCx = cx('button', `button_${type}`, {
		button_bold: bold,
		button_semibold: semibold,
		button_big: big,
		button_extraBold: extraBold,
		button_large: large,
		button_reducePaddingH: reducePaddingH,
		button_alpha50: alpha50,
		button_alignSelf: alignSelf,
		button_disabled: disabled,
	});
	return href ? (
		<Link href={href} className={resultCx} onClick={onClick} style={style}>
			{value}
		</Link>
	) : (
		<button
			className={resultCx}
			onClick={onClick}
			style={style}
			disabled={disabled}
		>
			{value}
		</button>
	);
};
