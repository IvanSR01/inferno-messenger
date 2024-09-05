import { useProfile } from '@/hooks/useProfile'
import messageService from '@/services/message-service/message.service'
import { useEffect } from 'react'

export default function useOnline() {
	const profile = useProfile()

	useEffect(() => {
		const handleChange = (isOnline: boolean) => {
			messageService.emit('toggle-status', {
				userId: profile?.id,
				isOnline,
			})

			handleChange(true)
			document.addEventListener('beforeunload', () => handleChange(false))


			return () => {
				// document.removeEventListener('DOMContentLoaded', () => handleChange(true))
				document.removeEventListener('beforeunload', () => handleChange(false))
			}
		}
	})
}
