import { FC, PropsWithChildren } from 'react'
import styles from './Wrapper.module.scss'

interface Props extends PropsWithChildren {}

const Wrapper: FC<Props> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
export default Wrapper
