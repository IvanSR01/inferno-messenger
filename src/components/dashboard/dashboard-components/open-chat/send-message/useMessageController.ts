/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import fileService from '@/services/file-service/file.service'
import { Icons } from './icons'

export const useMessageController = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [messageType, setMessageType] = useState<keyof typeof Icons>('text')
	const [mediaUrl, setMediaUrl] = useState<string | null>(null)
	const [blob, setBlob] = useState<Blob | null>(null)
	const [messageContent, setMessageContent] = useState<string>('')
	const open = () => setIsModalOpen(true)
	const close = () => setIsModalOpen(false)

	useEffect(() => {
		const handleClickOutside = () => setIsModalOpen(false)
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [])

	useEffect(() => {
		blobController(blob, messageType).then((res) => {
			setMessageContent(res ?? '')
		})
	}, [blob])

	const handleMessageTypeChange = (type: keyof typeof Icons) => {
		setMessageType(type)
		close()
		setMediaUrl(null)
	}

	return useMemo(
		() => ({
			isModalOpen,
			open,
			close,
			messageType,
			handleMessageTypeChange,
			mediaUrl,
			blob,
			setBlob,
			setMediaUrl,
			setMessageContent,
			messageContent,
		}),
		[
			isModalOpen,
			open,
			close,
			messageType,
			handleMessageTypeChange,
			mediaUrl,
			blob,
			messageContent,
		]
	)
}

const blobController = async (blob: Blob | null, messageType: string) => {
	if (blob) {
		const res = await fileService.uploadFile(blob, `message/${messageType}`)
		if (res.path) {
			return messageType === 'audio'
				? `<audio src="/uploads/message/${messageType}/${res.filename}" controls></audio>`
				: `<video src="/uploads/message/${messageType}/${res.filename}" controls></video>`
		}

		return null
	}
}

