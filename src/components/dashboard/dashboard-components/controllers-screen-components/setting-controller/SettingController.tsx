/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useRef, useState } from 'react'
import styles from './SettingController.module.scss'
import Input from '@/shared/ui/input/Input'
import Button from '@/shared/ui/button/Button'
import { User } from '@/shared/intreface/user.interface'
import { useProfile } from '@/hooks/useProfile'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { FiEdit3 } from 'react-icons/fi'
import uploadsFiles from '@/shared/utils/uploadsFiles'
import { addFullUrl } from '@/shared/utils/addFullUrl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '@/services/user-service/user.service'
import { toast } from 'react-toastify'
import { useError } from '@/hooks/useError'

interface Props {}

const SettingController: FC = () => {
	const client = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: () => userService.updateProfile(profile as User),
		onSuccess: () => {
			toast.success('Profile updated successfully')
			client.invalidateQueries({
				queryKey: ['profile'],
			})
		},
		onError: (err) => {
			toast.error(useError(err))
		},
	})
	const [profile, setProfile] = useState<any | null>(null)
	const user = useProfile()
	useEffect(() => {
		if (user) setProfile(user)
	}, [user])
	const inputRef = useRef<HTMLInputElement>(null)
	const setPicture = (value: string) =>
		setProfile({ ...profile, picture: `/${value}` })
	console.log(profile)
	return (
		<>
			<h2 className={styles.heading}>{setting.heading}</h2>
			<div className={styles.avatar} onClick={() => inputRef.current?.click()}>
				<UserAvatar src={profile?.picture} alt={profile?.fullName} size="big" />
				<p className={styles.edit}>
					<FiEdit3 />
				</p>
				<input
					type="file"
					hidden
					accept="image/* video/*"
					ref={inputRef}
					onChange={(e) => uploadsFiles(e, setPicture, 'user', false)}
				/>
			</div>
			{setting.inputs.map((input, index) => (
				<div key={index}>
					<Input
						// name={input.name}
						placeholder={input.placeholder}
						value={profile?.[input.name as any]}
						type={input.type}
					/>
					{/* <p className={styles.description}>{input.description}</p> */}
				</div>
			))}
			<Button onClick={() => mutate()}>Save</Button>
		</>
	)
}
export default SettingController

const setting = {
	inputs: [
		{
			name: 'fullName',
			placeholder: 'Enter your full name',
			type: 'text',
			description: 'This is your full name',
		},
		{
			name: 'email',
			placeholder: 'Enter your email',
			type: 'email',
			description: 'This is your email',
		},
		{
			name: 'password',
			placeholder: 'Enter your password',
			type: 'password',
			description: 'This is your password',
		},
		{
			name: 'username',
			placeholder: 'Enter your username',
			type: 'text',
			description: 'This is your username',
		},
	],
	heading: 'Setting',
}
