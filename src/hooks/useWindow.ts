import { useState } from 'react'

export const useWindow = () => {
	const [windowState, setWindowState] = useState({
		localStorage: {
			theme: 'light',
		},
	})

	return typeof window !== 'undefined' ? window : windowState
}
