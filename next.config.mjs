/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'
const pwa = withPWA({
	dest: 'public',
	runtimeCaching,
	register: true,
	skipWaiting: true,
})
const nextConfig = {
	env: {
		NEST_PUBLIC_API_URL: process.env.NEST_PUBLIC_API_URL,
	},
}

export default pwa(nextConfig) // Экспортируем конфигурацию
