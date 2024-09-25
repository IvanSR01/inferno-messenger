import CallComponent from '@/components/call/Call'
import useCheckActiveCall from '@/hooks/useCheckActiveCall'
import { useProfile } from '@/hooks/useProfile'
import { Call, CallStatus } from '@/shared/intreface/call.interface'
import { FC, PropsWithChildren, createContext } from 'react'

interface CallContext {
	callId: number | null
	callStatus: CallStatus | null
	setCall?: (call: Call | null) => void
}

const defaultValue: CallContext = {
	callId: null,
	callStatus: null,
}

export const CallContext = createContext<CallContext>(defaultValue)

const CallProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user: me} = useProfile()
	const { callId, callStatus, changeCall } = useCheckActiveCall(
		me?.id as number
	)
	return (
		<CallContext.Provider value={{ callId, callStatus, setCall: changeCall }}>
			{children}
			{callId && callStatus === CallStatus.ACTIVE && (
				<CallComponent callId={callId} />
			)}
		</CallContext.Provider>
	)
}
export default CallProvider
