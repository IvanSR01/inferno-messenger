'use client'
import { useAppSelector } from '@/hooks/useAction'
import { FC, useContext } from 'react'
import Chat from './Chat'
import styles from './OpenChat.module.scss'
import clsx from 'clsx'
import { LanguageContext } from '@/providers/LanguageProvider'
const OpenChat: FC = () => {
	const { chat, selectChatType } = useAppSelector((state) => state.chat)
	const { language } = useContext(LanguageContext)
	return (
		<div
			className={clsx(styles.wrapper, {
				[styles.hidden]: !chat?.id,
			})}
		>
			{chat?.id ? (
				<Chat />
			) : (
				<div className={styles.no}>
					{language === 'ENG' ? 'No chat selected' : 'Вы не выбрали чат'}
				</div>
			)}
		</div>
	)
}
export default OpenChat
