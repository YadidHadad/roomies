// store/floorPlanActions.js
import { clearRooms } from './roomSlice'
import { clearWalls } from './wallSlice'
import { clearDoors } from './doorSlice'
import { clearWindows } from './windowSlice'
import { clearSelection } from './uiSlice'

// Clear entire floor plan
export const clearAll = () => (dispatch) => {
	dispatch(clearRooms())
	dispatch(clearWalls())
	dispatch(clearDoors())
	dispatch(clearWindows())
	dispatch(clearSelection())
}

// Delete selected item
export const deleteSelected = () => (dispatch, getState) => {
	const state = getState()
	const { selectedId, selectedType } = state.ui

	if (!selectedId || !selectedType) return

	switch (selectedType) {
		case 'room':
			const { deleteRoom } = require('./roomSlice')
			dispatch(deleteRoom(selectedId))
			break
		case 'wall':
			const { deleteWall } = require('./wallSlice')
			dispatch(deleteWall(selectedId))
			break
		case 'door':
			const { deleteDoor } = require('./doorSlice')
			dispatch(deleteDoor(selectedId))
			break
		case 'window':
			const { deleteWindow } = require('./windowSlice')
			dispatch(deleteWindow(selectedId))
			break
	}

	dispatch(clearSelection())
}

// Load floor plan
export const loadFloorPlan = (plan) => (dispatch) => {
	const { setRooms } = require('./roomSlice')
	const { setWalls } = require('./wallSlice')
	const { setDoors } = require('./doorSlice')
	const { setWindows } = require('./windowSlice')

	dispatch(setRooms(plan.rooms || []))
	dispatch(setWalls(plan.walls || []))
	dispatch(setDoors(plan.doors || []))
	dispatch(setWindows(plan.windows || []))
	dispatch(clearSelection())
}
