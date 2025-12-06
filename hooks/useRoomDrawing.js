// hooks/useRoomDrawing.js
'use client'

import { useDispatch, useSelector } from 'react-redux'
import { startDrawingRoom, updateMousePos as updateRoomMousePos, finishDrawingRoom, addRoom, hideRoomPropertiesDialog } from '../store/roomSlice'
import { setTool } from '../store/uiSlice'
import { calculateArea, createWallsFromVertices, createRectVertices, generateRoomStyle } from '../utils/roomHelpers'

export default function useRoomDrawing() {
	const dispatch = useDispatch()
	const { rooms, roomStartPos } = useSelector((state) => state.room)

	const handleStartDrawing = (pos) => {
		dispatch(startDrawingRoom(pos))
	}

	const handleUpdateMousePos = (pos) => {
		dispatch(updateRoomMousePos(pos))
	}

	const handleFinishDrawing = (startPos, endPos) => {
		if (!startPos || !endPos) {
			dispatch(finishDrawingRoom(null))
			return
		}

		// Minimum size check
		const width = Math.abs(endPos.x - startPos.x)
		const height = Math.abs(endPos.y - startPos.y)

		if (width < 20 || height < 20) {
			dispatch(finishDrawingRoom(null))
			return
		}

		// Create room vertices
		const vertices = createRectVertices(
			{ x: Math.min(startPos.x, endPos.x), y: Math.min(startPos.y, endPos.y) },
			{ x: Math.max(startPos.x, endPos.x), y: Math.max(endPos.y, endPos.y) }
		)

		const area = calculateArea(vertices)
		const walls = createWallsFromVertices(vertices)

		const newRoom = {
			id: `room-${Date.now()}`,
			name: `Room ${rooms.length + 1}`,
			type: 'other',
			vertices,
			walls,
			area,
			dimensions: {
				width: Math.abs(endPos.x - startPos.x),
				height: Math.abs(endPos.y - startPos.y),
			},
			style: generateRoomStyle(),
		}

		console.log('🆕[useRoomDrawing] Finished drawing room:', newRoom)

		dispatch(addRoom(newRoom))
		dispatch(finishDrawingRoom(null)) // clear drawing state, no dialog
	}

	const handleSaveRoom = (roomData) => {
		dispatch(addRoom(roomData))
		dispatch(hideRoomPropertiesDialog())
		dispatch(setTool('select'))
	}

	const handleCancelRoom = () => {
		dispatch(hideRoomPropertiesDialog())
	}

	return {
		handleStartDrawing,
		handleUpdateMousePos,
		handleFinishDrawing,
		handleSaveRoom,
		handleCancelRoom,
	}
}
