export const getLocalStorage = <T>(key: string): T | null => {
	if (typeof window === 'undefined') return null

	return window.localStorage.getItem(key) as T
}

export const setLocalStorage = (key: string, value: string) => {
	if (typeof window === 'undefined') return null

	window.localStorage.setItem(key, value)
}
