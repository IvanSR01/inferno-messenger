/* eslint-disable react-hooks/rules-of-hooks */
import UserAvatar from '@/components/user-avatar/UserAvatar'
import { User } from '@/shared/intreface/user.interface'
import Button from '@/shared/ui/button/Button'
import Input from '@/shared/ui/input/Input'
import UserSelect from '@/shared/ui/user-select/UserSelect'
import uploadsFiles from '@/shared/utils/uploadsFiles'
import { FC, useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import styles from './ChatController.module.scss'
import useChatController, { TypeChatController } from './useChatController'

interface Props {
	close: any
	initialState?: any
	isUpdate?: boolean
}

const ChatController: FC<Props> = ({ close, initialState, isUpdate }) => {
	const inputRefAvatar = useRef<HTMLInputElement>(null)
	const inputRefBackground = useRef<HTMLInputElement>(null)

	const { chat, data, onSubmit, handleSelectUser, setChat, setPicture } =
		useChatController({
			initialState,
			isUpdate,
		})

	return (
		<>
			<div onClick={() => close()}>
				<IoCloseOutline className={styles.close} />
			</div>
			<h2 className={styles.heading}>
				{isUpdate ? 'Update chat' : setting.heading}{' '}
			</h2>
			{!!chat.isPersonal ? (
				<></>
			) : (
				<div
					className={styles.avatar}
					onClick={() => inputRefAvatar.current?.click()}
				>
					<UserAvatar src={chat?.avatar} alt={chat?.name} size="big" />
					<p className={styles.edit}>
						<FiEdit3 />
					</p>
					<input
						type="file"
						hidden
						accept="image/*"
						ref={inputRefAvatar}
						onChange={(e) =>
							uploadsFiles({
								file: e.target.files ? e.target.files[0] : ({} as any),
								setContent: (val: string) => setPicture(val, 'avatar'),
								folder: 'chat',
							})
						}
					/>
				</div>
			)}

			{setting.inputs.map((input, index) => (
				<div className={styles.group} key={index}>
					{chat.isPersonal && input.name === 'name' ? (
						<></>
					) : (
						<>
							<Input
								placeholder={input.placeholder}
								value={
									(chat?.[input.name as keyof TypeChatController] as any) || ''
								}
								onChange={(e: any) =>
									setChat({
										...chat,
										[input.name]:
											input.type === 'checkbox'
												? e.target.checked
												: e.target.value,
									})
								}
								type={input.type}
							/>
							<p className={styles.description}>{input.description}</p>
						</>
					)}
				</div>
			))}

			{!isUpdate && (
				<div className={styles.group}>
					<UserSelect
						users={data as User[]}
						selectedUsers={chat?.user}
						onSelectUser={handleSelectUser}
						isOneSelect={chat.isPersonal}
					/>
					<p className={styles.description}>Select a user to chat with</p>
				</div>
			)}
			<Button
				onClick={() =>
					chat.background
						? setChat({ ...chat, background: '' })
						: inputRefBackground.current?.click()
				}
				color={chat?.background ? 'red' : 'blue'}
			>
				{chat.background ? 'Remove' : 'Upload'} background
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
						folder: 'chat',
					})
				}
			/>

			<Button onClick={() => onSubmit()}>
				{isUpdate ? 'Update chat' : setting.heading}
			</Button>
		</>
	)
}
export default ChatController

const setting = {
	inputs: [
		{
			name: 'isPersonal',
			type: 'checkbox',
			description: 'Is this chat personal?',
		},
		{
			name: 'name',
			placeholder: 'Enter chat name',
			type: 'text',
			description:
				'Create is your original chat name :) (optional if is personal)',
		},
	],
	heading: 'Create Chat',
}
