'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Stage, Layer } from 'react-konva'
import Toolbar from '../components/Toolbar'
import RoomPropertiesDialog from '../components/RoomPropertiesDialog'
import RoomContextMenu from '../components/RoomContextMenu'
import ZoomControls from '../components/ZoomControls'
import CanvasContent from '../components/canvas/CanvasContent'
import useRoomDrawing from '../../hooks/useRoomDrawing'
import useCanvasInteractions from '../../hooks/useCanvasInteractions'
import { updateRoom, hideRoomPropertiesDialog } from '../../store/roomSlice'
import { updateZoomAndPan } from '../../store/viewSlice'
import { calculateArea, createWallsFromVertices, createRectVertices } from '../../utils/roomHelpers'

export default function FloorPlanEditor() {
	const { showRoomDialog, tempRoom } = useSelector(state => state.room)
	const { zoom, panX, panY } = useSelector(state => state.view)
	const dispatch = useDispatch()
	const [contextMenu, setContextMenu] = useState(null)

	// Custom hooks for room drawing logic
	const { handleSaveRoom, handleCancelRoom } = useRoomDrawing()

	// Custom hooks for canvas interactions
	const {
		handleMouseDown,
		handleMouseUp,
		handleMouseMove,
		handleStageClick
	} = useCanvasInteractions()

	// Determine if editing existing room or creating new
	const isEditing = tempRoom?.id && tempRoom.id.startsWith('room-')

	// Handle save for both new and editing modes
	const handleDialogSave = (roomData) => {
		if (isEditing) {
			// Editing existing room
			dispatch(updateRoom(roomData))
			dispatch(hideRoomPropertiesDialog())
		} else {
			// Creating new room
			handleSaveRoom(roomData)
		}
	}

	// Handle context menu (right-click) on room
	const handleRoomContextMenu = (room, event) => {
		// Get cursor position from event
		const position = event ? { x: event.pageX || 0, y: event.pageY || 0 } : { x: 0, y: 0 }
		setContextMenu({ room, position })
	}

	// Handle context menu save
	const handleContextMenuSave = (dimensions) => {
		if (contextMenu?.room) {
			const room = contextMenu.room

			// Get current bounds
			const minX = Math.min(...room.vertices.map(v => v.x))
			const minY = Math.min(...room.vertices.map(v => v.y))

			// Create new vertices based on new dimensions
			const newVertices = createRectVertices(
				{ x: minX, y: minY },
				{ x: minX + dimensions.width, y: minY + dimensions.height }
			)

			// Recalculate area and walls
			const newArea = calculateArea(newVertices)
			const newWalls = createWallsFromVertices(newVertices)

			const updatedRoom = {
				...room,
				vertices: newVertices,
				walls: newWalls,
				area: newArea,
				dimensions,
			}

			dispatch(updateRoom(updatedRoom))
			setContextMenu(null)
		}
	}

	// Handle mouse wheel zoom
	const handleWheel = (e) => {
		e.evt.preventDefault()
		const stage = e.target.getStage()
		const pointer = stage.getPointerPosition()

		const scaleBy = 1.1
		const newScale = e.evt.deltaY > 0 ? zoom / scaleBy : zoom * scaleBy
		const boundedScale = Math.max(0.1, Math.min(5, newScale))

		const newPanX = pointer.x - (pointer.x - panX) * (boundedScale / zoom)
		const newPanY = pointer.y - (pointer.y - panY) * (boundedScale / zoom)

		dispatch(updateZoomAndPan({ zoom: boundedScale, panX: newPanX, panY: newPanY }))
	}

	return (
		<div className="w-screen h-screen bg-gray-100 flex flex-col">
			{/* Top Navbar */}
			<div className=" border-b border-gray-300 px-4 py-2 flex items-center justify-between h-14" style={{ backgroundColor: '#2e302d' }}>
				<h1 className="text-lg font-light text-white">Spacroom</h1>
				<ZoomControls />
			</div>

			{/* Main Content Grid */}
			<div className="flex flex-1 overflow-hidden">
				{/* Left Sidebar */}
				<div className="border-r border-gray-300  overflow-y-auto w-160" style={{ backgroundColor: '#fdfffc' }}>
					<Toolbar />
				</div>

				{/* Canvas Area */}
				<div className="flex-1 relative" style={{ backgroundColor: '#f3f5f2' }}>
					<Stage
						width={window.innerWidth - 256}
						height={window.innerHeight - 56}
						scaleX={zoom}
						scaleY={zoom}
						x={panX}
						y={panY}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
						onClick={handleStageClick}
						onWheel={handleWheel}
					>
						<Layer>
							<CanvasContent onRoomContextMenu={handleRoomContextMenu} />
						</Layer>
					</Stage>
				</div>
			</div>

			{/* Room properties dialog */}
			{showRoomDialog && tempRoom && (
				<RoomPropertiesDialog
					room={tempRoom}
					onSave={handleDialogSave}
					onCancel={handleCancelRoom}
					isEditing={isEditing}
				/>
			)}

			{/* Room context menu (right-click) */}
			{contextMenu && (
				<RoomContextMenu
					room={contextMenu.room}
					position={contextMenu.position}
					onClose={() => setContextMenu(null)}
					onSave={handleContextMenuSave}
				/>
			)}


		</div>
	)
}