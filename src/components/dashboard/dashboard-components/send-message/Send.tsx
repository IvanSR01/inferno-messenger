'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FiPaperclip } from 'react-icons/fi'
import { FaCircleStop } from 'react-icons/fa6'
import { ReactMediaRecorder } from 'react-media-recorder'
import styles from './Send.module.scss'
import SendMenu from './send-menu/SendMenu'
import { Icons } from './icons'
import { toast } from 'react-toastify'
import useFileModal from './file-modal/useFileModal'
import FileModal from './file-modal/FileModal'
import { useMessageController } from './useMessageController'

interface SendProps {
	handleSend: (messageContent: string, mediaUrl?: string) => void
	contentType: 'message' | 'post' | 'comment'
	handleTyping?: () => void
}

const Send: FC<SendProps> = ({ handleSend, contentType, handleTyping }) => {
	const {
		isModalOpen,
		open,
		close,
		messageType,
		handleMessageTypeChange,
		mediaUrl,
		setMediaUrl,
		messageContent,
		setMessageContent,
		setBlob,
		blob,
	} = useMessageController()
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.code === 'Enter') {
				handleSendMessage(messageContent)
			}
		}
		document.addEventListener('keydown', handler)

		return () => {
			document.removeEventListener('keydown', handler)
		}
	}, [messageContent, mediaUrl])
	const [isRecording, setIsRecording] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const { changeFiles, content, clearContent } = useFileModal()

	const handleSendMessage = (content: string) => {
		if (!content) {
			toast.error('Please write something or send a media')
			return
		}
		handleSend(content, mediaUrl || '')
		setMessageContent('')
		setMediaUrl(null)
		clearContent()
		setIsRecording(false)
	}

	const placeholderText = {
		message: 'Type a message...',
		post: 'Write your post...',
		comment: 'Add a comment...',
	}[contentType]

	return (
		<ReactMediaRecorder
			audio={messageType === 'audio'}
			video={messageType === 'video'}
			onStop={(blobUrl, blob) => {
				setMediaUrl(blobUrl)
				setBlob(blob)
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
									onChange={(e) => changeFiles(e, 'add', '')}
									accept="image/png, image/gif, image/jpeg, video/mp4, audio/*"
								/>
							</>
						)}
					</div>
					{mediaUrl ? (
						messageType === 'audio' ? (
							<audio className={styles.input} src={mediaUrl} controls />
						) : (
							<video className={styles.video} src={mediaUrl} controls />
						)
					) : (
						<input
							className={styles.input}
							type="text"
							placeholder={placeholderText}
							value={messageContent}
							onChange={(e) => {
								setMessageContent(e.target.value)
								handleTyping && handleTyping()
							}}
						/>
					)}
					<SendMenu
						isModalOpen={isModalOpen}
						open={open}
						close={close}
						messageType={messageType}
						handleMessageTypeChange={handleMessageTypeChange}
						startRecording={startRecording}
						stopRecording={stopRecording}
						isRecording={isRecording}
						setIsRecording={setIsRecording}
						handleSendMessage={() => handleSendMessage(messageContent)}
					/>
					<FileModal
						clearContent={clearContent}
						handleSend={handleSendMessage}
						content={content}
						upload={changeFiles}
					/>
					{mediaUrl && (
						<div
							onClick={() => handleSendMessage(messageContent)}
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

export default Send
