import { configureStore } from '@reduxjs/toolkit'
import chatSelectSlice from './slice/chat-select.slice'
import meSlice from './slice/me.slice'
import searchSlice from './slice/search.slice'
const store = configureStore({
	reducer: {
		chat: chatSelectSlice,
		me: meSlice,
		search: searchSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
