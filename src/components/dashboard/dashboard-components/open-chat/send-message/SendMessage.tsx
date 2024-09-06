import { useState, FC, useEffect, useRef } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaCircleStop } from 'react-icons/fa6'
import { FiPaperclip } from 'react-icons/fi'
import { ReactMediaRecorder } from 'react-media-recorder'
import styles from './SendMessage.module.scss'
import SendMenu from './send-menu/SendMenu'
import { useMessageController } from './useMessageController'
import { useSendMessage } from '@/hooks/useMessages'
import { Icons } from './icons'
import { toast } from 'react-toastify'
import useFileModal from './file-modal/useFileModal'
import FileModal from './file-modal/FileModal'

interface SendMessageProps {
	chatId: number
	userId: number
}

const SendMessage: FC<SendMessageProps> = ({ chatId, userId }) => {
	const {
		open,
		messageType,
		setBlob,
		mediaUrl,
		setMediaUrl,
		close,
		isModalOpen,
		handleMessageTypeChange,
		messageContent,
		setMessageContent,
	} = useMessageController()

	const [isRecording, setIsRecording] = useState(false)

	const sendMessage = useSendMessage()

	const handleSend = (messageContent: string, mediaUrl?: string) => {
		if (!messageContent) {
			return toast.error('Please write something or send a media')
		}
		sendMessage({
			content: messageContent || '',
			userId,
			media: mediaUrl || '',
			chatId,
		})
		setMessageContent('')
		setMediaUrl('')
	}

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.code === 'Enter') {
				handleSend(messageContent, mediaUrl as string)
			}
		}
		document.addEventListener('keydown', handler)

		return () => {
			document.removeEventListener('keydown', handler)
		}
	}, [messageContent, mediaUrl])
	const inputRef = useRef<HTMLInputElement>(null)
	const { changeFiles, content, clearContent } = useFileModal()
	return (
		<ReactMediaRecorder
			audio={messageType === 'audio'}
			video={messageType === 'video'}
			onStop={(blobUrl, d) => {
				setBlob(d as Blob)
				setMediaUrl(blobUrl)
			}}
			render={({ startRecording, stopRecording }) => (
				<div className={styles.sendMessage}>
					<div className={styles.file}>
						{mediaUrl ? (
							<FaTrashAlt onClick={() => setMediaUrl(null)} />
						) : (
							<>
								<FiPaperclip onClick={() => inputRef.current?.click()} />
								<input
									ref={inputRef}
									hidden
									type="file"
									onChange={(e) => changeFiles(e)}
									accept="image/png, image/gif, image/jpeg video/mp4, audio/*"
								/>
							</>
						)}
					</div>
					{mediaUrl ? (
						<>
							{messageType === 'audio' && (
								<audio className={styles.input} src={mediaUrl} controls />
							)}
							{messageType === 'video' && (
								<div className={styles.video}>
									<video src={mediaUrl} controls />
								</div>
							)}
						</>
					) : (
						<input
							className={styles.input}
							type="text"
							placeholder="Type a message"
							value={messageContent}
							onChange={(e) => setMessageContent(e.target.value)}
						/>
					)}
					<SendMenu
						isModalOpen={isModalOpen}
						open={open}
						close={close}
						messageType={messageType}
						handleMessageTypeChange={handleMessageTypeChange}
					/>
					<div>
						<div
							className={styles.send}
							onMouseEnter={() => open()}
							onClick={() => {
								if (messageType === 'text') return
								if (isRecording) {
									setIsRecording(false)
									stopRecording()
								} else {
									setIsRecording(true)
									startRecording()
								}
							}}
						>
							{isRecording ? (
								<FaCircleStop />
							) : (
								<div
									onClick={
										messageType === 'text'
											? () => handleSend(messageContent, mediaUrl as string)
											: () => {}
									}
								>
									{Icons[messageType]}
								</div>
							)}
						</div>
						<FileModal
							userId={userId}
							chatId={chatId}
							clearContent={clearContent}
							content={content}
						/>
					</div>
					{mediaUrl && (
						<div
							onClick={() => handleSend(messageContent, mediaUrl)}
							className={styles.send}
						>
							{Icons['text']}
						</div>
					)}
				</div>
			)}
		/>
	)
}

export default SendMessage
