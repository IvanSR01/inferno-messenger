import { User } from '@/shared/intreface/user.interface'
import { FC } from 'react'
import styles from './Message.module.scss'
import { Message } from '@/shared/intreface/message.interface'
import { formatDate } from '@/shared/utils/formatDate'
import clsx from 'clsx'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import parse from 'html-react-parser'
interface Props {
	message: Message | undefined
	me: User | undefined
	isLastUserMessage?: boolean
	isFirstUserMessage?: boolean
}

const MessageUI: FC<Props> = ({ message, me, isLastUserMessage, isFirstUserMessage }) => {
	return (
		<div
			className={clsx(styles.wrapper, {
				[styles['is-my-message']]: message?.user?.id === me?.id,
			})}
		>
			<div className={styles['avatar-wrapper']}>
				{message?.user?.id !== me?.id && isLastUserMessage && (
					<UserAvatar
						src={message?.user?.picture}
						alt={message?.user?.fullName}
						size="small"
					/>
				)}
			</div>
			<div className={clsx(styles.message, {
				[styles['hiz-last']]: isLastUserMessage, 
				[styles['hiz-first']]: isFirstUserMessage
			})}>
				{message?.user?.id !== me?.id && isLastUserMessage && (
					<div className={styles['user-name']}>
						{message?.user?.fullName}
					</div>
				)}
				<div className={styles['message-content']}>{parse(message?.content as string)}</div>
				<div className={styles.detalis}>
					{formatDate(message?.sendTime as string)}
				</div>
			</div>
		</div>
	)
}

export default MessageUI
