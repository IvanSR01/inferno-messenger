import { useError } from '@/hooks/useError'
import authService from '@/services/auth-service/auth.service'
import { getTokens } from '@/shared/cookie/tokens.cookie'
import axios from 'axios'

const defaultApi = axios.create({
	baseURL: process.env.NEST_PUBLIC_API_URL,
})
const accessApi = axios.create({
	baseURL: process.env.NEST_PUBLIC_API_URL,
})

accessApi.interceptors.request.use((config) => {
	const accessToken = getTokens().accessToken
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

accessApi.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config
		if (
			(error.response?.status === 401 ||
				useError(error) === 'jwt expired' ||
				useError(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const res = await authService.updateTokens()
				return accessApi.request(originalRequest)
			} catch (e) {
				// if (useError(e) === 'jwt expired') removeTokens()
			}
		}
		throw error
	}
)


export { defaultApi, accessApi }
