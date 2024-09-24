import { FC, useState } from 'react'
import styles from './ToggleChats.module.scss'
import clsx from 'clsx'

interface Props {
	selectData: string[]
	onClick: (value: string) => void
	languageData: string[]
}

const ToggleChats: FC<Props> = ({
	selectData,
	onClick,
	languageData,
}) => {
	const [state, setState] = useState(0)
	return (
		<div className={styles.wrapper}>
			{selectData.map((data, i) => (
				<div
					className={clsx(styles.item, {
						[styles.active]: i === state,
					})}
					key={data}
					onClick={() => {
						setState(i)
						onClick(data)
					}}
				>
					{languageData[i]}
				</div>
			))}
		</div>
	)
}
export default ToggleChats
