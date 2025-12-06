// hooks/useCanvasInteractions.js
'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { clearSelection } from '../store/uiSlice'
import { updateZoomAndPan } from '../store/viewSlice'
import useRoomDrawing from './useRoomDrawing'
import useWallDrawing from './useWallDrawing'

export default function useCanvasInteractions() {
	const dispatch = useDispatch()
	const { tool } = useSelector((state) => state.ui)
	const { isDrawingRoom, roomStartPos } = useSelector((state) => state.room)
	const { isDrawingWall, wallStartPos } = useSelector((state) => state.wall)
	const { zoom, panX, panY } = useSelector((state) => state.view)

	// Track panning state
	const isPanningRef = useRef(false)
	const lastPanPosRef = useRef({ x: 0, y: 0 })

	// Custom hooks for drawing logic based on tool selected
	const roomDrawing = useRoomDrawing()
	const wallDrawing = useWallDrawing()

	/**
	 * Convert pointer position to canvas coordinates accounting for zoom and pan
	 */
	const getCanvasCoordinates = (stage) => {
		const pointerPos = stage.getPointerPosition()
		if (!pointerPos) return null

		// Convert from screen coordinates to canvas coordinates
		// Formula: canvasCoord = (screenCoord - pan) / zoom
		return {
			x: (pointerPos.x - panX) / zoom,
			y: (pointerPos.y - panY) / zoom,
		}
	}

	// Mouse down handler for starting drawing actions based on the selected tool
	const handleMouseDown = (e) => {
		console.log('⬇️Mouse Down Event:', e.target.getStage())

		const stage = e.target.getStage()
		const pointer = stage.getPointerPosition()

		// Handle middle mouse button for panning
		if (e.evt.button === 1) {
			isPanningRef.current = true
			lastPanPosRef.current = { x: pointer.x, y: pointer.y }
			return
		}

		const pos = getCanvasCoordinates(stage)

		if (!pos) return

		if (tool === 'room' && !isDrawingRoom) {
			roomDrawing.handleStartDrawing(pos)
		} else if (tool === 'wall' && !isDrawingWall) {
			wallDrawing.handleStartDrawing(pos)
		}
	}

	const handleMouseMove = (e) => {
		// console.log('➡️Mouse Move Event:', e.target.getStage())
		const stage = e.target.getStage()

		// Handle panning with middle mouse button
		if (isPanningRef.current) {
			const pointer = stage.getPointerPosition()
			const deltaX = pointer.x - lastPanPosRef.current.x
			const deltaY = pointer.y - lastPanPosRef.current.y

			dispatch(
				updateZoomAndPan({
					zoom,
					panX: panX + deltaX,
					panY: panY + deltaY,
				})
			)

			lastPanPosRef.current = { x: pointer.x, y: pointer.y }
			return
		}

		const pos = getCanvasCoordinates(stage)

		if (!pos) return

		if (tool === 'room' && isDrawingRoom) {
			roomDrawing.handleUpdateMousePos(pos)
		} else if (tool === 'wall' && isDrawingWall) {
			wallDrawing.handleUpdateEndPos(pos)
		}
	}

	const handleMouseUp = (e) => {
		console.log('⬆️Mouse Up Event:', e.target.getStage())

		// Stop panning
		if (isPanningRef.current) {
			isPanningRef.current = false
			return
		}

		const stage = e.target.getStage()
		const pos = getCanvasCoordinates(stage)

		if (!pos) return

		if (tool === 'room' && isDrawingRoom) {
			roomDrawing.handleFinishDrawing(roomStartPos, pos)
		} else if (tool === 'wall' && isDrawingWall) {
			wallDrawing.handleFinishDrawing(wallStartPos, pos, true)
		}
	}

	const handleStageClick = (e) => {
		if (e.target === e.target.getStage()) {
			dispatch(clearSelection())
		}
	}

	return {
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleStageClick,
	}
}
