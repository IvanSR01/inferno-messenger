import { useEffect, useMemo, useState, useCallback } from 'react'
import { Message } from '@/shared/intreface/message.interface'
import socketService from '@/services/socket-service/socket.service'
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
					socketService.emit('mark-as-read', {
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
		socketService.emit('join-chat', { chatId })

		const fetchMessages = () => {
			socketService.emit('get-messages', { chatId })
			socketService.on('get-messages', (messages: Message[]) => {
				setMessages(messages)
				if (!isNoRead) markAllMessagesAsRead(messages)
			})
		}

		fetchMessages()

		// Clean up: покидаем комнату и отключаем слушатели при размонтировании
		return () => {
			socketService.emit('leave-chat', { chatId })
			socketService.off('get-messages')
		}
	}, [trigger, chatId])

	return useMemo(() => ({ messages }), [messages])
}
