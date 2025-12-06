// components/canvas/TemporaryWallLayer.jsx
import { useSelector } from 'react-redux'
import { Group, Rect, Line } from 'react-konva'

export default function TemporaryWallLayer() {
    const { isDrawingWall, wallStartPos, wallEndPos, wallSettings } = useSelector(state => state.wall)

    if (!isDrawingWall || !wallStartPos || !wallEndPos) return null

    const dx = wallEndPos.x - wallStartPos.x
    const dy = wallEndPos.y - wallStartPos.y
    const wallLength = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)
    const perpAngle = angle + Math.PI / 2

    const thickness = wallSettings.thickness
    const layers = wallSettings.layers

    // Calculate layer positions
    const layerRects = layers.reduce((acc, layer) => {
        const layerThickness = thickness * layer.thickness
        const currentOffset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].actualThickness : 0
        const rect = {
            ...layer,
            offset: currentOffset,
            actualThickness: layerThickness,
        }
        return [...acc, rect]
    }, [])

    return (
        <Group>
            {/* Render temporary layers */}
            {layerRects.map((layer, index) => {
                const offsetX = Math.cos(perpAngle) * layer.offset
                const offsetY = Math.sin(perpAngle) * layer.offset

                return (
                    <Rect
                        key={`temp-layer-${index}`}
                        x={wallStartPos.x + offsetX}
                        y={wallStartPos.y + offsetY}
                        width={wallLength}
                        height={layer.actualThickness}
                        fill={layer.color}
                        opacity={0.7}
                        rotation={(angle * 180) / Math.PI}
                        listening={false}
                    />
                )
            })}

            {/* Interior reference line */}
            <Line
                points={[wallStartPos.x, wallStartPos.y, wallEndPos.x, wallEndPos.y]}
                stroke="#4A90E2"
                strokeWidth={2}
                dash={[5, 5]}
                listening={false}
            />
        </Group>
    )
}