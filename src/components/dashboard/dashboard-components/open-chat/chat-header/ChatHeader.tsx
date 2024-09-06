import { FC, useState } from 'react'
import styles from './ChatHeader.module.scss'
import { Chat } from '@/shared/intreface/chat.intreface'
import { User } from '@/shared/intreface/user.interface'
import { useAppDispatch } from '@/hooks/useAction'
import { setChatId } from '@/store/slice/chat-select.slice'
import { Fa42Group, FaArrowLeft } from 'react-icons/fa6'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useGetUserStatus } from './useGetStatus'
import clsx from 'clsx'
import { GoInfo } from 'react-icons/go'
import ChatDetails from '../../chats-screen-components/chat-details/ChatDetails'
import { useRouter } from 'next/navigation'

interface Props {
	chat: Chat
	interlocutor: User
}

const ChatHeader: FC<Props> = ({ chat, interlocutor }) => {
	return chat.isPersonal ? (
		<PersonalChatHeader chat={chat} interlocutor={interlocutor} />
	) : (
		<GroupChatHeader chat={chat} />
	)
}
export default ChatHeader

const PersonalChatHeader: FC<Props> = ({ interlocutor, chat }) => {
	const status = useGetUserStatus(interlocutor.id)
	return (
		<div className={styles.wrapper}>
			<BackArrow />
			<div className={styles.center}>
				<UserAvatar
					src={interlocutor?.picture}
					alt={interlocutor?.fullName}
					size="large"
				/>
				<div className={styles.detalls}>
					<div className={styles.name}>{interlocutor?.fullName}</div>
					<div>
						{chat.typing.length > 0 ? (
							<div className={styles.status}>typing...</div>
						) : (
							<>
								{status?.isOnline ? (
									<div className={styles.status}>Online</div>
								) : (
									<div className={styles['last-seen']}>
										Last seen: {status?.lastSeen.toLocaleString()}
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			<Details />
		</div>
	)
}

const GroupChatHeader: FC<Omit<Props, 'interlocutor'>> = ({ chat }) => {
	return (
		<div className={styles.wrapper}>
			<BackArrow />
			<div className={styles.center}>
				<UserAvatar src={chat?.avatar} alt={chat?.name} size="large" />
				<div className={styles.detalls}>
					<div className={styles.name}>{chat?.name}</div>
					<div className={styles.status}>
						{chat.typing.length > 0 && 'typing...'}
					</div>
				</div>
			</div>
			<Details />
		</div>
	)
}

const BackArrow: FC = () => {
	const dispatch = useAppDispatch()
	return (
		<div className={styles.back} onClick={() => dispatch(setChatId(null))}>
			<FaArrowLeft />
		</div>
	)
}

const Details: FC<{
	user?: User | undefined
}> = ({
	user
}) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const {push} = useRouter()
	return (
		<div className={styles['detalis-modal']}>
			<GoInfo onClick={() => user ? push(`/user/${user.id}`) : setShowModal(true)} />
			<ChatDetails showModal={showModal} setShowModal={setShowModal} />
		</div>
	)
}
