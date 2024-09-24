import { Dispatch, SetStateAction } from 'react'
import { Icons } from '../icons'

export type SendMenuProps = {
	messageType: keyof typeof Icons
	handleMessageTypeChange: (type: keyof typeof Icons) => void
	handleSendMessage: () => void
	setIsRecording: Dispatch<SetStateAction<boolean>>
	startRecording: () => void
	stopRecording: () => void
	isRecording: boolean
	messageContent: string
}
