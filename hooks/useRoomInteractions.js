// hooks/useRoomInteractions.js
'use client'

import { useDispatch, useSelector } from 'react-redux'
import { updateRoom, selectRoom } from '../store/roomSlice'
import { setSelected } from '../store/uiSlice'
import { calculateArea, createWallsFromVertices, updateCornerVertex, updateEdgeVertex } from '../utils/roomHelpers'

export default function useRoomInteractions() {
	const SNAP_DISTANCE = 15
	const dispatch = useDispatch()
	const { rooms } = useSelector((state) => state.room)
	const { selectedId, selectedType } = useSelector((state) => state.ui)

	const handleRoomSelect = (roomId) => {
		// Use Redux selectRoom action which handles zIndex logic
		dispatch(selectRoom(roomId))
		dispatch(setSelected({ id: roomId, type: 'room' }))
	}

	const handleRoomDragEnd = (e, room) => {
		// Only handle drag if the position actually changed
		const deltaX = e.target.x()
		const deltaY = e.target.y()

		// If no movement, don't update
		if (deltaX === 0 && deltaY === 0) {
			return
		}

		let finalDeltaX = deltaX
		let finalDeltaY = deltaY

		let tempDeltaX = Infinity
		let tempDeltaY = Infinity

		// Compare this room's vertices with all other rooms' vertices
		rooms.forEach((otherRoom) => {
			// Skip self
			if (otherRoom.id === room.id) return

			// Check each vertex for snapping
			otherRoom.vertices.forEach((otherVertex) => {
				room.vertices.forEach((myVertex) => {
					// Check X-axis snap
					const distX = Math.abs(myVertex.x + finalDeltaX - otherVertex.x)
					if (distX < SNAP_DISTANCE && distX < Math.abs(tempDeltaX)) {
						tempDeltaX = otherVertex.x - (myVertex.x + finalDeltaX)
					}

					// Check Y-axis snap
					const distY = Math.abs(myVertex.y + finalDeltaY - otherVertex.y)
					if (distY < SNAP_DISTANCE && distY < Math.abs(tempDeltaY)) {
						tempDeltaY = otherVertex.y - (myVertex.y + finalDeltaY)
					}
				})
			})
		})

		// Only apply snap if found (not Infinity)
		if (tempDeltaX === Infinity) tempDeltaX = 0
		if (tempDeltaY === Infinity) tempDeltaY = 0

		const updatedRoom = {
			...room,
			vertices: room.vertices.map((v) => ({
				x: v.x + finalDeltaX + tempDeltaX,
				y: v.y + finalDeltaY + tempDeltaY,
			})),
			walls: room.walls.map((w) => ({
				...w,
				start: { x: w.start.x + finalDeltaX + tempDeltaX, y: w.start.y + finalDeltaY + tempDeltaY },
				end: { x: w.end.x + finalDeltaX + tempDeltaX, y: w.end.y + finalDeltaY + tempDeltaY },
			})),
		}

		console.log('[useRoomInteractions] Updating room position:', updatedRoom)
		dispatch(updateRoom(updatedRoom))
		e.target.position({ x: 0, y: 0 })
	}

	const handleRoomResize = (type, index, newPos) => {
		console.log('[handleRoomResize] Called with:', { type, index, newPos: { x: newPos?.x, y: newPos?.y } })
		console.log('[handleRoomResize] selectedId:', selectedId, 'selectedType:', selectedType)

		if (!selectedId || selectedType !== 'room') {
			console.warn('[handleRoomResize] Early return - not a room selected')
			return
		}

		const room = rooms.find((r) => r.id === selectedId)
		console.log('[handleRoomResize] Found room:', room?.id, 'vertices:', room?.vertices)

		if (!room) {
			console.error('[handleRoomResize] Room not found in state with id:', selectedId)
			return
		}

		let newVertices

		if (type === 'corner') {
			console.log('[handleRoomResize] Updating corner', index)
			newVertices = updateCornerVertex(room.vertices, index, newPos)
			console.log('[handleRoomResize] New vertices after corner update:', newVertices)
		} else if (type === 'edge') {
			console.log('[handleRoomResize] Updating edge', index)
			newVertices = updateEdgeVertex(room.vertices, index, newPos)
			console.log('[handleRoomResize] New vertices after edge update:', newVertices)
		} else {
			console.warn('[handleRoomResize] Unknown type:', type)
			return
		}

		if (!newVertices) {
			console.error('[handleRoomResize] newVertices is null/undefined')
			return
		}

		const updatedRoom = {
			...room,
			vertices: newVertices,
			walls: createWallsFromVertices(newVertices),
			area: calculateArea(newVertices),
			dimensions: {
				width: Math.abs(newVertices[1].x - newVertices[0].x),
				height: Math.abs(newVertices[2].y - newVertices[1].y),
			},
		}

		console.log('[handleRoomResize] Dispatching updateRoom with:', updatedRoom)
		dispatch(updateRoom(updatedRoom))
	}

	return {
		handleRoomSelect,
		handleRoomDragEnd,
		handleRoomResize,
	}
}
