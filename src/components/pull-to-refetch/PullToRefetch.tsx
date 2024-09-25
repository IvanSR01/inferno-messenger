import { useEffect, useState } from 'react'

export default function PullToRefresh() {
	const [isRefreshing, setIsRefreshing] = useState(false)

	useEffect(() => {
		let startY = 0
		let currentY = 0
		let threshold = 80 // Минимальное расстояние для срабатывания обновления

		if (typeof window === 'undefined') return

		const onTouchStart = (e: TouchEvent) => {
			if (window.scrollY === 0) {
				startY = e.touches[0].pageY
			}
		}

		const onTouchMove = (e: TouchEvent) => {
			currentY = e.touches[0].pageY
			if (window.scrollY === 0 && currentY - startY > 0) {
				e.preventDefault() // Останавливаем стандартное поведение прокрутки
				// Можно добавить анимацию во время движения
			}
		}

		const onTouchEnd = () => {
			if (window.scrollY === 0 && currentY - startY > threshold) {
				setIsRefreshing(true)
				window.location.reload() // Перезагрузка страницы
			}
		}

		// Подписка на события
		window.addEventListener('touchstart', onTouchStart)
		window.addEventListener('touchmove', onTouchMove)
		window.addEventListener('touchend', onTouchEnd)

		// Убираем подписку при размонтировании
		return () => {
			window.removeEventListener('touchstart', onTouchStart)
			window.removeEventListener('touchmove', onTouchMove)
			window.removeEventListener('touchend', onTouchEnd)
		}
	}, [])

	return isRefreshing ? (
		<div className="refresh-indicator">Refreshing...</div>
	) : null
}
