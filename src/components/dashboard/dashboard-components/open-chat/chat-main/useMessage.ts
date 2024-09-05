import { useEffect, useMemo, useState, useCallback } from 'react'
import messageService from '@/services/message-service/message.service'
import { Message } from '@/shared/intreface/message.interface'

type UseMessage = {
	chatId: number
	userId: number
	trigger: any
	isNoRead?: boolean
}

export const useMessages = ({
	trigger,
	chatId,
	userId,
	isNoRead,
}: UseMessage) => {
	const [messages, setMessages] = useState<Message[]>([])

	const markAllMessagesAsRead = useCallback(
		(messages: Message[]) => {
			messages.forEach((message, i) => {
				if (!message.user) return
				if (!message.isRead && message.user.id !== userId) {
					messageService.emit('mark-as-read', {
						messageId: message.id,
						chatId,
						isRefresh: i === messages.length - 1,
					})
				}
			})
		},
		[chatId, userId]
	)

	useEffect(() => {
		// Присоединяемся к комнате по chatId
		messageService.emit('join-chat', { chatId })

		const fetchMessages = () => {
			messageService.emit('get-messages', { chatId })
			messageService.on('get-messages', (messages: Message[]) => {
				setMessages(messages)
				if (!isNoRead) markAllMessagesAsRead(messages)
			})
		}

		fetchMessages()

		// Clean up: покидаем комнату и отключаем слушатели при размонтировании
		return () => {
			messageService.emit('leave-chat', { chatId })
			messageService.off('get-messages')
		}
	}, [trigger, chatId])

	return useMemo(() => ({ messages }), [messages])
}
