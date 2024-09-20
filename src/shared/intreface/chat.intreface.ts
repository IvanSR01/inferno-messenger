import { Message } from './message.interface'
import { Pinned } from './pinned.interface'
import { User } from './user.interface'

export interface Chat {
	id: number
	users: User[]
	messages: Message[]
	name: string
	avatar?: string
	isPersonal: boolean
	createdAt: Date
	typing: User[]
	pinnedByUsers: Pinned[]
	background?: string
}

export interface CreateChat {
	ids: number[]
	isPersonal: boolean
	name: string
	avatar: string
	background: string
}

export interface UpdateChat extends CreateChat {
	id: number
}
