import { FC } from 'react'
import styles from './ToggleChats.module.scss'
import clsx from 'clsx'

interface Props {
	selectData: string[]
	selectChatType: 'chats' | 'channel'
	onClick: (value: string) => void
}

const ToggleChats: FC<Props> = ({ selectData, selectChatType, onClick }) => {
	return (
		<div className={styles.wrapper}>
			{selectData.map((data) => (
				<div
					className={clsx(styles.item, {
						[styles.active]: data === selectChatType,
					})}
					key={data}
					onClick={() => onClick(data)}
				>
					{data}
				</div>
			))}
		</div>
	)
}
export default ToggleChats
