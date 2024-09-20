import messageService from '@/services/message-service/message.service'
import { Chat } from '@/shared/intreface/chat.intreface'
import { useMemo, useState, useEffect } from 'react'

export function useChat(id: number): Chat {
	const [chatFromSocket, setChatFromSocket] = useState<Chat>({} as Chat)

	useEffect(() => {
		if (id) {
			// Присоединяемся к комнате только один раз
			messageService.emit('join-chat-id', {
				chatId: id,
			})

			// Запрашиваем чаты только один раз
			messageService.emit('get-chat', {
				chatId: id,
			})

			// Обрабатываем событие получения чатов
			messageService.on('get-chat', (chat: Chat) => {
				setChatFromSocket(chat)
			})

			// Чистим слушатели при размонтировании компонента
			return () => {
				messageService.off('get-chat')
			}
		}
	}, [id])

	// Используем useMemo для оптимизации рендеринга
	return useMemo(() => chatFromSocket, [chatFromSocket])
}
