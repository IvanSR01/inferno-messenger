import { User } from '@/shared/intreface/user.interface'
import { createSlice } from '@reduxjs/toolkit'

type MeProfileState = {
	me: User | null
}

const initialState: MeProfileState = {
	me: null,
}

const meSlice = createSlice({
	name: 'me',
	initialState,
	reducers: {
		setMe: (state, action) => {
			state.me = action.payload
		},
	},
})

export const { setMe } = meSlice.actions

export default meSlice.reducer