'use client'
import { FC } from 'react'
import styles from './NotFound.module.scss'
import Link from 'next/link'
import { useProfile } from '@/hooks/useProfile'

const NotFound: FC = () => {
	const profile = useProfile()
	return (
		<div className={styles.wrapper}>
			<h1>404 {":')"}</h1>
			<p>Page not found</p>
			<span>
				Return to{' '}
				{profile ? (
					<Link href="/dashboard/chats">Chat page</Link>
				) : (
					<Link href="/auth/login">Auth page</Link>
				)}
			</span>
		</div>
	)
}
export default NotFound
