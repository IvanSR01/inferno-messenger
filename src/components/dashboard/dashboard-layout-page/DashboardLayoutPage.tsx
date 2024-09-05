/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useProfile } from '@/hooks/useProfile'
import { FC, PropsWithChildren, useEffect } from 'react'
import DashboardHeader from '../dashboard-components/dashboard-header/DashboardHeader'
import styles from './DashboardLayoutPage.module.scss'
import useOnline from './useOnline'
interface Props extends PropsWithChildren {}

const DashboardLayoutPage: FC<Props> = ({ children }) => {
	useOnline()
	return (
		<div className={styles.layout}>
			<DashboardHeader />
			<main className={styles.main}>{children}</main>
		</div>
	)
}
export default DashboardLayoutPage
