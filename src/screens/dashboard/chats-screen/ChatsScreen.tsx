'use client'
import { FC } from 'react'
import styles from './ChatsScreen.module.scss'
import DashboardLayoutPage from '../../../components/dashboard/dashboard-layout-page/DashboardLayoutPage'
import Chats from '../../../components/dashboard/dashboard-components/chats/Chats'
import Wrapper from '@/components/wrapper/Wrapper'
import OpenChat from '../../../components/dashboard/dashboard-components/open-chat/OpenChat'
import OpenChannel from '@/components/dashboard/dashboard-components/open-channel/OpenChannel'
import { useAppSelector } from '@/hooks/useAction'

const ChatsScreen: FC = () => {
	const { selectChatType } = useAppSelector((state) => state.chat)
	return (
		<DashboardLayoutPage>
			<Wrapper>
				<div className={styles.main}>
					<Chats />
					{selectChatType === 'chats' ? <OpenChat /> : <OpenChannel />}
				</div>
			</Wrapper>
		</DashboardLayoutPage>
	)
}
export default ChatsScreen
