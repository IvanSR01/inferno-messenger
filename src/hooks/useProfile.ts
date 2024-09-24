/* eslint-disable react-hooks/rules-of-hooks */
import userService from '@/services/user-service/user.service'
import { User } from '@/shared/intreface/user.interface'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from './useAction'
import { setMe } from '@/store/slice/me.slice'
import { useMemo } from 'react'

export const useProfile = (): User => {
	const { me } = useAppSelector((state) => state.me)
	const dispatch = useAppDispatch()
	console.log('profile', me)
	// Always call the hook
	const { data: user } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.profile(),
		enabled: !me, // Disable fetching if "me" exists
	})

	if (user && !me) {
		dispatch(setMe(user))
	}

	// Return either "me" or fetched "user"
	return useMemo(() => (me ? me : user) as User, [me, user])
}
