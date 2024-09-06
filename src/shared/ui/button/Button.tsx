import { FC } from 'react'
import styles from './Button.module.scss'
import { ButtonProps } from './Button-type'
import clsx from 'clsx'

const Button: FC<ButtonProps> = ({
	children,
	type,
	className,
	onClick,
	style,
	altStyle,
}) => {
	return (
		<button
			style={style}
			type={type}
			onClick={onClick}
			className={clsx(styles.button, className, {
				[styles.altStyle]: altStyle,
			})}
		>
			{children}
		</button>
	)
}
export default Button
