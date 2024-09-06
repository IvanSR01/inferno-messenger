import { Dispatch, FC, SetStateAction } from 'react'
import styles from './ChatDetails.module.scss'
import Modal from '@/components/modal/Modal'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useAppSelector } from '@/hooks/useAction'
import Button from '@/shared/ui/button/Button'
import { timeAgo } from '@/shared/utils/timeAgo'

interface Props {
	showModal: boolean
	setShowModal: any
}

const ChatDetails: FC<Props> = ({ showModal, setShowModal }) => {
	const { chat } = useAppSelector((state) => state.chat)
	return (
		<Modal setShowModal={setShowModal} showModal={showModal}>
			<div className={styles.wrapper}>
				<div className={styles.chat}>
					<UserAvatar src={chat?.avatar} alt={chat?.name} size="big" />
					<div className={styles.info}>
						<h3 className={styles['chat-name']}>{chat?.name}</h3>
						<p>Count of messages {chat?.messages.length}</p>
						<p>Count of users {chat?.users.length}</p>
					</div>
				</div>
				<Button>EDIT</Button>
				<div className={styles.users}>
					<div>Users:</div>
					{chat?.users.map((user) => (
						<div className={styles.user} key={user.id}>
							<UserAvatar
								key={user.id}
								src={user.picture}
								alt={user.fullName}
								size="medium"
							/>
							<div className={styles['user-info']}>
								<h4>{user.fullName}</h4>
								<div>
									{user.status.isOnline ? (
										<p className={styles.online}>Online</p>
									) : (
										<p className={styles.out}>
											{timeAgo(user.status.lastSeen as any)}
										</p>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	)
}
export default ChatDetails
