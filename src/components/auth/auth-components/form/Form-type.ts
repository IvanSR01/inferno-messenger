import { IInput } from '../../input.data'

export type FormProps = {
	isPending: boolean
	inputData: IInput[]
	onSubmit: any
	name: 'login' | 'register'
}
