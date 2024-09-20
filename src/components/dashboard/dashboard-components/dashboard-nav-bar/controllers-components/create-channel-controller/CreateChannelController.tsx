/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useRef, useState } from 'react'
import styles from './CreateChannelController.module.scss'
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { FiEdit3 } from 'react-icons/fi'
import uploadsFiles from '@/shared/utils/uploadsFiles'
import Input from '@/shared/ui/input/Input'
import Button from '@/shared/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import channelService from '@/services/channel-serivce/channel.service'
import { toast } from 'react-toastify'
import { useError } from '@/hooks/useError'
import { IoCloseOutline } from 'react-icons/io5'

interface Props {
	close: any
}
// todo fix any
const CreateChannelController: FC<Props> = ({ close }) => {
	const [channel, setChannel] = useState<any>({
		name: '',
		avatar: '',
		description: '',
		background: '',
	})

	const setPicture = (value: string, where: 'background' | 'avatar') =>
		setChannel({ ...channel, [where]: `/${value}` })

	const inputRef = useRef<HTMLInputElement>(null)
	const inputRefBackground = useRef<HTMLInputElement>(null)
	const { mutate } = useMutation({
		mutationFn: () => channelService.createChannel(channel),
		onError: (err) => {
			toast.error(useError(err))
		},
		onSuccess: () => toast.success('Channel created successfully'),
	})
	return (
		<>
			<div onClick={() => close()}>
				<IoCloseOutline className={styles.close} />
			</div>
			<h2 className={styles.heading}>{setting.heading}</h2>
			<div className={styles.avatar} onClick={() => inputRef.current?.click()}>
				<UserAvatar src={channel?.avatar} alt={channel?.name} size="big" />
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
							setContent: (val: string) => setPicture(val, 'avatar'),
							folder: 'channel',
						})
					}
				/>
			</div>
			{setting.inputs.map((input, index) => (
				<div className={styles.group} key={index}>
					<Input
						// name={input.name}
						placeholder={input.placeholder}
						value={(channel?.[input.name as any] as any) || ''}
						onChange={(e: any) =>
							setChannel({ ...channel, [input.name]: e.target.value })
						}
						type={input.type}
					/>
					<p className={styles.description}>{input.description}</p>
				</div>
			))}
			<Button
				onClick={() =>
					channel.background
						? setChannel({ ...channel, background: '' })
						: inputRefBackground.current?.click()
				}
				color={channel?.background ? 'red' : 'blue'}
			>
				{channel.background ? 'Remove' : 'Upload'} background
			</Button>
			<input
				type="file"
				hidden
				accept="image/*"
				ref={inputRefBackground}
				onChange={(e) =>
					uploadsFiles({
						file: e.target.files ? e.target.files[0] : ({} as any),
						setContent: (val: string) => setPicture(val, 'background'),
						folder: 'channel',
					})
				}
			/>
			<Button onClick={() => mutate()}>Create Channel</Button>
		</>
	)
}

export default CreateChannelController

const setting = {
	inputs: [
		{
			name: 'name',
			placeholder: 'Enter your channel name',
			type: 'text',
			description: 'This is your original channel name',
		},
		{
			name: 'description',
			placeholder: 'Enter your channel description',
			type: 'email',
			description: 'This is your channel description',
		},
	],
	heading: 'Create Channel',
}
