import { FC, useEffect, useState } from 'react'
import styles from './UserSelect.module.scss'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { User } from '@/shared/intreface/user.interface'
import clsx from 'clsx'
import { FaSearch } from 'react-icons/fa'
import Input from '../input/Input'

interface Props {
	users: User[]
	selectedUsers: User[] | null
	onSelectUser: (user: User | null) => void
	isOneSelect?: boolean
}

const UserSelect: FC<Props> = ({
	users,
	selectedUsers,
	onSelectUser,
	isOneSelect = false,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [search, setSearch] = useState<string>('')
	const [filterUsers, setFilterUsers] = useState<User[]>(users || [])


	useEffect(() => {
		if (search) {
			setFilterUsers(users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase())))
		} else {
			setFilterUsers(users)
		}
	}, [search, users])
	return (
		<div className={styles.select}>
			{selectedUsers?.length ? (
				<div className={styles.selectedHeading}>
					<span onClick={() => setIsOpen(!isOpen)}>
						<UserAvatar alt="+" />
					</span>
					{selectedUsers.map((user) => (
						<div key={user.id} onClick={() => onSelectUser(user)}>
							<UserAvatar src={user.picture} alt={user.fullName} size="small" />
						</div>
					))}
				</div>
			) : (
				<div onClick={() => setIsOpen(!isOpen)} className={styles.placeholder}>
					Select user{isOneSelect ? '' : 's'}
				</div>
			)}
			{isOpen && (
				<div className={styles.menu}>
					<div className={styles.search}>
						<Input placeholder="Search user" />
					</div>
					{filterUsers
						.map((user) => (
							<div
								key={user.id}
								className={clsx(styles.user, {
									[styles.selected]: selectedUsers?.includes(user),
								})}
								onClick={() => {
									onSelectUser(user)
									setIsOpen(false)
								}}
							>
								<UserAvatar
									src={user.picture}
									alt={user.fullName}
									size="small"
								/>
								<p> {user.fullName}</p>
							</div>
						))}
				</div>
			)}
		</div>
	)
}

export default UserSelect
