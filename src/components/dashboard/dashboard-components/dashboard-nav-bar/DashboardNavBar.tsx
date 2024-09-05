import { FC, useState } from 'react'
import styles from './DashboardNavBar.module.scss'
import Link from 'next/link'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useProfile } from '@/hooks/useProfile'
import { usePathname } from 'next/navigation'

const navData = [
	{
		name: 'Chats',
		link: '/chats',
	},
	{
		name: 'Settings',
		link: '/settings',
	},
	{
		name: 'Contacts',
		link: '/contacts',
	},
	{
		name: 'Alerts',
		link: '/alerts',
	},
]

const DashboardNavBar: FC = () => {
	const profile = useProfile()
	const pathname = usePathname()
	return (
		<div className={styles.wrapper}>
			{navData.map(({ name, link }, i) => (
				<Link
					className={pathname.includes(link) ? styles.select : ''}
					key={i}
					href={`/dashboard${link}`}
				>
					{name}
				</Link>
			))}
			<UserAvatar src={profile?.picture} alt={profile?.fullName} />
			<MobileDashboardNavBar/>
		</div>
	)
}
export default DashboardNavBar

const MobileDashboardNavBar: FC = () => {
	const [show, setShow] = useState(false)
	return <div className={styles.mobil}></div>
}
