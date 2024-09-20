'use client'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QueryProvider from './QueryProvider'
import { Provider } from 'react-redux'
import store from '@/store/store'
import Loader from '@/components/loader/Loader'
const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 4500)
		return () => clearTimeout(timer)
	}, [])
	return (
		<Provider store={store}>
			<QueryProvider>
				{isLoading ? (
					<div className="fullscreen">
						<Loader />
					</div>
				) : (
					children
				)}
			</QueryProvider>
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
				theme="light"
			/>
		</Provider>
	)
}

export default AppProvider
