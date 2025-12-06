// store/wallSlice.js (updated)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	walls: [],
	selectedWallId: null,
	isDrawingWall: false,
	wallStartPos: null,
	wallEndPos: null,
	wallSettings: {
		thickness: 20,
		layers: [
			{ name: 'interior', thickness: 0.5, color: '#000000ff' },
			// { name: 'structure', thickness: 0.7, color: '#CCCCCC' },
			// { name: 'exterior', thickness: 0.15, color: '#B8B8B8' },
		],
	},
}

const wallSlice = createSlice({
	name: 'wall',
	initialState,
	reducers: {
		// Wall CRUD actions
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
		clearWalls: (state) => {
			state.walls = []
		},

		// Wall selection
		selectWall: (state, action) => {
			state.selectedWallId = action.payload
		},
		deselectWall: (state) => {
			state.selectedWallId = null
		},

		// Wall drawing actions
		startDrawingWall: (state, action) => {
			state.isDrawingWall = true
			state.wallStartPos = action.payload
		},
		updateWallEndPos: (state, action) => {
			state.wallEndPos = action.payload
		},
		finishDrawingWall: (state, action) => {
			if (action.payload) {
				state.walls.push(action.payload)
			}
			state.isDrawingWall = false
			state.wallStartPos = null
			state.wallEndPos = null
		},
		cancelDrawingWall: (state) => {
			state.isDrawingWall = false
			state.wallStartPos = null
			state.wallEndPos = null
		},

		// Wall settings
		updateWallSettings: (state, action) => {
			state.wallSettings = { ...state.wallSettings, ...action.payload }
		},
		setWallThickness: (state, action) => {
			state.wallSettings.thickness = action.payload
		},
		updateWallLayer: (state, action) => {
			const { index, layer } = action.payload
			state.wallSettings.layers[index] = { ...state.wallSettings.layers[index], ...layer }
		},
		addWallLayer: (state, action) => {
			state.wallSettings.layers.push(action.payload)
		},
		removeWallLayer: (state, action) => {
			state.wallSettings.layers.splice(action.payload, 1)
		},
	},
})

export const {
	addWall,
	updateWall,
	deleteWall,
	setWalls,
	clearWalls,
	selectWall,
	deselectWall,
	startDrawingWall,
	updateWallEndPos,
	finishDrawingWall,
	cancelDrawingWall,
	updateWallSettings,
	setWallThickness,
	updateWallLayer,
	addWallLayer,
	removeWallLayer,
} = wallSlice.actions

export default wallSlice.reducer
