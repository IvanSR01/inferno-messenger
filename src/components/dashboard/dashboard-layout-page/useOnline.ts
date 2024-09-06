import { useProfile } from '@/hooks/useProfile'
import messageService from '@/services/message-service/message.service'
import { useEffect } from 'react'

export default function useOnline() {
	const profile = useProfile()

	useEffect(() => {
		// Если профиль ещё не загружен, ничего не делаем
		if (!profile?.id) return

		const handleChange = (isOnline: boolean) => {
			messageService.emit('toggle-status', {
				userId: profile.id, // Теперь мы уверены, что id существует
				isOnline,
			})
		}

		// Отправляем статус онлайн при монтировании компонента
		handleChange(true)

		// Обработчик для закрытия окна
		const handleBeforeUnload = () => handleChange(false)

		// Добавляем обработчик события
		window.addEventListener('unload', handleBeforeUnload)

		// Очищаем обработчик при размонтировании компонента
		return () => {
			window.removeEventListener('unload', handleBeforeUnload)
			handleChange(false) // Выход
		}
	}, [profile?.id]) // Отслеживаем id профиля
}
