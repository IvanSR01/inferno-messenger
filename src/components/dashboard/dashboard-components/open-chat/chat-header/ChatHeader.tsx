import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useAppDispatch } from '@/hooks/useAction'
import { Channel } from '@/shared/intreface/channel.interface'
import { Chat } from '@/shared/intreface/chat.intreface'
import { User } from '@/shared/intreface/user.interface'
import ContentModal from '@/shared/ui/content-modal/ContentModal'
import { getInterlocutor } from '@/shared/utils/getInterlocutor'
import { setChatId } from '@/store/slice/chat-select.slice'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { GoInfo } from 'react-icons/go'
import { IoCallOutline } from 'react-icons/io5'
import ChatDetails from '../../chat-details/ChatDetails'
import styles from './ChatHeader.module.scss'
import { useGetUserStatus } from './useGetStatus'
import useStartCall from './useStartCall'

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
	const { startCall } = useStartCall(chat as Chat)
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

		return chat?.typing?.length ? (
			<div className={styles.status}>
				{chat?.typing?.map((user) => user.fullName).join(', ')} typing...
			</div>
		) : status?.isOnline ? (
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
			<div className={styles.icons}>
				<IoCallOutline onClick={() => startCall()} />
				<Details chat={chat} type="chat" />
			</div>
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
						Subscriptions {chat?.subscriptions?.length}
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
