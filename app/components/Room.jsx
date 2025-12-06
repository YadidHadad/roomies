// components/Room.jsx
import { Group } from 'react-konva'
import RoomPolygon from './RoomPolygon'
import Wall from './Wall'
import RoomLabel from './RoomLabel'
import ResizeHandles from './ResizeHandles'

/**
 * Room Component - Main room container
 * @param {Object} props
 * @param {Object} props.room - Room data object
 * @param {boolean} props.isSelected - Whether the room is selected
 * @param {Function} props.onSelect - Callback when room is clicked
 * @param {Function} props.onDragEnd - Callback when room is dragged
 * @param {Function} props.onResize - Callback when room is resized
 * @param {boolean} props.draggable - Whether the room can be dragged
 */
export default function Room({
    room,
    isSelected = false,
    onSelect,
    onDragEnd,
    onResize,
    onDoubleClick,
    onContextMenu,
    draggable = false
}) {
    // Calculate centroid for label placement
    const calculateCentroid = (vertices) => {
        const x = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length
        const y = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length
        return { x, y }
    }

    const labelPosition = room.labelPosition || calculateCentroid(room.vertices)

    return (
        <Group
            draggable={draggable && !isSelected}
            zIndex={room.zIndex || 0}
            onDragEnd={(e) => {
                // Only call onDragEnd if Group is actually draggable (not selected)
                if (draggable && !isSelected && onDragEnd) {
                    console.log('[Room] Group drag ended')
                    onDragEnd(e, room)
                }
            }}
        >
            {/* Room floor polygon */}
            <RoomPolygon
                vertices={room.vertices}
                style={room.style}
                isSelected={isSelected}
                onClick={() => onSelect && onSelect(room.id)}
                onDoubleClick={() => onDoubleClick && onDoubleClick(room)}
                onContextMenu={(e) => {
                    e.evt.preventDefault() // Prevent browser menu
                    onContextMenu && onContextMenu(room, e)
                }} />

            {/* Walls with doors and windows */}
            {/* {room.walls?.map((wall, index) => (
                <Wall
                    key={wall.id || `wall-${index}`}
                    wall={wall}
                    strokeColor={room.style?.strokeColor}
                />
            ))} */}

            {/* Room label */}
            <RoomLabel
                name={room.name}
                area={room.area}
                width={room.dimensions?.width}
                height={room.dimensions?.height}
                position={labelPosition}
            />

            {/* Resize handles */}
            <ResizeHandles
                vertices={room.vertices}
                visible={isSelected}
                onHandleDrag={onResize}
            />
        </Group>
    )
}