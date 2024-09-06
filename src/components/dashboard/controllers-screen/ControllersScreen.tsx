'use client'
import { FC } from 'react'
import styles from './ControllersScreen.module.scss'
import DashboardLayoutPage from '../dashboard-layout-page/DashboardLayoutPage'
import Wrapper from '@/components/wrapper/Wrapper'
import Input from '@/shared/ui/input/Input'
import SettingController from '../dashboard-components/controllers-screen-components/setting-controller/SettingController'

const ControllersScreen: FC = () => {
	return (
		<DashboardLayoutPage>
			<Wrapper>
				<div className={styles.wrapper}>
					<div className={styles['content-wrapper']}>
						<SettingController />
					</div>
				</div>
			</Wrapper>
		</DashboardLayoutPage>
	)
}
export default ControllersScreen
