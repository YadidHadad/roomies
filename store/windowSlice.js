// store/windowSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	windows: [],
	selectedWindowId: null,
	isPlacingWindow: false,
	windowPreviewPos: null,
	windowSettings: {
		width: 40,
		height: 60,
		type: 'standard',
	},
}

const windowSlice = createSlice({
	name: 'window',
	initialState,
	reducers: {
		// Window CRUD actions
		addWindow: (state, action) => {
			state.windows.push(action.payload)
		},
		updateWindow: (state, action) => {
			const index = state.windows.findIndex((w) => w.id === action.payload.id)
			if (index !== -1) {
				state.windows[index] = action.payload
			}
		},
		deleteWindow: (state, action) => {
			state.windows = state.windows.filter((w) => w.id !== action.payload)
		},
		setWindows: (state, action) => {
			state.windows = action.payload
		},
		clearWindows: (state) => {
			state.windows = []
		},

		// Window selection
		selectWindow: (state, action) => {
			state.selectedWindowId = action.payload
		},
		deselectWindow: (state) => {
			state.selectedWindowId = null
		},

		// Window placement actions
		startPlacingWindow: (state) => {
			state.isPlacingWindow = true
		},
		updateWindowPreview: (state, action) => {
			state.windowPreviewPos = action.payload
		},
		finishPlacingWindow: (state, action) => {
			if (action.payload) {
				state.windows.push(action.payload)
			}
			state.isPlacingWindow = false
			state.windowPreviewPos = null
		},
		cancelPlacingWindow: (state) => {
			state.isPlacingWindow = false
			state.windowPreviewPos = null
		},

		// Window settings
		updateWindowSettings: (state, action) => {
			state.windowSettings = { ...state.windowSettings, ...action.payload }
		},
		setWindowWidth: (state, action) => {
			state.windowSettings.width = action.payload
		},
		setWindowHeight: (state, action) => {
			state.windowSettings.height = action.payload
		},
		setWindowType: (state, action) => {
			state.windowSettings.type = action.payload
		},
	},
})

export const {
	addWindow,
	updateWindow,
	deleteWindow,
	setWindows,
	clearWindows,
	selectWindow,
	deselectWindow,
	startPlacingWindow,
	updateWindowPreview,
	finishPlacingWindow,
	cancelPlacingWindow,
	updateWindowSettings,
	setWindowWidth,
	setWindowHeight,
	setWindowType,
} = windowSlice.actions

export default windowSlice.reducer
