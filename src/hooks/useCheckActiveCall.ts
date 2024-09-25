import socketService from '@/services/socket-service/socket.service'
import { Call, CallStatus } from '@/shared/intreface/call.interface'
import { useEffect, useState } from 'react'

interface Output {
	callId: number
	callStatus: CallStatus | null
	changeCall: (call: Call | null) => void
}
export default function useCheckActiveCall(userId: number): Output {
	const [call, setCall] = useState<Call | null>(null)
	const [callStatus, setCallStatus] = useState<CallStatus | null>(null)
	useEffect(() => {
		const getRequestCall = (call: any[]) => {
			if(!call) return;
			setCall(call![0])
		}

		socketService.emit('request-calls', { userId })

		socketService.on('request-calls', getRequestCall)

		return () => {
			socketService.off('request-calls')
		}
	}, [userId])

	useEffect(() => {
		if (call) {
			call.participants.forEach((participant) => {
				if (participant.id === userId) {
					setCallStatus(participant.callStatus)
				}
			})
		}
	}, [call])

	const changeCall = (call: Call | null): void => {
		setCall(call)
	}

	return {
		callId: call?.id as number,
		callStatus,
		changeCall,
	}
}
