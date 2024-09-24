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
import { IoCloseOutline } from 'react-icons/io5'
import { useAppDispatch } from '@/hooks/useAction'
import { setMe } from '@/store/slice/me.slice'

interface Props {
	close: any
}

const SettingController: FC<Props> = ({ close }) => {
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
	const [checked, setChecked] = useState(profile?.language === 'RUS')
	const user = useProfile()
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (user) {
			setProfile(user)
			dispatch(setMe(user))
		}
	}, [user])
	const inputRef = useRef<HTMLInputElement>(null)
	const setPicture = (value: string) =>
		setProfile({ ...profile, picture: `/${value}` })
	return (
		<>
			<div className={styles.close} onClick={() => close()}>
				<IoCloseOutline />
			</div>
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
					onChange={(e) =>
						uploadsFiles({
							file: e.target.files ? e.target.files[0] : ({} as any),
							setContent: setPicture,
							folder: 'user',
						})
					}
				/>
			</div>
			{setting.inputs.map((input, index) => (
				<div className={styles.group} key={index}>
					<Input
						placeholder={input.placeholder}
						value={profile?.[input.name as any]}
						onChange={(e: any) =>
							setProfile({
								...profile,
								[input.name]:
									input.type === 'checkbox' ? e.target.checked : e.target.value,
							})
						}
						type={input.type}
					/>
					<p className={styles.description}>{input.description}</p>
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
			description: 'This is your password (Hash)',
		},
		{
			name: 'username',
			placeholder: 'Enter your username',
			type: 'text',
			description: 'This is your username',
		},
		{
			name: 'language',
			type: 'text',
			description: 'Enter to RUS | ENG',
		},
	],
	heading: 'Setting',
}
