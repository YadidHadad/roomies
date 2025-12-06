// components/floorplan/RoomLabel.jsx
import { Text } from 'react-konva';

/**
 * RoomLabel - Renders room name and area labels
 * @param {Object} props
 * @param {string} props.name - Room name
 * @param {number} props.area - Room area in square pixels
 * @param {Object} props.position - Label position {x, y}
 */
export default function RoomLabel({ width, height, name, area, position }) {
    // Convert from square pixels to square centimeters (1px = 1cm)
    const areaCm2 = area // area in cm² since 1px = 1cm
    const areaM2 = areaCm2 / 10000 // convert cm² to m²
    const text = `${(width.toFixed(2) / 100).toFixed(2)} x ${(height.toFixed(2) / 100).toFixed(2)}\n${areaM2.toFixed(2)} m²`

    return (
        <>
            {/* Room name */}
            <Text
                x={position.x}
                y={position.y}
                text={name}
                fontSize={16}
                fontFamily="Arial"
                fill="#333333"
                align="center"
                verticalAlign="middle"
                offsetX={name.length * 4} // Rough center alignment
                offsetY={8}
            />

            {/* Area label in m² */}
            {area && (
                <Text
                    x={position.x}
                    y={position.y + 20}
                    fontSize={12}
                    text={text}
                    fontFamily="Arial"
                    fill="#666666"
                    align="center"
                    offsetX={30}
                />
            )}
        </>
    );
}