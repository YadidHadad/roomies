// components/Wall.jsx
import { Group, Rect, Line } from 'react-konva'

/**
 * Wall Component - Renders a wall with thickness and layers
 * @param {Object} props
 * @param {Object} props.wall - Wall data object
 * @param {boolean} props.isSelected - Whether the wall is selected
 * @param {Function} props.onSelect - Selection callback
 */
export default function Wall({ wall, isSelected, onSelect }) {
    // Calculate wall angle and perpendicular angle
    const dx = wall.end.x - wall.start.x
    const dy = wall.end.y - wall.start.y
    const wallLength = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)
    const perpAngle = angle + Math.PI / 2

    // Wall settings with defaults
    const thickness = wall.thickness || 10
    const layers = wall.layers || [
        { name: 'interior', thickness: 0.15, color: '#7A7A7A' }, // 15% interior finish - dark gray
        { name: 'structure', thickness: 0.70, color: '#4D4D4D' }, // 70% main structure - darker gray
        { name: 'exterior', thickness: 0.15, color: '#2F2F2F' },  // 15% exterior finish - very dark gray
    ]

    // Calculate total thickness and layer positions
    let currentOffset = 0
    const layerRects = layers.map(layer => {
        const layerThickness = thickness * layer.thickness
        const rect = {
            ...layer,
            offset: currentOffset,
            actualThickness: layerThickness,
        }
        currentOffset += layerThickness
        return rect
    })

    // Render individual layer
    const renderLayer = (layer, index) => {
        // Calculate the four corners of the rectangle
        const offsetX = Math.cos(perpAngle) * layer.offset
        const offsetY = Math.sin(perpAngle) * layer.offset

        return (
            <Rect
                key={`layer-${index}`}
                x={wall.start.x + offsetX}
                y={wall.start.y + offsetY}
                width={wallLength}
                height={layer.actualThickness}
                fill={layer.color}
                rotation={(angle * 180) / Math.PI}
                strokeWidth={0}
                listening={index === 0} // Only interior layer is clickable
                onClick={() => onSelect && onSelect(wall.id)}
                onTap={() => onSelect && onSelect(wall.id)}
            />
        )
    }

    return (
        <Group>
            {/* Render all layers */}
            {layerRects.map((layer, index) => renderLayer(layer, index))}

            {/* Selection indicator */}
            {isSelected && (
                <>
                    {/* Outline around entire wall */}
                    <Rect
                        x={wall.start.x}
                        y={wall.start.y}
                        width={wallLength}
                        height={thickness}
                        rotation={(angle * 180) / Math.PI}
                        stroke="#4A90E2"
                        strokeWidth={2}
                        dash={[5, 5]}
                        listening={false}
                    />

                    {/* Start point handle */}
                    <Rect
                        x={wall.start.x - 4}
                        y={wall.start.y - 4}
                        width={8}
                        height={8}
                        fill="#4A90E2"
                        stroke="#ffffff"
                        strokeWidth={2}
                    />

                    {/* End point handle */}
                    <Rect
                        x={wall.end.x - 4}
                        y={wall.end.y - 4}
                        width={8}
                        height={8}
                        fill="#4A90E2"
                        stroke="#ffffff"
                        strokeWidth={2}
                    />
                </>
            )}

            {/* Interior reference line (for debugging/editing) */}
            {isSelected && (
                <Line
                    points={[wall.start.x, wall.start.y, wall.end.x, wall.end.y]}
                    stroke="#FF6B6B"
                    strokeWidth={1}
                    dash={[2, 2]}
                    listening={false}
                />
            )}
        </Group>
    )
}