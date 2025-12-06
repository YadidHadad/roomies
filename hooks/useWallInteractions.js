// hooks/useWallInteractions.js
'use client'

import { useDispatch } from 'react-redux'
import { updateWall } from '../store/wallSlice'
import { setSelected } from '../store/uiSlice'

export default function useWallInteractions() {
	const dispatch = useDispatch()

	const handleWallSelect = (wallId) => {
		dispatch(setSelected({ id: wallId, type: 'wall' }))
	}

	const handleWallDragEnd = (e, wall) => {
		const deltaX = e.target.x()
		const deltaY = e.target.y()

		const updatedWall = {
			...wall,
			start: { x: wall.start.x + deltaX, y: wall.start.y + deltaY },
			end: { x: wall.end.x + deltaX, y: wall.end.y + deltaY },
		}

		dispatch(updateWall(updatedWall))
		e.target.position({ x: 0, y: 0 })
	}

	return {
		handleWallSelect,
		handleWallDragEnd,
	}
}
