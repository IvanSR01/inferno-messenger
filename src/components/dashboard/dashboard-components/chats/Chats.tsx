/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/useAction'
import { useChannels } from '@/hooks/useChannels'
import { useChats } from '@/hooks/useChats'
import { useProfile } from '@/hooks/useProfile'
import { User } from '@/shared/intreface/user.interface'
import { setChatId, setSelectChatType } from '@/store/slice/chat-select.slice'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FC, useContext, useEffect } from 'react'
import MiniChannel from '../mini-channel/MiniChannel'
import MiniChat from '../mini-chat/MiniChat'
import ToggleChats from '../toggle-chats/ToggleChats'
import styles from './Chats.module.scss'
import { useFilter } from '@/hooks/useFilter'
import { LanguageContext } from '@/providers/LanguageProvider'

const Chats: FC = () => {
	const {user: me} = useProfile()
	const chats = useChats(me?.id as number)
	const channel = useChannels()
	const { chat: selectChat, selectChatType } = useAppSelector(
		(state) => state.chat
	)
	const filter = useAppSelector((state) => state.search.search)
	const chatsFilter = useFilter(chats, 'chat', filter, me)
	const channelFilter = useFilter(channel as any[], 'channel', filter, me)
	const { language } = useContext(LanguageContext)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (selectChatType === 'chats') {
			// dispatch(setChatId(selectChat))
		}
	}, [chats, channel])
	return (
		<div
			className={clsx(styles.wrapper, {
				[styles.hidden]: !!selectChat?.id,
			})}
		>
			<ToggleChats
				languageData={[
					`${language === 'ENG' ? 'Chats' : 'Чаты'}`,
					`${language === 'ENG' ? 'Channels' : 'Каналы'}`,
				]}
				selectData={['chats', 'channel']}
				onClick={(value: any) => dispatch(setSelectChatType(value))}
			/>
			<AnimatePresence>
				{selectChatType === 'chats' ? (
					<>
						{chatsFilter.length > 0 ? (
							chatsFilter.map((chat, i) => (
								<MiniChat
									key={chat.id}
									chat={chat}
									me={me as User}
									isSelectedChat={chat.id === selectChat?.id}
									i={i}
									onClick={() =>
										dispatch(setChatId(chat.id == selectChat?.id ? null : chat))
									}
								/>
							))
						) : (
							<NoChats />
						)}
					</>
				) : (
					<>
						{channelFilter?.length > 0 ? (
							channelFilter?.map((chat, i) => (
								<MiniChannel
									key={chat.id}
									name={chat.name}
									avatar={chat.avatar as string}
									isSelectedChat={chat.id === selectChat?.id}
									lastPost={
										chat.posts ? chat.posts[chat.posts.length - 1] : undefined
									}
									i={i}
									onClick={() =>
										dispatch(setChatId(chat.id == selectChat?.id ? null : chat))
									}
								/>
							))
						) : (
							<NoChats />
						)}
					</>
				)}
			</AnimatePresence>
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
