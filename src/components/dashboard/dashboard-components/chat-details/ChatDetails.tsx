import Modal from '@/components/modal/Modal'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { Chat } from '@/shared/intreface/chat.intreface'
import Button from '@/shared/ui/button/Button'
import { timeAgo } from '@/shared/utils/timeAgo'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import { LuLogOut } from 'react-icons/lu'
import ChatController from '../dashboard-nav-bar/controllers-components/create-chat-controller/ChatController'
import styles from './ChatDetails.module.scss'

interface Props {
	showModal: boolean
	setShowModal: any
	chat: Chat
	options?: {
		isHaveAdd?: boolean
		isDelete?: boolean
	}
}

const modals: TypeModal[] = [
	{
		name: 'edit',
		Component: (props: any) => <ChatController {...props} />,
	},
]

type TypeModal = {
	name: keyof TypeStateModals
	Component: FC<ModalProps>
}

type ModalProps = any

type TypeStateModals = {
	edit: boolean
	add: boolean
}

const ChatDetails: FC<Props> = ({ showModal, setShowModal, chat, options }) => {
	const { push } = useRouter()
	const [stateModals, setStateModals] = useState<TypeStateModals>({
		edit: false,
		add: false,
	})
	const handleChangeState = (name: keyof TypeStateModals) => {
		setShowModal(!showModal)
		setStateModals({ ...stateModals, [name]: !stateModals[name] })
	}
	return (
		<>
			{modals.map(({ name, Component }) => (
				<Modal
					key={name}
					setShowModal={() => handleChangeState(name)}
					showModal={stateModals[name]}
					isDisableClickOutside={true}
				>
					<div className={styles.form}>
						<Component
							close={() => handleChangeState(name)}
							isUpdate={true}
							initialState={chat}
						/>
					</div>
				</Modal>
			))}
			<Modal setShowModal={setShowModal} showModal={showModal}>
				<div className={styles.wrapper}>
					<div className={styles.chat}>
						<UserAvatar src={chat?.avatar} alt={chat?.name} size="big" />
						<div className={styles.info}>
							<h3 className={styles['chat-name']}>{chat?.name}</h3>
							<p>Count of messages {chat?.messages?.length}</p>
							<p>Count of users {chat?.users?.length}</p>
						</div>
					</div>
					<div className={styles.actions}>
						{options?.isHaveAdd && (
							<Button color="green">
								<FaPlus />
							</Button>
						)}
						<Button color="yellow" onClick={() => handleChangeState('edit')}>
							<FiEdit3 />
						</Button>
						<Button color="red">
							{options?.isDelete ? <FiTrash /> : <LuLogOut />}
						</Button>
					</div>
					<div className={styles.users}>
						<div>Users:</div>
						{chat?.users?.map((user) => (
							<div className={styles.user} key={user.id}>
								<div onClick={() => push(`/user/${user.id}`)}>
									<UserAvatar
										key={user.id}
										src={user.picture}
										alt={user.fullName}
										size="large"
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
								{options?.isHaveAdd && (
									<Button>
										<FiTrash />
									</Button>
								)}
							</div>
						))}
					</div>
				</div>
			</Modal>
		</>
	)
}
export default ChatDetails
