import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	zoom: 1,
	panX: 0,
	panY: 0,
}

const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setZoom: (state, action) => {
			state.zoom = action.payload
		},
		setPan: (state, action) => {
			state.panX = action.payload.x
			state.panY = action.payload.y
		},
		updateZoomAndPan: (state, action) => {
			state.zoom = action.payload.zoom
			state.panX = action.payload.panX
			state.panY = action.payload.panY
		},
		resetView: (state) => {
			state.zoom = 1
			state.panX = 0
			state.panY = 0
		},
	},
})

export const { setZoom, setPan, updateZoomAndPan, resetView } = viewSlice.actions
export default viewSlice.reducer
