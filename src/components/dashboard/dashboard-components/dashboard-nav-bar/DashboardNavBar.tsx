'use client'
import Modal from '@/components/modal/Modal'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useProfile } from '@/hooks/useProfile'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { FiMenu, FiSettings } from 'react-icons/fi'
import { IoCloseOutline, IoPersonAddOutline } from 'react-icons/io5'
import styles from './DashboardNavBar.module.scss'
import SettingController from './controllers-components/setting-controller/SettingController'
import CreateChatController from './controllers-components/create-chat-controller/ChatController'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import CreateChannelController from './controllers-components/create-channel-controller/CreateChannelController'
import Input from '@/shared/ui/input/Input'
import { ThemeContext } from '@/providers/ThemeProvider'
import { setLocalStorage } from '@/shared/local/local'

const variants = {
	init: {
		x: 250,
	},
	animate: {
		x: 0,
	},
	exit: {
		x: 250,
	},
}

const navData = [
	{
		name: 'Chats',
		link: '/chats',
	},
	{
		name: 'Users',
		link: '/users',
	},
]

const modals: TypeModal[] = [
	{
		title: 'Settings',
		name: 'setting',
		Icon: () => <FiSettings />,
		Component: ({ close }) => <SettingController close={close} />,
	},
	{
		title: 'Add Chat',
		name: 'chat',
		Icon: () => <IoPersonAddOutline />,
		Component: ({ close }) => <CreateChatController close={close} />,
	},
	{
		title: 'Add Channel',
		name: 'channel',
		Icon: () => <AiOutlineUsergroupAdd />,
		Component: ({ close }) => <CreateChannelController close={close} />,
	},
]

type TypeModal = {
	title: string
	name: keyof TypeStateModals
	Component: FC<{ close: any }>
	Icon: FC
}

type TypeStateModals = {
	setting: boolean
	chat: boolean
	channel: boolean
}

const DashboardNavBar: FC = () => {
	const profile = useProfile()
	const pathname = usePathname()
	const [show, setShow] = useState<boolean>(false)
	const [stateModals, setStateModals] = useState<TypeStateModals>({
		setting: false,
		chat: false,
		channel: false,
	})
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handlerClick = (e: any) => {
			if (show) {
				if (!ref.current?.contains(e.target)) {
					setShow(false)
				}
			}
			return
		}
		document.addEventListener('click', handlerClick)
		return () => document.removeEventListener('click', handlerClick)
	})
	const { theme, setTheme } = useContext(ThemeContext)
	const [checked, setChecked] = useState(theme === 'dark')
	const handlerChange = (value: boolean) => {
		if (value) {
			setChecked(true)
			setTheme && setTheme('dark')
			return setLocalStorage('theme', 'dark')
		} else {
			setChecked(false)
			setTheme && setTheme('light')
			return setLocalStorage('theme', 'light')
		}
	}
	return (
		<div className={styles.wrapper} ref={ref}>
			{modals.map(({ name, Component }, i) => (
				<Modal
					showModal={stateModals[name]}
					isDisableClickOutside={true}
					setShowModal={(d) => {
						setStateModals({ ...stateModals, [name]: false })
					}}
					key={name}
				>
					<div className={styles.form}>
						<Component
							close={() => {
								setShow(true)
								setStateModals({ ...stateModals, [name]: false })
							}}
						/>
					</div>
				</Modal>
			))}
			<div className={styles.open} onClick={() => setShow(!show)}>
				{!show ? <FiMenu /> : <IoCloseOutline />}
			</div>
			<AnimatePresence>
				<Modal showModal={show} setShowModal={setShow}>
					<motion.div
						variants={variants}
						initial="init"
						animate="animate"
						exit={'exit'}
						transition={{ duration: 0.3 }}
						className={styles.menu}
					>
						<div className={styles.user}>
							<div className={styles['user-info']}>
								<div className={styles['username']}>@{profile?.username}</div>
								<div className={styles['full-name']}>{profile?.fullName}</div>
							</div>
							<UserAvatar
								src={profile?.picture}
								alt={profile?.fullName}
								size="large"
							/>
						</div>
						<div className={styles.link}>
							{navData.map(({ name, link }, i) => (
								<Link
									className={clsx(styles.item, {
										[styles.select]: pathname.includes(link),
									})}
									key={`${name}${i}`}
									href={`/dashboard${link}`}
								>
									{name}
								</Link>
							))}
							{modals.map(({ title, name, Icon }, i) => (
								<div
									key={`${name}${title}${i}`}
									className={clsx(styles.item)}
									onClick={() => {
										setShow(false)
										setStateModals({
											...stateModals,
											[name]: true,
										})
									}}
								>
									<p>{title}</p>
									<Icon />
								</div>
							))}
							<div className={styles.theme}>
								<Input
									value={checked as any}
									onChange={(e: any) => handlerChange(e.target.checked)}
									placeholder="THEME"
									type="checkbox"
								/>
							</div>
						</div>
					</motion.div>
				</Modal>
			</AnimatePresence>
		</div>
	)
}
export default DashboardNavBar
