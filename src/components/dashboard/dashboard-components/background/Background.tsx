import { FC } from 'react'
import styles from './Background.module.scss'
import { addFullUrl } from '@/shared/utils/addFullUrl'

interface Props {
	src?: string
}

const Background: FC<Props> = ({ src }) => {
	return (
		<div className={styles.wrapper}>
			{src && (
				<>
					{src.includes('/video') ? (
						<video src={addFullUrl(src)} autoPlay loop muted playsInline />
					) : (
						<img src={addFullUrl(src)} alt="Chat background" />
					)}
				</>
			)}
		</div>
	)
}
export default Background
