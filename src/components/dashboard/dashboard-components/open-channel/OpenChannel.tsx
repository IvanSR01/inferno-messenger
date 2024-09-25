'use client'
import { FC } from 'react'
import styles from './OpenChannel.module.scss'
import ChannelHeader from '../open-chat/chat-header/ChatHeader'
import Loader from '@/components/loader/Loader'
import channelService from '@/services/channel-serivce/channel.service'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '@/hooks/useAction'
import { useProfile } from '@/hooks/useProfile'
import { User } from '@/shared/intreface/user.interface'
import { Channel } from '@/shared/intreface/channel.interface'
import ChannelMain from './channel-main/ChannelMain'
import clsx from 'clsx'

const OpenChannel: FC = () => {
	const { chat } = useAppSelector((state) => state.chat)
	const {user: profile} = useProfile()
	const { data, isLoading } = useQuery({
		queryKey: ['chat', chat?.id],
		queryFn: () => channelService.getChannel(chat?.id as number),
		enabled: !!chat?.id
	})
	if (isLoading && chat?.id)
		return (
			<div className={styles.wrapper}>
				<Loader />
			</div>
		)

	return chat?.id ? (
		<div className={styles.wrapper}>
			<ChannelHeader chat={data as Channel} me={profile as User} type="channel" />
			<ChannelMain chat={data as Channel} />
		</div>
	) : (
		<div className={clsx(styles.center, {
			[styles.hidden]: !chat?.id
		})}>No channel selected</div>
	)
}
export default OpenChannel
