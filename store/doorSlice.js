// store/doorSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	doors: [],
	selectedDoorId: null,
	isPlacingDoor: false,
	doorPreviewPos: null,
	doorSettings: {
		width: 30,
		type: 'single',
		swingDirection: 'right',
	},
}

const doorSlice = createSlice({
	name: 'door',
	initialState,
	reducers: {
		// Door CRUD actions
		addDoor: (state, action) => {
			state.doors.push(action.payload)
		},
		updateDoor: (state, action) => {
			const index = state.doors.findIndex((d) => d.id === action.payload.id)
			if (index !== -1) {
				state.doors[index] = action.payload
			}
		},
		deleteDoor: (state, action) => {
			state.doors = state.doors.filter((d) => d.id !== action.payload)
		},
		setDoors: (state, action) => {
			state.doors = action.payload
		},
		clearDoors: (state) => {
			state.doors = []
		},

		// Door selection
		selectDoor: (state, action) => {
			state.selectedDoorId = action.payload
		},
		deselectDoor: (state) => {
			state.selectedDoorId = null
		},

		// Door placement actions
		startPlacingDoor: (state) => {
			state.isPlacingDoor = true
		},
		updateDoorPreview: (state, action) => {
			state.doorPreviewPos = action.payload
		},
		finishPlacingDoor: (state, action) => {
			if (action.payload) {
				state.doors.push(action.payload)
			}
			state.isPlacingDoor = false
			state.doorPreviewPos = null
		},
		cancelPlacingDoor: (state) => {
			state.isPlacingDoor = false
			state.doorPreviewPos = null
		},

		// Door settings
		updateDoorSettings: (state, action) => {
			state.doorSettings = { ...state.doorSettings, ...action.payload }
		},
		setDoorWidth: (state, action) => {
			state.doorSettings.width = action.payload
		},
		setDoorType: (state, action) => {
			state.doorSettings.type = action.payload
		},
		setDoorSwingDirection: (state, action) => {
			state.doorSettings.swingDirection = action.payload
		},
	},
})

export const {
	addDoor,
	updateDoor,
	deleteDoor,
	setDoors,
	clearDoors,
	selectDoor,
	deselectDoor,
	startPlacingDoor,
	updateDoorPreview,
	finishPlacingDoor,
	cancelPlacingDoor,
	updateDoorSettings,
	setDoorWidth,
	setDoorType,
	setDoorSwingDirection,
} = doorSlice.actions

export default doorSlice.reducer
