// components/CallComponent.js
import { FC, useEffect, useRef, useState } from 'react'
import Modal from '../modal/Modal'
import styles from './Call.module.scss'
import socketService from '@/services/socket-service/socket.service'
import { sign } from 'crypto'
import useCall from './useCall'

interface Props {
	callId: number
}

const CallComponent: FC<Props> = ({ callId = 2222 }) => {
	const {
		localVideoRef,
		startCall,
		otherUsersVideo,
		setUserTypedVideo,
		userTypedVideo,
	} = useCall({ callId })
	const [modal, setModal] = useState(true)
	return (
		<Modal setShowModal={setModal} showModal={modal} isDisableClickOutside>
			<div
				onClick={() =>
					setUserTypedVideo(userTypedVideo === 'webcam' ? 'screen' : 'webcam')
				}
			>
				{userTypedVideo}
			</div>
			<div className={styles.wrapper}>
				<h1>Video Call</h1>
				<video className={styles.video} ref={localVideoRef} autoPlay />
				{otherUsersVideo.map((user) => (
					<video key={user.peerId} className={styles.video} autoPlay />
				))}
				<button onClick={startCall}>Start Call</button>
			</div>
		</Modal>
	)
}

export default CallComponent
