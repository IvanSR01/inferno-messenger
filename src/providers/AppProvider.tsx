'use client'
import Loader from '@/components/loader/Loader'
import store from '@/store/store'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import CallProvider from './CallProvider'
import QueryProvider from './QueryProvider'
import ThemeProvider from './ThemeProvider'
import LanguageProvider from './LanguageProvider'
const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 4500)

		return () => clearTimeout(timer)
	}, [])
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration) => {
					console.log(
						'Service Worker registered with scope:',
						registration.scope
					)
				})
				.catch((error) => {
					console.error('Service Worker registration failed:', error)
				})
		}
	}, [])
	return (
		<Provider store={store}>
			<QueryProvider>
				<CallProvider>
					<ThemeProvider>
						<LanguageProvider>
							{isLoading ? (
								<div className="fullscreen">
									<Loader />
								</div>
							) : (
								children
							)}
						</LanguageProvider>
					</ThemeProvider>
				</CallProvider>
			</QueryProvider>
		</Provider>
	)
}

export default AppProvider
