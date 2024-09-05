/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import useAuth from '@/hooks/useAuth'
import { useError } from '@/hooks/useError'
import { AuthResponse } from '@/shared/intreface/auth-response.interface'
import { TypeLogin } from '@/shared/types/auth.type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Form from '../auth-components/form/Form'
import OAuth from '../auth-components/oauth/OAuth'
import styles from './LoginScreen.module.scss'
import { Input } from '@/screens/auth/auth.data'
import { FC } from 'react'
import AuthLayoutPage from '../auth-layout-page/AuthLayoutPage'
interface Props {
	inputData: Input[]
}

const LoginScreen: FC<Props> = ({ inputData }) => {
	const { push } = useRouter()
	const { onSubmit, isPending } = useAuth<TypeLogin, AuthResponse>({
		api: 'login',
		onError: (err) => toast.error(useError(err)),
		onSuccess: (data) => {
			if (data.isVerified) push('/dashboard/chats')
			else push('/auth/email')
		},
	})

	return (
		<AuthLayoutPage image='/auth/login.jpg' imageOrder='left'>
			<h2 className={styles.heading}>Login</h2>
			<Form
				name="login"
				inputData={inputData}
				onSubmit={onSubmit}
				isPending={isPending}
			/>
			<p className={styles.or}>Or</p>
			<OAuth />
			<div className={styles.footer}>
				You dont have an account? <Link href="/auth/register">Register</Link>
			</div>
		</AuthLayoutPage>
	)
}

export default LoginScreen
