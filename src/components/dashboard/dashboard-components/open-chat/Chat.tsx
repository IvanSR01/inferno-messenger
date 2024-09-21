import Loader from '@/components/loader/Loader'
import { useAppSelector } from '@/hooks/useAction'
import { useProfile } from '@/hooks/useProfile'
import chatService from '@/services/chat-service/chat.service'
import { useQuery } from '@tanstack/react-query'
import styles from './OpenChat.module.scss'
import ChatHeader from './chat-header/ChatHeader'
import { Chat as TChat } from '@/shared/intreface/chat.intreface'
import { getInterlocutor } from '@/shared/utils/getInterlocutor'
import { User } from '@/shared/intreface/user.interface'
import ChatMain from './chat-main/ChatMain'
import { useChat } from './useChat'
import { useTyping } from './useTyping'
export default function Chat() {
	const { chat } = useAppSelector((state) => state.chat)
	const me = useProfile()
	const { data: chatFromQuery } = useQuery({
		queryKey: ['chat', chat?.id],
		queryFn: () => chatService.getChat(chat?.id as number),
		enabled: !!chat?.id,
	})
	const data = useChat(chat?.id as number, chatFromQuery as TChat)

	return (
		<div className={styles.chat}>
			<ChatHeader
				chat={
					{
						...data,
						avatar: data?.isPersonal
							? getInterlocutor(data?.users, me as User).picture
							: data?.avatar,
						name: data?.isPersonal
							? getInterlocutor(data?.users, me as User).fullName
							: data?.name,
					} as TChat
				}
				me={me as User}
				type={'chat'}
			/>
			<ChatMain />
		</div>
	)
}
