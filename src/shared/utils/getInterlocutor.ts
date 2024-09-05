/* eslint-disable react-hooks/rules-of-hooks */
import { User } from '../intreface/user.interface'

export const getInterlocutor = (users: User[], me: User): User => {
	if (!me) return users[0]
	let interlocutor = users[0]
	users.forEach((user) => {
		if (user.id !== me.id) {
			interlocutor = user
			return
		}
	})

	return interlocutor
}
