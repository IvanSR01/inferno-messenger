import socketService from '@/services/socket-service/socket.service'
import {
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

interface Props {
	callId: number
}

type TypeUserVideo = 'webcam' | 'screen'

interface Output {
	localVideoRef: RefObject<HTMLVideoElement>
	otherUsersVideo: any[]
	peerConnection: RTCPeerConnection | null
	setUserTypedVideo: (p: TypeUserVideo) => void
	userTypedVideo: TypeUserVideo
	startCall: () => void
}

export default function useCall({ callId }: Props): Output {
	const localVideoRef = useRef<HTMLVideoElement>(null)
	const [otherUsersVideo, setOtherUsersVideo] = useState<any[]>([])
	const [userTypedVideo, setUserTypedVideo] = useState<TypeUserVideo>('webcam')
	const [peerConnection, setPeerConnection] =
		useState<RTCPeerConnection | null>(null)

	useEffect(() => {
		const getMediaStream = async () => {
			try {
				const stream =
					userTypedVideo === 'webcam'
						? await navigator.mediaDevices.getUserMedia({
								video: true,
								audio: true,
							})
						: await navigator.mediaDevices.getDisplayMedia({
								video: true,
								audio: true,
							})

				if (localVideoRef.current) {
					localVideoRef.current.srcObject = stream
				}

				onStream(stream, callId, setPeerConnection, setOtherUsersVideo)
			} catch (error) {
				console.error('Error accessing media devices.', error)
			}
		}

		getMediaStream()
	}, [callId, userTypedVideo])

	const startCall = useCallback(async () => {
		if (peerConnection) {
			const offer = await peerConnection.createOffer()
			await peerConnection.setLocalDescription(offer)

			socketService.emit('call-signal', { callId, signal: offer })
		}
	}, [peerConnection, callId])

	useEffect(() => {
		return () => {
			if (peerConnection) {
				peerConnection.close()
			}
			socketService.off('call-signal') // Убираем обработчик, чтобы избежать утечек
		}
	}, [peerConnection])

	return useMemo(() => {
		return {
			localVideoRef,
			otherUsersVideo,
			peerConnection,
			setUserTypedVideo,
			userTypedVideo,
			startCall,
		}
	}, [otherUsersVideo, peerConnection, userTypedVideo, startCall])
}

const onStream = (
	stream: MediaStream,
	callId: number,
	setPeerConnection: any,
	setOtherUsersVideo: any
) => {
	const webRtcConnection = new RTCPeerConnection({
		iceServers: [
			{ urls: 'stun:stun.l.google.com:19302' },
			{ urls: 'stun:stun1.l.google.com:19302' },
			{ urls: 'stun:stun2.l.google.com:19302' },
			{ urls: 'stun:stun3.l.google.com:19302' },
		],
	})

	console.log(stream.getTracks(), stream)

	stream.getTracks().forEach((track) => {
		webRtcConnection.addTrack(track, stream)
	})

	setPeerConnection(webRtcConnection)

	socketService.emit('join-call', {
		callId,
	})

	webRtcConnection.onicecandidate = (event) => {
		if (event.candidate) {
			socketService.emit('call-signal', {
				callId,
				signal: event.candidate,
			})
		}
	}

	socketService.on('call-signal', async (payload) => {
		console.log(payload.signal)
		if (payload.signal.type === 'offer') {
			await webRtcConnection.setRemoteDescription(
				new RTCSessionDescription(payload.signal)
			)
			const answer = await webRtcConnection.createAnswer()
			await webRtcConnection.setLocalDescription(answer)
			socketService.emit('call-signal', { callId, signal: answer })
		} else if (payload.signal.type === 'answer') {
			await webRtcConnection.setRemoteDescription(
				new RTCSessionDescription(payload.signal)
			)
		} else {
			webRtcConnection.addIceCandidate(new RTCIceCandidate(payload.signal))
		}
	})

	webRtcConnection.ontrack = (event) => {
		event.streams.forEach((stream) => {
			setOtherUsersVideo((prev: any) => [...prev, stream])
		})
	}
}
