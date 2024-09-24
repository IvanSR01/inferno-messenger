/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch } from '@/hooks/useAction'
import { useError } from '@/hooks/useError'
import { useProfile } from '@/hooks/useProfile'
import chatService from '@/services/chat-service/chat.service'
import socketService from '@/services/socket-service/socket.service'
import userService from '@/services/user-service/user.service'
import { CreateChat, UpdateChat } from '@/shared/intreface/chat.intreface'
import { User } from '@/shared/intreface/user.interface'
import { setChatId } from '@/store/slice/chat-select.slice'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export type TypeChatController = {
	isPersonal: boolean
	user: User[]
	avatar: string
	background: string
	name: string
	id?: number
}

interface Props {
	isUpdate?: boolean
	initialState?: TypeChatController
}

const defaultState: TypeChatController = {
	isPersonal: false,
	user: [],
	avatar: '',
	background: '',
	name: '',
}

export default function useChatController({ isUpdate, initialState }: Props) {
	const [chat, setChat] = useState<TypeChatController>(
		initialState ? initialState : defaultState
	)
	const me = useProfile()
	const dispatch = useAppDispatch()
	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: () => userService.findAll(),
	})
	const { mutate } = useMutation({
		mutationFn: (p: CreateChat) => chatService.createChat(p),
		onSuccess: () => {
			socketService.emit('get-chats', {
				userId: me.id,
			})
			toast.success('Chat created successfully')
		},
		onError: (err) => toast.error(useError(err)),
	})

	const { mutate: updateMutate } = useMutation({
		mutationFn: (p: UpdateChat) => chatService.updateChat(p),
		onSuccess: () => toast.success('Chat updated successfully'),
		onError: (err) => toast.error(useError(err)),
	})

	const handleSelectUser = (user: any) => {
		if (chat.isPersonal && chat.user.length) {
			return setChat({ ...chat, user: [user] })
		}
		if (chat.user.includes(user)) {
			const newIds = chat.user.filter((item) => item.id !== user.id)
			return setChat({ ...chat, user: newIds })
		}
		setChat({ ...chat, user: [...chat.user, user] })
	}

	const setPicture = (value: string, where: 'background' | 'avatar') =>
		setChat({ ...chat, [where]: `/${value}` })
	const onSubmit = (): void => {
		const data = {
			...chat,
			ids: chat.user.map((user: User) => user.id),
		}
		if (!isUpdate) {
			mutate(data as CreateChat)
		} else {
			updateMutate(data as UpdateChat)
		}
		dispatch(setChatId(null))
	}
	useEffect(() => {
		if (chat.isPersonal) setChat({ ...chat, user: [] })
	}, [chat.isPersonal])
	return useMemo(
		() => ({
			onSubmit,
			data,
			handleSelectUser,
			setPicture,
			chat,
			setChat,
		}),
		[onSubmit, data, handleSelectUser, setPicture, chat, setChat]
	)
}
