'use client'
import { FC, useState } from 'react'
import styles from './Chats.module.scss'
import { useChats } from '@/hooks/useChats'
import MiniChat from '../mini-chat/MiniChat'
import { useProfile } from '@/hooks/useProfile'
import { User } from '@/shared/intreface/user.interface'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/useAction'
import { setChatId } from '@/store/slice/chat-select.slice'
import clsx from 'clsx'

const Chats: FC = () => {
	const me = useProfile()
	const chats = useChats(me?.id as number)
	const { chatId } = useAppSelector((state) => state.chat)
	const dispatch = useAppDispatch()
	return (
		<div className={clsx(styles.wrapper, {
		[styles.hidden]: !!chatId
		})}>
			{chats.length > 0 ? (
				chats.map((chat) => (
					<MiniChat
						key={chat.id}
						chat={chat}
						me={me as User}
						isSelectedChat={chat.id === chatId}
						onClick={() => dispatch(setChatId(chat.id == chatId ? null : chat.id))}
					/>
				))
			) : (
				<NoChats />
			)}
		</div>
	)
}
export default Chats

const NoChats: FC = () => {
	return (
		<div className={styles.center}>
			<span>No chats</span> {''}{' '}
			<Link href={'/auth/register'}> create one</Link>
		</div>
	)
}
