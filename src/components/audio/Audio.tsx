import { FC, useRef, useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import styles from './Audio.module.scss'

interface Props {
	src: string
}

const Audio: FC<Props> = ({ src }) => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	useEffect(() => {
		const audio = audioRef.current

		const updateProgress = () => {
			setCurrentTime(audio?.currentTime || 0)
		}

		const setAudioDuration = () => {
			setDuration(audio?.duration || 0)
		}


		if (audio) {
			audio.addEventListener('timeupdate', updateProgress)
			audio.addEventListener('loadedmetadata', setAudioDuration)
		}

		return () => {
			if (audio) {
				audio.removeEventListener('timeupdate', updateProgress)
				audio.removeEventListener('loadedmetadata', setAudioDuration)
			}
		}
	}, [])
	useEffect(() => {
		if(duration === currentTime) setIsPlaying(false)
	}, [duration, currentTime])
	const togglePlayPause = () => {
		const audio = audioRef.current
		if (!audio) return

		if (isPlaying) {
			audio.pause()
		} else {
			audio.play()
		}
		setIsPlaying(!isPlaying)
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	return (
		<div className={styles.telegramAudio}>
			<audio ref={audioRef} src={src} />
			<button className={styles.playPauseButton} onClick={togglePlayPause}>
				{isPlaying ? <FaPause /> : <FaPlay />}
			</button>
			<div className={styles.progressBar}>
				{/* <div
					className={styles.progress}
					style={{ width: `${(currentTime / duration) * 100}%` }}
				/> */}
				<div className={styles.waveform}>
					{Array.from({ length: 25 }).map((_, index) => (
						<div
							key={index}
							className={styles.waveBar}
							style={{
								height: `${Math.random() * 50 + 10}px`,
								opacity: currentTime / duration > index / 50 ? 1 : 0.5,
							}}
						/>
					))}
				</div>
			</div>
			<div className={styles.time}>
				{formatTime(currentTime)} / {formatTime(duration)}
			</div>
		</div>
	)
}

export default Audio
