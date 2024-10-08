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

interface ILanguageContext {
	language: 'ENG' | 'RUS'
	setLanguage: (language: 'ENG' | 'RUS') => void
}

const defaultValue: ILanguageContext = {
	language: 'ENG',
	setLanguage: () => {}, // Initialize with a no-op function
}

export const LanguageContext = createContext<ILanguageContext>(defaultValue)

const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
	const [language, setLanguage] = useState<ILanguageContext['language']>(
		getLocalStorage<ILanguageContext['language']>('language') as any
	)

	const {user: profile} = useProfile()
	useEffect(() => {
		if (profile && profile.language) {
			setLocalStorage('language', profile.language)
			setLanguage(profile.language as ILanguageContext['language'])
		} else {
			setLocalStorage(
				'language',
				navigator.language === 'ru-RU' ? 'RUS' : 'ENG'
			)
			setLanguage(navigator.language === 'ru-RU' ? 'RUS' : 'ENG')
		}
	}, [profile])


	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	)
}

export default LanguageProvider
