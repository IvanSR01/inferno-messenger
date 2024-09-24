import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import AppProvider from '@/providers/AppProvider'
import icon from './favicon.ico'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ZED-MESSENGER',
	description:
		'A modern, responsive web application built using Next.js with advanced features including PWA support, media attachments, and real-time messaging.',
	manifest: '/manifest.json',
	icons: icon.src,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	)
}
