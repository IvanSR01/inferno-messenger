/* eslint-disable react-hooks/rules-of-hooks */
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { useError } from '@/hooks/useError'
import { useProfile } from '@/hooks/useProfile'
import userService from '@/services/user-service/user.service'
import { User } from '@/shared/intreface/user.interface'
import Button from '@/shared/ui/button/Button'
import Input from '@/shared/ui/input/Input'
import uploadsFiles from '@/shared/utils/uploadsFiles'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import styles from './SettingController.module.scss'
import { LanguageContext } from '@/providers/LanguageProvider'

interface Props {
	close: any
}

const SettingController: FC<Props> = ({ close }) => {
	const client = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: () => userService.updateProfile(profile as User),
		onSuccess: (d) => {
			toast.success('Profile updated successfully')
			globalReState(profile)
		},
		onError: (err) => {
			toast.error(useError(err))
		},
	})
	const [profile, setProfile] = useState<any | null>(null)
	const [checked, setChecked] = useState(profile?.language === 'RUS')
	const { user, globalReState } = useProfile()
	useEffect(() => {
		if (user) {
			setProfile(user)
		}
	}, [user])
	const inputRef = useRef<HTMLInputElement>(null)
	const setPicture = (value: string) =>
		setProfile({ ...profile, picture: `/${value}` })
	const { language } = useContext(LanguageContext)
	return (
		<>
			<div className={styles.close} onClick={() => close()}>
				<IoCloseOutline />
			</div>
			<h2 className={styles.heading}>
				{getSettingControllerData(language).heading}
			</h2>
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
			{getSettingControllerData(language).inputs.map((input, index) => (
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

export const getSettingControllerData = (language: 'ENG' | 'RUS') => {
	const setting = {
		inputs: [
			{
				name: 'fullName',
				placeholder: `${language === 'ENG' ? 'Enter your full name' : 'Введи свое имя'}`,
				type: 'text',
				description: `${language === 'ENG' ? 'This is your full name' : 'Это ваше имя'}`,
			},
			{
				name: 'email',
				placeholder: `${language === 'ENG' ? 'Enter your email' : 'Введи свою почту'}`,
				type: 'email',
				description: `${language === 'ENG' ? 'This is your email' : 'Это ваша почта'}`,
			},
			{
				name: 'username',
				placeholder: `${language === 'ENG' ? 'Enter your username' : 'Введи свою юзернейм'}`,
				type: 'text',
				description: `${language === 'ENG' ? 'This is your username' : 'Это ваш юзернейм'}`,
			},
			{
				name: 'language',
				type: 'text',
				description: `${language === 'ENG' ? 'Enter to RUS | ENG' : 'Введи RUS | ENG'}`,
			},
		],
		heading: `${language === 'ENG' ? 'Setting' : 'Настройки'}`,
	}

	return useMemo(() => setting, [setting, language])
}
