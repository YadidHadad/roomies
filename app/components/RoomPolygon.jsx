import { Line } from 'react-konva';

/**
 * RoomPolygon - Renders the floor polygon of a room
 * @param {Object} props
 * @param {Array} props.vertices - Array of {x, y} points
 * @param {Object} props.style - Style object with fillColor, strokeColor, opacity
 * @param {boolean} props.isSelected - Whether the room is selected
 * @param {Function} props.onClick - Click handler
 * @param {Function} props.onDoubleClick - Double click handler
 * @param {Function} props.onContextMenu - Right-click handler
 */
export default function RoomPolygon({ vertices, style, isSelected, onClick, onDoubleClick, onContextMenu }) {
    const defaultStyle = {
        fillColor: '#f0f0f0',
        strokeColor: '#1a1a1a',
        opacity: 0.7,
        ...style
    };

    // Convert vertices to flat array for Konva
    const points = vertices.flatMap(v => [v.x, v.y]);

    return (
        <>
            {/* Room floor */}
            <Line
                points={points}
                fill={defaultStyle.fillColor}
                opacity={defaultStyle.opacity}
                stroke={defaultStyle.strokeColor}
                strokeWidth={2}
                closed
                listening={true}
                onClick={onClick}
                onTap={onClick}
                onDblClick={onDoubleClick}
                onContextMenu={onContextMenu}
            />

            {/* Selection indicator */}
            {isSelected && (
                <Line
                    points={points}
                    stroke="#4A90E2"
                    strokeWidth={3}
                    closed
                    dash={[10, 5]}
                />
            )}
        </>
    );
}