import socketService from '@/services/socket-service/socket.service'
import { Chat } from '@/shared/intreface/chat.intreface'
import { useMemo, useState, useEffect } from 'react'

export function useChat(id: number, initialState: Chat): Chat {
	const [chatFromSocket, setChatFromSocket] = useState<Chat>(initialState)

	useEffect(() => {
		if (id) {
			// Присоединяемся к комнате только один раз
			socketService.emit('join-chat-id', {
				chatId: id,
			})

			// Запрашиваем чаты только один раз
			socketService.emit('get-chat', {
				chatId: id,
			})

			// Обрабатываем событие получения чатов
			socketService.on('get-chat', (chat: Chat) => {
				setChatFromSocket(chat)
			})

			// Чистим слушатели при размонтировании компонента
			return () => {
				socketService.off('get-chat')
			}
		}
	}, [id])

	// Используем useMemo для оптимизации рендеринга
	return useMemo(() => chatFromSocket, [chatFromSocket])
}
