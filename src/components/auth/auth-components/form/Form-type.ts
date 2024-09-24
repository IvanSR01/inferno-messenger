import { Input } from "@/screens/auth/auth.data"

export type FormProps = {
	isPending: boolean
	inputData: Input[]
	onSubmit: any
	name: 'login' | 'register'
	button: string
}
