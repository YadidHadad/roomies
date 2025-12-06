// components/canvas/RoomLayer.jsx
import { useSelector, useDispatch } from 'react-redux'
import Room from '../Room'
import useRoomInteractions from '../../../hooks/useRoomInteractions'
import { showRoomPropertiesDialog } from '../../../store/roomSlice'

export default function RoomLayer({ onRoomContextMenu }) {
    const { rooms } = useSelector(state => state.room)
    const { tool, selectedId, selectedType } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const { handleRoomSelect, handleRoomDragEnd, handleRoomResize } = useRoomInteractions()

    const handleRoomResize_wrapper = (type, index, newPos) => {
        console.log('[RoomLayer] handleRoomResize_wrapper called:', { type, index, newPos: { x: newPos?.x, y: newPos?.y } })
        handleRoomResize(type, index, newPos)
    }

    const handleRoomDoubleClick = (room) => {
        dispatch(showRoomPropertiesDialog(room))
    }

    const handleRoomContextMenu = (room, event) => {
        onRoomContextMenu && onRoomContextMenu(room, event)
    }

    return (
        <>
            {rooms.map(room => (
                <Room
                    key={room.id}
                    room={room}
                    isSelected={selectedId === room.id && selectedType === 'room'}
                    onSelect={handleRoomSelect}
                    onDragEnd={handleRoomDragEnd}
                    onResize={handleRoomResize_wrapper}
                    onDoubleClick={handleRoomDoubleClick}
                    onContextMenu={handleRoomContextMenu}
                    draggable={tool === 'select'}
                />
            ))}
        </>
    )
}