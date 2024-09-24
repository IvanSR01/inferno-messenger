'use client'
import { FC, useContext } from 'react'
import styles from './NotFound.module.scss'
import Link from 'next/link'
import { useProfile } from '@/hooks/useProfile'
import { LanguageContext } from '@/providers/LanguageProvider'

const NotFound: FC = () => {
	const profile = useProfile()
	const {language} = useContext(LanguageContext)
	return (
		<div className={styles.wrapper}>
			<h1>404 {":')"}</h1>
			<p>{language === 'ENG' ? 'Page not found' : 'Страница не найдена'}</p>
			<span>
				{language === 'ENG' ? 'Go to ' : 'Перейти на '} {' '}
				{profile ? (
					<Link href="/dashboard/chats">{language === 'ENG' ? 'Chat page' : 'Страницу чата'}</Link>
				) : (
					<Link href="/auth/login">{language === 'ENG' ? 'Auth page' : 'Страницу авторизации'}</Link>
				)}
			</span>
		</div>
	)
}
export default NotFound
