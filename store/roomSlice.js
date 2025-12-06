// store/roomSlice.js (complete version)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rooms: [],
	selectedRoomId: null,
	isDrawingRoom: false,
	roomStartPos: null,
	currentMousePos: null,
	showRoomDialog: false,
	tempRoom: null,
}

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		// Room CRUD actions
		addRoom: (state, action) => {
			// Assign zIndex based on creation order (number of rooms + 1)
			const newRoom = {
				...action.payload,
				zIndex: state.rooms.length,
			}
			state.rooms.push(newRoom)
		},
		updateRoom: (state, action) => {
			const index = state.rooms.findIndex((r) => r.id === action.payload.id)
			if (index !== -1) {
				state.rooms[index] = action.payload
			}
		},
		deleteRoom: (state, action) => {
			state.rooms = state.rooms.filter((r) => r.id !== action.payload)
		},
		setRooms: (state, action) => {
			state.rooms = action.payload
		},
		clearRooms: (state) => {
			state.rooms = []
		},

		// Room selection - bring selected to front, subtract 1 from others
		selectRoom: (state, action) => {
			const selectedId = action.payload
			const maxZIndex = Math.max(...state.rooms.map((r) => r.zIndex || 0), 0)

			state.rooms = state.rooms.map((r) => ({
				...r,
				zIndex: r.id === selectedId ? maxZIndex + 1 : (r.zIndex || 0) - 1,
			}))

			state.selectedRoomId = selectedId
		},
		deselectRoom: (state) => {
			state.selectedRoomId = null
		},

		// Room drawing actions
		startDrawingRoom: (state, action) => {
			state.isDrawingRoom = true
			state.roomStartPos = action.payload
		},
		updateMousePos: (state, action) => {
			state.currentMousePos = action.payload
		},
		finishDrawingRoom: (state, action) => {
			state.isDrawingRoom = false
			state.tempRoom = action.payload
			// Only show dialog if room is valid and has minimum size:

			// if (action.payload && action.payload.dimensions && action.payload.dimensions.width >= 20 && action.payload.dimensions.height >= 20) {
			// 	state.showRoomDialog = true
			// } else {
			// 	state.showRoomDialog = false
			// }
			state.roomStartPos = null
			state.currentMousePos = null
		},
		cancelDrawingRoom: (state) => {
			state.isDrawingRoom = false
			state.roomStartPos = null
			state.currentMousePos = null
			state.tempRoom = null
			state.showRoomDialog = false
		},

		// Room dialog actions
		showRoomPropertiesDialog: (state, action) => {
			state.showRoomDialog = true
			state.tempRoom = action.payload
		},
		hideRoomPropertiesDialog: (state) => {
			state.showRoomDialog = false
			state.tempRoom = null
		},
	},
})

export const {
	addRoom,
	updateRoom,
	deleteRoom,
	setRooms,
	clearRooms,
	selectRoom,
	deselectRoom,
	startDrawingRoom,
	updateMousePos,
	finishDrawingRoom,
	cancelDrawingRoom,
	showRoomPropertiesDialog,
	hideRoomPropertiesDialog,
} = roomSlice.actions

export default roomSlice.reducer
