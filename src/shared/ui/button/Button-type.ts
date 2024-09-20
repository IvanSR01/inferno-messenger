import { CSSProperties, ReactNode } from 'react'
import { colors } from './Button'

export type ButtonProps = {
	className?: string
	style?: CSSProperties
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	children?: ReactNode
	altStyle?: boolean
	color?: keyof typeof colors
	disabled?: boolean
}
