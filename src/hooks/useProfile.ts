/* eslint-disable react-hooks/rules-of-hooks */
import userService from '@/services/user-service/user.service'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
	const user = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.profile(),
	}).data

	
	return user
}
