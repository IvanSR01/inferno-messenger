import { CSSProperties, ReactNode } from "react"

export type ButtonProps = {
	className?: string
	style?: CSSProperties
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	children?: ReactNode
	altStyle?: boolean
}