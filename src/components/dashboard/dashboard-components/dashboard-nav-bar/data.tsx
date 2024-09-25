/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { FC, useMemo } from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { IoPersonAddOutline } from 'react-icons/io5'
import CreateChannelController from './controllers-components/create-channel-controller/CreateChannelController'
import CreateChatController from './controllers-components/create-chat-controller/ChatController'
import SettingController from './controllers-components/setting-controller/SettingController'

export type TypeModal = {
	title: string
	name: keyof TypeStateModals
	Component: FC<{ close: any }>
	Icon: FC
}

export type TypeStateModals = {
	setting: boolean
	chat: boolean
	channel: boolean
}

export const getDataModal = (language: 'ENG' | 'RUS'): TypeModal[] => {
	const modals: TypeModal[] = [
		{
			title: `${language === 'ENG' ? 'Settings' : 'Настройки'}`,
			name: 'setting',
			Icon: () => <FiSettings />,
			Component: ({ close }) => <SettingController close={close} />,
		},
		{
			title: `${language === 'ENG' ? 'Create Chat' : 'Создать чат'}`,
			name: 'chat',
			Icon: () => <IoPersonAddOutline />,
			Component: ({ close }) => <CreateChatController close={close} />,
		},
		{
			title: `${language === 'ENG' ? 'Create Channel' : 'Создать канал'}`,
			name: 'channel',
			Icon: () => <AiOutlineUsergroupAdd />,
			Component: ({ close }) => <CreateChannelController close={close} />,
		},
	]
	return useMemo(() => modals, [modals, language])
}

export const getDataNav = (language: 'ENG' | 'RUS') => {
	const navData = [
		{
			name: `${language === 'ENG' ? 'Chats' : 'Чаты'}`,
			link: '/chats',
		},
		{
			name: `${language === 'ENG' ? 'Search' : 'Поиск'}`,
			link: '/users',
		},
	]
	return useMemo(() => navData, [navData, language])
}
