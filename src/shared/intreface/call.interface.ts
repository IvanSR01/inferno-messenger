import { User } from './user.interface'

export enum CallStatus {
	REQUESTED = 'requested',
	ACTIVE = 'active',
	REJECTED = 'rejected',
}

export interface CallUser extends User {
	action: {
		isVideoActive: boolean
		isAudioActive: boolean
	}
	callStatus: CallStatus
	signals: any[]
}

export interface Call {
	id: number
	name?: string | null
	duration: string
	startTime: string
	endTime: string
	from: CallUser
	to: CallUser[]
	participants: CallUser[]
	callType: 'audio' | 'video'
	chatId: number
	status: string
	isGroup: boolean
}
