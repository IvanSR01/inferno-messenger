import { useProfile } from '@/hooks/useProfile'
import socketService from '@/services/socket-service/socket.service'
import { useEffect } from 'react'

export default function useOnline() {
	const profile = useProfile()
	useEffect(() => {
		if (!profile?.id) {
			return
		}

		const handleChange = (isOnline: boolean) => {
			console.log(isOnline)
			socketService.emit('toggle-status', {
				userId: profile.id,
				status: isOnline ? 'online' : 'offline',
			})
		}

		handleChange(false)

		const handleBeforeUnload = () => handleChange(false)

		// Добавляем обработчик события
		window.addEventListener('beforeunload', handleBeforeUnload)

		// Возвращаем функцию очистки, которая удаляет обработчик при размонтировании компонента
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
			handleChange(true) // Обработка выхода
		}
	}, [profile?.id]) // Отслеживаем id профиля
}
