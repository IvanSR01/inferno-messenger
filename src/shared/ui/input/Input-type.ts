import { CSSProperties } from 'react'

export type InputProps = {
	onChange?: ((value: string) => void) | any
	value?: string
	placeholder?: string
	type?: string
	helperText?: string
	error?: boolean
	pending?: boolean
	icon?: JSX.Element
	style?: CSSProperties
}
