import { Channel } from '@/shared/intreface/channel.interface'
import { Chat } from '@/shared/intreface/chat.intreface'
import { createSlice } from '@reduxjs/toolkit'

type ChatSelectState = {
	chat: Chat | Channel | null
	selectChatType: 'chats' | 'channel'
}

const initialState: ChatSelectState = {
	chat: null,
	selectChatType: 'chats',
}

const chatSelectSlice = createSlice({
	name: 'chatSelect',
	initialState,
	reducers: {
		setChatId: (state, action) => {
			state.chat = action.payload
		},
		setSelectChatType: (state, action) => {
			state.chat = null
			state.selectChatType = action.payload
		},
	},
})
export const { setChatId, setSelectChatType } = chatSelectSlice.actions

export default chatSelectSlice.reducer
