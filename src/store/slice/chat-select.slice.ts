import { Chat } from '@/shared/intreface/chat.intreface'
import { createSlice } from '@reduxjs/toolkit'

type ChatSelectState = {
	chat: Chat | null
}

const initialState: ChatSelectState = {
	chat: null
}


const chatSelectSlice = createSlice({
	name: 'chatSelect',
	initialState,
	reducers: {
		setChatId: (state, action) => {
			state.chat = action.payload
		},
	},
})
export const { setChatId } = chatSelectSlice.actions

export default chatSelectSlice.reducer
