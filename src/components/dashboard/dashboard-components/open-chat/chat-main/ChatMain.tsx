import { useAppSelector } from '@/hooks/useAction'
import { useProfile } from '@/hooks/useProfile'
import { User } from '@/shared/intreface/user.interface'
import { FC, useEffect, useRef } from 'react'
import MessageUI from '../../message/Message'
import SendMessage from '../../send-message/Send'
import styles from './ChatMain.module.scss'
import Background from '../../background/Background'
import { useMessages } from './useMessage'
import { useSendMessage } from '@/hooks/useMessages'
import { useTyping } from '../useTyping'

const ChatMain: FC = () => {
	const { chat } = useAppSelector((state) => state.chat)
	const profile = useProfile()
	const { messages } = useMessages({
		chatId: chat?.id as number,
		trigger: 'chat-main',
		userId: profile?.id as number,
	})
	const send = useSendMessage()

	// Создаем ref для самого контейнера с сообщениями
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	// Прокручиваем контейнер к концу при изменении списка сообщений
	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [messages])
	const { handleTyping } = useTyping({
		userId: profile?.id as number,
		chatId: chat?.id as number,
	})

	const handleSendMessage = (content: string) => {
		console.log(content)
		send({ chatId: chat?.id as number, content, userId: profile?.id as number })
	}

	return (
		<div className={styles.wrapper}>
			{!messages.length ? (
				<div className={styles.noMessages}>No messages</div>
			) : (
				<div className={styles.messages} ref={messagesContainerRef}>
					<Background src={chat?.background} />
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

			<SendMessage handleSend={handleSendMessage} contentType="message" handleTyping={handleTyping} />
		</div>
	)
}

export default ChatMain
