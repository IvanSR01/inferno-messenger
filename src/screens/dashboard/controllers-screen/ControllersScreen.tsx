'use client'
import { FC } from 'react'
import styles from './ControllersScreen.module.scss'
import DashboardLayoutPage from '../../../components/dashboard/dashboard-layout-page/DashboardLayoutPage'
import Wrapper from '@/components/wrapper/Wrapper'
import Input from '@/shared/ui/input/Input'
// import SettingController from '../../../components/dashboard/dashboard-components/controllers-screen-components/setting-controller/SettingController'
// import CreateChatController from '../../../components/dashboard/dashboard-components/controllers-screen-components/create-chat-controller/CreateChatController'
// import CreateChannelController
// 	from '@/components/dashboard/dashboard-components/controllers-screen-components/create-channel-controller/CreateChannelController'

const ControllersScreen: FC = () => {
	return (
		<DashboardLayoutPage>
			<Wrapper>
				<div className={styles.wrapper}>
					{/* <div className={styles['content-wrapper']}>
						<SettingController />
					</div>
					<div className={styles['content-wrapper']}>
						<CreateChatController />
					</div>
					<div className={styles['content-wrapper']}>
						<CreateChannelController />
					</div> */}
				</div>
			</Wrapper>
		</DashboardLayoutPage>
	)
}
export default ControllersScreen
