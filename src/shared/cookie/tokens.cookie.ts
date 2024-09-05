import Cookies from 'js-cookie'
import { TypeTokens } from '@/shared/types/tokens.type'

const getTokens = (): TypeTokens => ({
	accessToken: Cookies.get('access-token') as string,
	refreshToken: Cookies.get('refresh-token') as string,
})

const saveTokens = ({ accessToken, refreshToken }: TypeTokens) => {
	Cookies.set('access-token', accessToken)
	Cookies.set('refresh-token', refreshToken)
}

const removeTokens = () => {
	Cookies.remove('access-token')
	Cookies.remove('refresh-token')
}

export { getTokens, saveTokens, removeTokens }
