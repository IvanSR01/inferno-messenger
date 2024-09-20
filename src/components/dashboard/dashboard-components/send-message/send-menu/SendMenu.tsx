import { FC } from 'react'
import styles from './SendMenu.module.scss'
import { SendMenuProps } from './SendMenu-type'
import { AnimatePresence, motion } from 'framer-motion'
import { variants } from '@/shared/motion/variants'
import clsx from 'clsx'
import { Icons } from '../icons'
import { FaCircleStop } from 'react-icons/fa6'
const SendMenu: FC<SendMenuProps> = ({
	isModalOpen,
	messageType,
	handleMessageTypeChange,
	handleSendMessage,
	setIsRecording,
	startRecording,
	stopRecording,
	isRecording,
	open,
	close,
}) => {
	return (
		<div
			onMouseEnter={open}
			onClick={close}
			onTouchStart={open}
			className={styles.wrapper}
		>
			<AnimatePresence>
				<div
					className={styles.send}
					onClick={() => {
						if (messageType === 'text') {
							handleSendMessage()
						} else if (isRecording) {
							setIsRecording(false)
							stopRecording()
						} else {
							setIsRecording(true)
							startRecording()
						}
					}}
				>
					{isRecording ? <FaCircleStop /> : Icons[messageType]}
				</div>
				{isModalOpen && (
					<motion.div
						variants={variants}
						initial="init"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
						className={styles.modalSwitchType}
					>
						{Object.keys(Icons).map((key, i) => (
							<div
								key={i}
								className={clsx(styles.switchType, {
									[styles.active]: messageType === key,
								})}
								onClick={() =>
									handleMessageTypeChange(key as keyof typeof Icons)
								}
							>
								<p>{key}</p>
								{Icons[key as keyof typeof Icons]}
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
export default SendMenu
