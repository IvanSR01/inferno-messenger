import { FC, useState } from 'react'
import styles from './ChatHeader.module.scss'
import { Chat } from '@/shared/intreface/chat.intreface'
import { User } from '@/shared/intreface/user.interface'
import { useAppDispatch, useAppSelector } from '@/hooks/useAction'
import { setChatId } from '@/store/slice/chat-select.slice'
import { Fa42Group, FaArrowLeft } from 'react-icons/fa6'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useGetUserStatus } from './useGetStatus'
import clsx from 'clsx'
import { GoInfo } from 'react-icons/go'
import ChatDetails from '../../chat-details/ChatDetails'
import { useRouter } from 'next/navigation'
import ContentModal from '@/shared/ui/content-modal/ContentModal'
import { getInterlocutor } from '@/shared/utils/getInterlocutor'
import { Channel } from '@/shared/intreface/channel.interface'
import { useProfile } from '@/hooks/useProfile'

interface Props {
	chat: Chat | Channel
	me: User
	type: 'chat' | 'channel'
}

const ChatHeader: FC<Props> = ({ chat, me, type }) => {
	return type === 'chat' ? (
		<HeaderTypeChat chat={chat as Chat} me={me} />
	) : (
		<HeaderTypeChannel chat={chat as Channel} me={me}></HeaderTypeChannel>
	)
}
export default ChatHeader

const HeaderTypeChat: FC<{
	chat: Chat
	me: User
}> = ({ chat, me }) => {
	const status = useGetUserStatus(
		chat.isPersonal ? getInterlocutor(chat.users, me as User).id : null
	)

	const renderStatus = () => {
		if (!chat.isPersonal)
			return chat?.typing?.length ? (
				<div className={styles.status}>
					{chat?.typing?.map((user) => user.fullName).join(', ')} typing...
				</div>
			) : null

		return status?.isOnline ? (
			<div className={styles.status}>Online</div>
		) : (
			<div className={styles['last-seen']}>
				Last seen: {status?.lastSeen.toLocaleString()}
			</div>
		)
	}

	return (
		<div className={styles.wrapper}>
			<BackArrow />
			<div className={styles.center}>
				<Avatar src={chat.avatar} alt={chat?.name} />
				<div className={styles.detalls}>
					<div className={styles.name}>{chat?.name}</div>
					<div>{renderStatus()}</div>
				</div>
			</div>
			<Details chat={chat} type="chat" />
		</div>
	)
}

const HeaderTypeChannel: FC<{
	chat: Channel
	me: User
}> = ({ chat, me }) => {
	console.log(chat)
	return (
		<div className={styles.wrapper}>
			<BackArrow />
			<div className={styles.center}>
				<Avatar src={chat.avatar} alt={chat?.name} />
				<div className={styles.detalls}>
					<div className={styles.name}>{chat?.name}</div>
					<div className={styles['last-seen']}>
						Subscriptions {chat.subscriptions.length}
					</div>
				</div>
			</div>
			<Details chat={chat} type="channel" />
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

const Avatar: FC<{
	src: string | undefined
	alt: string
}> = ({ src, alt }) => {
	const [showAvatar, setShowAvatar] = useState<boolean>(false)

	return (
		<>
			<span onClick={() => setShowAvatar(!showAvatar)}>
				<UserAvatar src={src} alt={alt} size="large" />
			</span>
			<ContentModal showModal={showAvatar} setShowModal={setShowAvatar}>
				<UserAvatar src={src} alt={alt} altStyle={true} />
			</ContentModal>
		</>
	)
}

const Details: FC<{ chat: Chat | Channel; type: 'chat' | 'channel' }> = ({
	chat,
	type,
}) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const { push } = useRouter()

	return (
		<div className={styles['detalis-modal']}>
			<GoInfo onClick={() => setShowModal(true)} />
			{type == 'chat' ? (
				<ChatDetails
					showModal={showModal}
					setShowModal={setShowModal}
					chat={chat as Chat}
					options={{
						isDelete: (chat as Chat).isPersonal ? true : false,
						isHaveAdd: (chat as Chat).isPersonal ? false : true,
					}}
				/>
			) : (
				<></>
			)}
		</div>
	)
}
