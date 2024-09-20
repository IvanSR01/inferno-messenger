import { FC } from 'react'
import styles from './Button.module.scss'
import { ButtonProps } from './Button-type'
import clsx from 'clsx'

export const colors = {
	yellow: styles.yellow,
	green: styles.green,
	blue: styles.blue,
	red: styles.red,
}

const Button: FC<ButtonProps> = ({
	children,
	type,
	className,
	onClick,
	style,
	altStyle,
	color, 
	disabled
}) => {
	return (
		<button
			style={style}
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(styles.button, className, {
				[styles.altStyle]: altStyle,
				[colors[color as keyof typeof colors]]: color,
			})}
		>
			{children}
		</button>
	)
}
export default Button
