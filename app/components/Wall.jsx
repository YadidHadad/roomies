// components/Wall.jsx
import { Group, Rect, Line } from 'react-konva'
import { useDispatch } from 'react-redux'
import PointHandle from './PointHandle'
import { updateWall } from '@/store/wallSlice'

/**
 * Wall Component - Renders a wall with thickness and layers
 * @param {Object} props
 * @param {Object} props.wall - Wall data object
 * @param {boolean} props.isSelected - Whether the wall is selected
 * @param {Function} props.onSelect - Selection callback
 */
export default function Wall({ wall, isSelected, onSelect }) {
    const dispatch = useDispatch()

    const handleStartPointChange = (newPosition) => {
        dispatch(updateWall({
            ...wall,
            start: newPosition
        }))
    }

    const handleEndPointChange = (newPosition) => {
        dispatch(updateWall({
            ...wall,
            end: newPosition
        }))
    }


    // Calculate wall angle and perpendicular angle
    const dx = wall.end.x - wall.start.x
    const dy = wall.end.y - wall.start.y
    const wallLength = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)
    const perpAngle = angle + Math.PI / 2

    // Wall settings with defaults
    const thickness = wall.thickness || 10
    const layers = wall.layers || [
        { name: 'interior', thickness: 4, color: '#7A7A7A' }, // 15% interior finish - dark gray
        // { name: 'structure', thickness: 0.70, color: '#4D4D4D' }, // 70% main structure - darker gray
        // { name: 'exterior', thickness: 0.15, color: '#2F2F2F' },  // 15% exterior finish - very dark gray
    ]

    // Calculate total thickness and layer positions
    const layerRects = layers.reduce((acc, layer, index) => {
        const layerThickness = thickness * layer.thickness
        const currentOffset = acc.reduce((sum, l) => sum + l.actualThickness, 0)
        acc.push({
            ...layer,
            offset: currentOffset,
            actualThickness: layerThickness,
        })
        return acc
    }, [])

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


                    {/* Start point handle */}
                    <PointHandle
                        point={wall.start}
                        onPointChange={handleStartPointChange}
                    />

                    {/* End point handle */}
                    <PointHandle
                        point={wall.end}
                        onPointChange={handleEndPointChange}
                    />



                </>
            )}

            {/* Interior reference line (for debugging/editing) */}
            {isSelected && (
                <Line
                    points={[wall.start.x, wall.start.y, wall.end.x, wall.end.y]}
                    stroke="#4A90E2"
                    strokeWidth={1}
                    // dash={[2, 2]}
                    listening={false}
                />
            )}
        </Group>
    )
}