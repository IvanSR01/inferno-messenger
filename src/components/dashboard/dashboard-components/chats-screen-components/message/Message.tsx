import { User } from '@/shared/intreface/user.interface'
import { FC, useState } from 'react'
import styles from './Message.module.scss'
import { Message } from '@/shared/intreface/message.interface'
import { formatDate } from '@/shared/utils/formatDate'
import clsx from 'clsx'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import parse from 'html-react-parser'
import { addFullUrl } from '@/shared/utils/addFullUrl'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import ContentModal from '@/shared/ui/content-modal/ContentModal'
interface Props {
	message: Message | undefined
	me: User | undefined
	isLastUserMessage?: boolean
	isFirstUserMessage?: boolean
	isDontHaveAvatar?: boolean
}

const MessageUI: FC<Props> = ({
	message,
	me,
	isLastUserMessage,
	isFirstUserMessage,
}) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	return (
		<div
			className={clsx(styles.wrapper, {
				[styles['is-my-message']]: message?.user?.id === me?.id,
			})}
			onClick={() =>
				(message?.content.includes('<img') && setShowModal(true))
			}
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
			<div
				className={clsx(styles.message, {
					[styles['hiz-last']]: isLastUserMessage,
					[styles['hiz-first']]: isFirstUserMessage,
				})}
			>
				{message?.user?.id !== me?.id && isLastUserMessage && (
					<div className={styles['user-name']}>{message?.user?.fullName}</div>
				)}
				<div className={styles['message-content']}>
					{parse(addFullUrl(message?.content as string))}
				</div>
				<div className={styles.detalis}>
					{formatDate(message?.sendTime as string)}
					{message?.user.id === me?.id && (
						<>{message?.isRead ? <IoCheckmarkDone /> : <IoCheckmark />}</>
					)}
				</div>
			</div>
			<ContentModal showModal={showModal} setShowModal={setShowModal}>
				{parse(addFullUrl(message?.content as string))}
			</ContentModal>
		</div>
	)
}

export default MessageUI
