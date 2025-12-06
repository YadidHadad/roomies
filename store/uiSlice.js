// store/uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tool: 'select',
	selectedId: null,
	selectedType: null, // 'room', 'wall', 'door', 'window'
	gridSize: 50,
	snapToGrid: true,
	showGrid: true,
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setTool: (state, action) => {
			console.log('✂️Setting tool to:', action.payload)
			state.tool = action.payload
		},
		setSelected: (state, action) => {
			state.selectedId = action.payload.id
			state.selectedType = action.payload.type
		},
		clearSelection: (state) => {
			state.selectedId = null
			state.selectedType = null
		},
		setGridSize: (state, action) => {
			state.gridSize = action.payload
		},
		toggleSnapToGrid: (state) => {
			state.snapToGrid = !state.snapToGrid
		},
		toggleShowGrid: (state) => {
			state.showGrid = !state.showGrid
		},
	},
})

export const { setTool, setSelected, clearSelection, setGridSize, toggleSnapToGrid, toggleShowGrid } = uiSlice.actions

export default uiSlice.reducer
