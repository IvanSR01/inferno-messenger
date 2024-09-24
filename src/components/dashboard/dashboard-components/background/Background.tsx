import { FC, useContext, useEffect, useState } from 'react'
import styles from './Background.module.scss'
import { addFullUrl } from '@/shared/utils/addFullUrl'
import { ThemeContext } from '@/providers/ThemeProvider'
import clsx from 'clsx'

interface Props {
	src?: string
}

const Background: FC<Props> = ({ src }) => {
	const { theme } = useContext(ThemeContext)
	const [defaultBackground, setDefaultBackground] = useState(
		theme === 'light'
			? '/images/default-white.jpg'
			: '/images/default-black.jpg'
	)
	useEffect(() => {
		setDefaultBackground(
			theme === 'light'
				? '/images/default-white.jpg'
				: '/images/default-black.jpg'
		)
	}, [theme])
	return (
		<div
			className={clsx(styles.wrapper, {
				[styles.blur]: src,
			})}
		>
			{src && (
				<>
					{src.includes('/video') ? (
						<video src={addFullUrl(src)} autoPlay loop muted playsInline />
					) : (
						<img src={addFullUrl(src)} alt="Chat background" />
					)}
				</>
			)}
			{/* <img src={defaultBackground} alt="Chat background" /> */}
		</div>
	)
}
export default Background
