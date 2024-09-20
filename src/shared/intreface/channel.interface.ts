import { Post } from './post.interface'
import { User } from './user.interface'

export interface Channel {
	id: number
	name: string
	avatar?: string
	description: string
	link: string
	author: User
	subscriptions: User[]
	posts: Post[]
	background?: string
}

export interface CreateChannel {
	name: string
	description: string
	avatar?: string
}
