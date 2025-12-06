import { useSelector } from 'react-redux'
import { Group, Line, Text } from 'react-konva'

export default function Grid() {
    const { showGrid, gridSize } = useSelector(state => state.ui)

    if (!showGrid) return null

    const width = window.innerWidth
    const height = window.innerHeight

    // Create vertical lines
    const verticalLines = []
    // for (let x = 0; x < width; x += gridSize) {
    // verticalLines.push(
    //     <Line
    //         key={`v-${x}`}
    //         points={[x, 0, x, height]}
    //         stroke="#d0d0d0"
    //         strokeWidth={0.5}
    //         listening={false}
    //     />
    // )
    // }

    // // Create horizontal lines
    const horizontalLines = []
    // for (let y = 0; y < height; y += gridSize) {
    //     horizontalLines.push(
    //         <Line
    //             key={`h-${y}`}
    //             points={[0, y, width, y]}
    //             stroke="#d0d0d0"
    //             strokeWidth={0.5}
    //             listening={false}
    //         />
    //     )
    // }

    // Add scale reference (50px = 50cm, so 1px = 1cm)
    const scaleLabel = (
        <Text
            key="scale-label"
            x={10}
            y={10}
            text="50px = 50cm (1px = 1cm)"
            fontSize={12}
            fill="#666666"
            listening={false}
        />
    )

    return (
        <Group zIndex={0} listening={false}>
            {verticalLines}
            {horizontalLines}
            {scaleLabel}
        </Group>
    )
}
