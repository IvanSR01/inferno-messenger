import { createSlice } from '@reduxjs/toolkit'

type ChatSelectState = {
	chatId: number | null
}

const initialState: ChatSelectState = {
	chatId: null
}


const chatSelectSlice = createSlice({
	name: 'chatSelect',
	initialState,
	reducers: {
		setChatId: (state, action) => {
			state.chatId = action.payload
		},
	},
})
export const { setChatId } = chatSelectSlice.actions

export default chatSelectSlice.reducer
