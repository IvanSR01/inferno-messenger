'use client'
import { useAppSelector } from '@/hooks/useAction'
import { FC } from 'react'
import Chat from './Chat'
import styles from './OpenChat.module.scss'
import clsx from 'clsx'
const OpenChat: FC = () => {
	const { chatId } = useAppSelector((state) => state.chat)
	return (
		<div className={clsx(styles.wrapper, {
			[styles.hidden]: !chatId
		})}>
			{chatId ? (
				<Chat/>
			) : (
				<>No chat selected</>
			)}
		</div>
	)
}
export default OpenChat
