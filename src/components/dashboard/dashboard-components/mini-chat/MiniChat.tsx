/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react'
import styles from './MiniChat.module.scss'
import { Chat } from '@/shared/intreface/chat.intreface'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { getInterlocutor } from '@/shared/utils/getInterlocutor'
import { User } from '@/shared/intreface/user.interface'
import { useCheckAuthorMessage } from '@/hooks/useMessages'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import clsx from 'clsx'
import { formatDate } from '@/shared/utils/formatDate'
import { motion } from 'framer-motion'
import { itemVariants } from '@/shared/motion/variants'
interface Props {
	chat: Chat
	me: User
	isSelectedChat?: boolean
	onClick?: () => void
	i: number
}

const MiniChat: FC<Props> = ({ chat, me, isSelectedChat, onClick, i }) => {
	return (
		<motion.div
			className={clsx(styles.wrapper, {
				[styles.selected]: isSelectedChat,
			})}
			variants={itemVariants}
			initial="init"
			whileInView={'animate'}
			exit={'exit'}
			viewport={{ once: true }}
			transition={{
				duration: 0.5,
				delay: i * 0.1,
			}}
			onClick={onClick}
		>
			{chat.isPersonal ? (
				<PersonalMiniChat chat={chat} me={me} i={i} />
			) : (
				<GroupMiniChat chat={chat} me={me}  i={i}/>
			)}
		</motion.div>
	)
}
export default MiniChat

const PersonalMiniChat: FC<Props> = ({ chat, me }) => {
	return (
		<div className={styles.chat}>
			<UserAvatar
				src={getInterlocutor(chat.users, me)?.picture}
				alt={getInterlocutor(chat.users, me)?.fullName}
				size="medium"
			/>
			<div className={styles.info}>
				<h3 className={styles['chat-name']}>
					{getInterlocutor(chat.users, me)?.fullName}
				</h3>
				<div className={styles['chat-last-message']}>
					{chat.messages.length > 0 && renderLastMessage(chat, me)}
				</div>
			</div>
		</div>
	)
}

const GroupMiniChat: FC<Props> = ({ chat, me }) => {
	return (
		<div className={styles.chat}>
			<UserAvatar src={chat.avatar} alt={chat.name} size="medium" />
			<div className={styles.info}>
				<h3 className={styles['chat-name']}>{chat.name}</h3>
				{chat.messages.length > 0 && renderLastMessage(chat, me)}
			</div>
		</div>
	)
}

const renderLastMessage = (chat: Chat, user: User) => {
	const lastMessage = chat.messages[chat.messages.length - 1]
	const isAuthor = useCheckAuthorMessage({
		message: lastMessage,
		user,
	})

	const reNameMessage = (content: string | undefined) => {
		if (!content) return ''

		if (content.includes('<audio')) return 'Voice message'

		if (content.includes('<img')) return 'Image message'

		if (content.includes('<video')) return 'Video message'

		return content
	}

	return (
		<div className={styles['last-message']}>
			<p>{reNameMessage(lastMessage.content)}</p>
			<div className={styles.detalls}>
				{isAuthor &&
					(lastMessage.isRead ? <IoCheckmarkDone /> : <IoCheckmark />)}
				<p className={styles.time}>
					{formatDate(lastMessage?.sendTime as string)}
				</p>
			</div>
		</div>
	)
}
