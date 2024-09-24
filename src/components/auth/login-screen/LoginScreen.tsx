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
import { FC, useContext } from 'react'
import AuthLayoutPage from '../auth-layout-page/AuthLayoutPage'
import { getLocalStorage } from '@/shared/local/local'
import { LanguageContext } from '@/providers/LanguageProvider'
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
	const { language } = useContext(LanguageContext)
	return (
		<AuthLayoutPage image="/auth/login.jpg" imageOrder="left">
			<h2 className={styles.heading}>
				{language === 'ENG' ? 'Login' : 'Вход'}
			</h2>
			<Form
				name="login"
				inputData={inputData}
				onSubmit={onSubmit}
				isPending={isPending}
				button={language === 'ENG' ? 'Login' : 'Вход'}
			/>
			<p className={styles.or}>{language === 'ENG' ? 'Or' : 'Или'}</p>
			<OAuth />
			<div className={styles.footer}>
				{language === 'ENG' ? 'Don’t have an account?' : 'Нет аккаунта?'}{' '}
				<Link href="/auth/register">
					{language === 'ENG' ? 'Create one' : 'Создать'}
				</Link>
			</div>
		</AuthLayoutPage>
	)
}

export default LoginScreen
