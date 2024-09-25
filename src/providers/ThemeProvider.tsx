'use client'
import { useProfile } from '@/hooks/useProfile'
import { getLocalStorage, setLocalStorage } from '@/shared/local/local'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface IThemeContext {
	theme: 'light' | 'dark'
	setTheme?: (theme: 'light' | 'dark') => void
}

const defaultValue: IThemeContext = {
	theme: 'light',
}

export const ThemeContext = createContext<IThemeContext>(defaultValue)

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<IThemeContext['theme']>('light')
	const defaultTheme = getLocalStorage<IThemeContext['theme']>('theme')
	useEffect(() => {
		if (defaultTheme) {
			setTheme(defaultTheme)
		}
	}, [])
	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
	}, [theme])
	const { user: me } = useProfile()
	useEffect(() => {
		if (me) {
			setLocalStorage('language', me.language)
		} else {
			setLocalStorage('language', 'ENG')
		}
	}, [me])
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={theme}
			/>
		</ThemeContext.Provider>
	)
}
export default ThemeProvider
