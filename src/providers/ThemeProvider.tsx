'use client'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'

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
	// const defaultTheme = window.localStorage.getItem(
	// 	'theme'
	// ) as IThemeContext['theme']
	// useEffect(() => {
	// 	if (defaultTheme) { 
	// 		setTheme(defaultTheme)
	// 	}
	// }, [])
	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
	}, [theme])
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
export default ThemeProvider
