// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import roomReducer from './roomSlice'
import wallReducer from './wallSlice'
import doorReducer from './doorSlice'
import windowReducer from './windowSlice'
import viewReducer from './viewSlice'

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		room: roomReducer,
		wall: wallReducer,
		door: doorReducer,
		window: windowReducer,
		view: viewReducer,
	},
})
