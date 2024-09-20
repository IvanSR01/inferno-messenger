import { useProfile } from '@/hooks/useProfile'
import messageService from '@/services/message-service/message.service'
import { useEffect } from 'react'

export default function useOnline() {
	const profile = useProfile()
	console.log(profile)
	useEffect(() => {
		if (!profile?.id) {
			console.log('Profile not loaded yet.')
			return
		}

		const handleChange = (isOnline: boolean) => {

			messageService.emit('toggle-status', {
				userId: profile.id,
				status: isOnline ? 'online' : 'offline',
			})
		}

		handleChange(false)

		const handleBeforeUnload = () => handleChange(true)

		// Добавляем обработчик события
		window.addEventListener('beforeunload', handleBeforeUnload)

		// Возвращаем функцию очистки, которая удаляет обработчик при размонтировании компонента
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
			handleChange(false) // Обработка выхода
		}
	}, [profile?.id]) // Отслеживаем id профиля
}
