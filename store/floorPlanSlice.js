// store/floorPlanSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tool: 'select',
	selectedId: null,
	walls: [],
	doors: [],
	windows: [],
	rooms: [],
	// Room drawing state
	isDrawingRoom: false,
	roomStartPos: null,
	currentMousePos: null,
	showRoomDialog: false,
	tempRoom: null,
}

const floorPlanSlice = createSlice({
	name: 'floorPlan',
	initialState,
	reducers: {
		// Tool actions
		setTool: (state, action) => {
			state.tool = action.payload
		},
		setSelectedId: (state, action) => {
			state.selectedId = action.payload
		},

		// Wall actions
		addWall: (state, action) => {
			state.walls.push(action.payload)
		},
		updateWall: (state, action) => {
			const index = state.walls.findIndex((w) => w.id === action.payload.id)
			if (index !== -1) {
				state.walls[index] = action.payload
			}
		},
		deleteWall: (state, action) => {
			state.walls = state.walls.filter((w) => w.id !== action.payload)
		},
		setWalls: (state, action) => {
			state.walls = action.payload
		},

		// Door actions
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

		// Window actions
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

		// Room actions
		addRoom: (state, action) => {
			state.rooms.push(action.payload)
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
			state.showRoomDialog = true
			state.roomStartPos = null
			state.currentMousePos = null
		},
		cancelDrawingRoom: (state) => {
			state.isDrawingRoom = false
			state.roomStartPos = null
			state.currentMousePos = null
		},
		showRoomPropertiesDialog: (state, action) => {
			state.showRoomDialog = true
			state.tempRoom = action.payload
		},
		hideRoomPropertiesDialog: (state) => {
			state.showRoomDialog = false
			state.tempRoom = null
		},

		// Delete selected item
		deleteSelected: (state) => {
			if (!state.selectedId) return

			state.walls = state.walls.filter((w) => w.id !== state.selectedId)
			state.doors = state.doors.filter((d) => d.id !== state.selectedId)
			state.windows = state.windows.filter((w) => w.id !== state.selectedId)
			state.rooms = state.rooms.filter((r) => r.id !== state.selectedId)
			state.selectedId = null
		},

		// Clear all
		clearAll: (state) => {
			state.walls = []
			state.doors = []
			state.windows = []
			state.rooms = []
			state.selectedId = null
		},

		// Load floor plan
		loadFloorPlan: (state, action) => {
			state.walls = action.payload.walls || []
			state.doors = action.payload.doors || []
			state.windows = action.payload.windows || []
			state.rooms = action.payload.rooms || []
			state.selectedId = null
		},
	},
})

export const {
	setTool,
	setSelectedId,
	addWall,
	updateWall,
	deleteWall,
	setWalls,
	addDoor,
	updateDoor,
	deleteDoor,
	setDoors,
	addWindow,
	updateWindow,
	deleteWindow,
	setWindows,
	addRoom,
	updateRoom,
	deleteRoom,
	setRooms,
	startDrawingRoom,
	updateMousePos,
	finishDrawingRoom,
	cancelDrawingRoom,
	showRoomPropertiesDialog,
	hideRoomPropertiesDialog,
	deleteSelected,
	clearAll,
	loadFloorPlan,
} = floorPlanSlice.actions

export default floorPlanSlice.reducer
