/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from 'react'
import styles from './AuthLayoutPage.module.scss'
import clsx from 'clsx'
interface Props extends PropsWithChildren {
	image?: string
	imageOrder?: 'left' | 'right'
}

export default function AuthLayoutPage({ children, image, imageOrder }: Props) {
	return (
		<div className={styles.container}>
			{image && (
				<div className={clsx(styles.image, {
					[styles.left]: imageOrder === 'left',
				})}>
					<img src={image} alt="" />
				</div>
			)}
			<div className={styles.content}>
				<div className={styles.menu}>{children}</div>
			</div>
		</div>
	)
}
