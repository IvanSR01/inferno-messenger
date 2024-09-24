/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useError } from '@/hooks/useError'
import { TypeRegister } from '@/shared/types/auth.type'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Form from '../auth-components/form/Form'
import OAuth from '../auth-components/oauth/OAuth'
import styles from './RegisterScreen.module.scss'
import { useRouter } from 'next/navigation'
import { AuthResponse } from '@/shared/intreface/auth-response.interface'
import { FC, useContext } from 'react'
import useAuth from '@/hooks/useAuth'
import { Input } from '@/screens/auth/auth.data'
import AuthLayoutPage from '../auth-layout-page/AuthLayoutPage'
import { LanguageContext } from '@/providers/LanguageProvider'

interface Props {
	inputData: Input[]
}

const RegisterScreen: FC<Props> = ({ inputData }) => {
	const { push } = useRouter()
	const { onSubmit, isPending } = useAuth<TypeRegister, AuthResponse>({
		api: 'register',
		onError: (err) => toast.error(useError(err)),
		onSuccess: (data) => {
			push('/dashboard/chats')
		},
	})
	const { language } = useContext(LanguageContext)
	return (
		<AuthLayoutPage image="/auth/register.jpg" imageOrder="right">
			<h2 className={styles.heading}>
				{language === 'ENG' ? 'Register' : 'Регистрация'}
			</h2>
			<Form
				name="register"
				inputData={inputData}
				onSubmit={onSubmit}
				isPending={isPending}
				button={language === 'ENG' ? 'Register' : 'Регистрация'}
			/>
			<p className={styles.or}>Or</p>
			<OAuth />
			<div className={styles.footer}>
				{language === 'ENG' ? 'Already have an account?' : 'Уже есть аккаунт?'}{' '}
				<Link href="/auth/login">{language === 'ENG' ? 'Login' : 'Вход'}</Link>
			</div>
		</AuthLayoutPage>
	)
}

export default RegisterScreen
