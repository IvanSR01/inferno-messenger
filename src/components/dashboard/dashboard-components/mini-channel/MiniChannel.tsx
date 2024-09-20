import { FC } from 'react'
import styles from './MiniChannel.module.scss'
import { Post } from '@/shared/intreface/post.interface'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { motion } from 'framer-motion'
import { itemVariants } from '@/shared/motion/variants'
import clsx from 'clsx'
interface Props {
	avatar: string | undefined
	name: string
	lastPost: Post | undefined
	isSelectedChat?: boolean
	onClick: () => void
	i: number
}

const MiniChannel: FC<Props> = ({
	avatar,
	name,
	lastPost,
	onClick,
	i,
	isSelectedChat,
}) => {
	return (
		<motion.div
			variants={itemVariants}
			initial="init"
			whileInView={'animate'}
			exit={'exit'}
			viewport={{ once: true }}
			transition={{
				duration: 0.5,
				delay: i * 0.1,
			}}
			className={clsx(styles.chat, {
				[styles.selected]: isSelectedChat,
			})}
			onClick={onClick}
		>
			<UserAvatar size="medium" src={avatar} alt={name} />
			<div className={styles.info}>
				<div className={styles['chat-name']}>{name}</div>
				{lastPost && (
					<div className={styles['last-post']}>{lastPost?.content}</div>
				)}
			</div>
		</motion.div>
	)
}
export default MiniChannel
