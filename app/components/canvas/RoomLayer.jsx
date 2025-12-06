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

    const handleRoomDoubleClick = (room) => {
        console.log('[RoomLayer] Room double-clicked:', room)
        dispatch(showRoomPropertiesDialog(room))
    }

    const handleRoomContextMenu = (room) => {
        console.log('[RoomLayer] Room right-clicked:', room)
        onRoomContextMenu && onRoomContextMenu(room)
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
                    onResize={handleRoomResize}
                    onDoubleClick={handleRoomDoubleClick}
                    onContextMenu={handleRoomContextMenu}
                    draggable={tool === 'select'}
                />
            ))}
        </>
    )
}