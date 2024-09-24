import { User } from '@/shared/intreface/user.interface'
import { FC, Fragment, useState } from 'react'
import styles from './Message.module.scss'
import { Message } from '@/shared/intreface/message.interface'
import { formatDate } from '@/shared/utils/formatDate'
import clsx from 'clsx'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import parse from 'html-react-parser'
import { addFullUrl } from '@/shared/utils/addFullUrl'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import ContentModal from '@/shared/ui/content-modal/ContentModal'
import Audio from '@/components/audio/Audio'
interface Props {
	message: Message | undefined
	me: User | undefined
	isLastUserMessage?: boolean
	isFirstUserMessage?: boolean | undefined
	isDontHaveAvatar?: boolean
}

const MessageUI: FC<Props> = ({
	message,
	me,
	isLastUserMessage,
	isFirstUserMessage,
}) => {
	const [show, setShow] = useState<string>('')
	const content: string[] = message?.content.split('\n') as string[]

	const mediaContent = content.filter(
		(item) =>
			item.includes('<img') ||
			item.includes('<video') ||
			item.includes('<audio')
	)
	const text = content
		.filter(
			(item) =>
				!item.includes('<img') &&
				!item.includes('<video') &&
				!item.includes('<audio')
		)
		.toString()
	const parseContent = (item: string) => {
		return parse(item, {
			replace: (domNode: any) => {
				if (domNode.name === 'audio') {
					return <Audio src={domNode.attribs.src as string} />
				}
			},
		})
	}

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
			<div
				className={clsx(styles.message, {
					[styles['hiz-last']]: isLastUserMessage,
					[styles['hiz-first']]: isFirstUserMessage,
				})}
			>
				{message?.user?.id !== me?.id && isFirstUserMessage && (
					<div className={styles['user-name']}>{message?.user?.fullName}</div>
				)}
				<div className={styles['message-content']}>
					<div className={styles.media}>
						{mediaContent.map((item, i) => (
							<Fragment key={i}>
								<span onClick={() => !item.includes('<audio') && setShow(item)}>
									{parseContent(addFullUrl(item))}
								</span>
								<ContentModal
									showModal={item === show}
									setShowModal={() => setShow('')}
								>
									{parseContent(item)}
								</ContentModal>
							</Fragment>
						))}
					</div>
					<div className={styles['text-message']}>{parse(text)}</div>
				</div>
				<div className={styles.detalis}>
					{formatDate(message?.sendTime as string)}
					{message?.user.id === me?.id && (
						<>{message?.isRead ? <IoCheckmarkDone /> : <IoCheckmark />}</>
					)}
				</div>
			</div>
		</div>
	)
}

export default MessageUI
