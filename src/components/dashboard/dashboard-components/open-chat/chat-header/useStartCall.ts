/* eslint-disable react-hooks/exhaustive-deps */
import { useProfile } from '@/hooks/useProfile'
import { CallContext } from '@/providers/CallProvider'
import socketService from '@/services/socket-service/socket.service'
import { Call } from '@/shared/intreface/call.interface'
import { Chat } from '@/shared/intreface/chat.intreface'
import { useContext, useMemo } from 'react'

export default function useStartCall(chat: Chat) {
	const me = useProfile()
	const { setCall } = useContext(CallContext)

	const startCall = () => {
		socketService.on('create-call', (call: Call) => {
			setCall && setCall(call)
		})

		socketService.emit('create-call', {
			fromUserId: me.id,
			toUserId: chat.users.map((user) => user.id),
			callType: 'video',
			isGroup: false,
			chatId: chat.id,
		})
	}

	return {startCall}
}
