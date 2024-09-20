import messageService from '@/services/message-service/message.service'
import { Chat } from '@/shared/intreface/chat.intreface'
import { useMemo, useState, useEffect } from 'react'

export function useChats(id: number): Chat[] {
    const [chatsFromSocket, setChatsFromSocket] = useState<Chat[]>([])

    useEffect(() => {
        if (id) {
            // Присоединяемся к комнате только один раз
            messageService.emit('join-room', {
                userId: id,
            })

            // Запрашиваем чаты только один раз
            messageService.emit('get-chats', {
                userId: id,
            })

            // Обрабатываем событие получения чатов
            messageService.on('get-chats', (chats: Chat[]) => {
                setChatsFromSocket(chats)
            })

            // Чистим слушатели при размонтировании компонента
            return () => {
                messageService.off('get-chats')
            }
        }
    }, [id])

    // Используем useMemo для оптимизации рендеринга
    return useMemo(() => chatsFromSocket, [chatsFromSocket])
}
