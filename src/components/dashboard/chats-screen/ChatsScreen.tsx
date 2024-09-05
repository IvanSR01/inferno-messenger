import { FC } from 'react'
import styles from './ChatsScreen.module.scss'
import DashboardLayoutPage from '../dashboard-layout-page/DashboardLayoutPage'
import Chats from '../dashboard-components/chats-screen-components/chats/Chats'
import Wrapper from '@/components/wrapper/Wrapper'
import OpenChat from '../dashboard-components/open-chat/OpenChat'

const ChatsScreen: FC = () => {
	return (
		<DashboardLayoutPage>
			<div className={styles.main}>
				<Chats />
				<OpenChat/>
			</div>
		</DashboardLayoutPage>
	)
}
export default ChatsScreen
