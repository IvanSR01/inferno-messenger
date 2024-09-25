import { FC, useRef } from 'react'
import { Icons } from '../icons'
import { SendMenuProps } from './SendMenu-type'
import styles from './SendMenu.module.scss'

const SendMenu: FC<SendMenuProps> = ({
	messageType,
	handleMessageTypeChange,
	handleSendMessage,
	setIsRecording,
	startRecording,
	stopRecording,
	isRecording,
	messageContent,
}) => {
	const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)

	const handleMouseDown = () => {
		longPressTimerRef.current = setTimeout(() => {
			setIsRecording(true)
			startRecording()
		}, 500) // Задержка перед началом записи
	}

	const handleMouseUp = () => {
		if (longPressTimerRef.current) {
			clearTimeout(longPressTimerRef.current)
		}
	}

	const renderIcon = () => {
		if (messageContent) {
			return (
				<div onClick={handleSendMessage} className={styles.switchType}>
					{Icons['text']}
				</div>
			)
		} else if (isRecording) {
			return (
				<div
					onClick={() => {
						setIsRecording(false)
						stopRecording()
					}}
					className={styles.switchType}
				>
					{Icons['stop']}
				</div>
			)
		} else {
			return (
				<div
					onClick={() => {
						handleMessageTypeChange(messageType === 'audio' ? 'video' : 'audio')
					}}
					onTouchStart={(e) => {
						handleMouseDown()
					}}
					onTouchEnd={(e) => {
						handleMouseUp()
					}}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
					className={styles.switchType}
				>
					{Icons[messageType]}
				</div>
			)
		}
	}

	const renderSubIcon = () => {
		if (!messageContent) return null
		if (messageContent.includes('<audio')) {
			return (
				<div
					onClick={() => {
						setIsRecording(true)
						startRecording()
					}}
					className={styles.switchType}
				>
					{Icons['audio']}
				</div>
			)
		}
		if (messageContent.includes('<video')) {
			return (
				<div
					onClick={() => {
						setIsRecording(true)
						startRecording()
					}}
					className={styles.switchType}
				>
					{Icons['video']}
				</div>
			)
		}
		return null
	}

	return (
		<div className={styles.wrapper}>
			{renderSubIcon()}
			{renderIcon()}
		</div>
	)
}

export default SendMenu
