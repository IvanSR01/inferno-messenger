'use client'
import clsx from 'clsx'
import { FC, forwardRef } from 'react'
import { InputProps } from './Input-type'
import styles from './Input.module.scss'

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			onChange,
			value,
			placeholder,
			type = 'text',
			helperText,
			error,
			pending,
			style,
			icon,
			...rest
		},
		ref
	) => {
		return (
			<div
				className={clsx(styles.group, {
					[styles.error]: error,
					[styles.pending]: pending,
				})}
				style={style}
			>
				<input
					type={type}
					className={styles.input}
					onChange={onChange}
					value={value}
					placeholder={placeholder}
					disabled={pending}
					ref={ref}
					{...rest}
				/>
				{icon && <div className={styles.icon}>{icon}</div>}
				{helperText && <p className={styles.helperText}>{helperText}</p>}
			</div>
		)
	}
)
Input.displayName = 'Input'

export default Input
