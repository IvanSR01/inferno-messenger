import socketService from '@/services/socket-service/socket.service'
import { Chat } from '@/shared/intreface/chat.intreface'
import { useMemo, useState, useEffect } from 'react'

export function useChats(id: number): Chat[] {
    const [chatsFromSocket, setChatsFromSocket] = useState<Chat[]>([])

    useEffect(() => {
        if (id) {
            // Присоединяемся к комнате только один раз
            socketService.emit('join-room', {
                userId: id,
            })

            // Запрашиваем чаты только один раз
            socketService.emit('get-chats', {
                userId: id,
            })

            // Обрабатываем событие получения чатов
            socketService.on('get-chats', (chats: Chat[]) => {
                setChatsFromSocket(chats)
            })

            // Чистим слушатели при размонтировании компонента
            return () => {
                socketService.off('get-chats')
            }
        }
    }, [id])

    // Используем useMemo для оптимизации рендеринга
    return useMemo(() => chatsFromSocket, [chatsFromSocket])
}
