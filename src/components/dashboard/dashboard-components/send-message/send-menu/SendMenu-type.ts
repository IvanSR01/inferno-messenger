import { Dispatch, SetStateAction } from 'react'
import { Icons } from '../icons'

export type SendMenuProps = {
	isModalOpen: boolean
	open: () => void
	close: () => void
	messageType: keyof typeof Icons
	handleMessageTypeChange: (type: keyof typeof Icons) => void
	handleSendMessage: () => void
	setIsRecording: Dispatch<SetStateAction<boolean>>
	startRecording: () => void
	stopRecording: () => void
	isRecording: boolean
}
