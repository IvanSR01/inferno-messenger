import { FC, useEffect, useRef } from 'react'
import styles from './ChatMain.module.scss'
import { useMessages } from './useMessage'
import { useAppSelector } from '@/hooks/useAction'
import { useProfile } from '@/hooks/useProfile'
import { User } from '@/shared/intreface/user.interface'
import MessageUI from '../../chats-screen-components/message/Message'
import SendMessage from '../send-message/SendMessage'

const ChatMain: FC = () => {
	const { chat } = useAppSelector((state) => state.chat)
	const profile = useProfile()
	const { messages } = useMessages({
		chatId: chat?.id as number,
		trigger: 'chat-main',
		userId: profile?.id as number,
	})

	return (
		<div className={styles.wrapper}>
			{!messages.length ? (
				<div className={styles.noMessages}>No messages</div>
			) : (
				<div className={styles.messages}>
					{messages.map((message, i) => (
						<MessageUI
							key={message.id}
							message={message as any}
							me={profile as User}
							isLastUserMessage={
								messages[i + 1]
									? messages[i + 1].user.id !== message.user.id
									: true
							}
							isFirstUserMessage={true}
						/>
					))}
				</div>
			)}

			<SendMessage chatId={chat?.id as number} userId={profile?.id as number} />
		</div>
	)
}
export default ChatMain
