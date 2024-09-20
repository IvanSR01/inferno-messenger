import { User } from '@/shared/intreface/user.interface'
import { getInterlocutor } from '@/shared/utils/getInterlocutor'

export const useFilter = (
	items: any[],
	type: 'user' | 'chat' | 'channel',
	filter: string,
	me: User
) => {
	if (!items || !items.length) return []
	else if (!filter) return items

	if (type === 'user')
		return items.filter((item) => filterUser(item, filter, me))

	return items.filter((item) => {
		if (type === 'chat') {
			return item.isPersonal
				? filterUser(item.users, filter, me)
				: item.name.toLowerCase().includes(filter.toLowerCase())
		}

		return item.name.toLowerCase().includes(filter.toLowerCase())
	})
}

const filterUser = (users: User[], filter: string, me: User) => {
	const interlocutor = getInterlocutor(users, me)

	return (
		interlocutor.username.toLowerCase().includes(filter.toLowerCase()) ||
		interlocutor.fullName.toLowerCase().includes(filter.toLowerCase())
	)
}
