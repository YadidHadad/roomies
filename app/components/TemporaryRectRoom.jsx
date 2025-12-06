// components/TemporaryRectRoom.jsx
import React from 'react'
import { Rect } from 'react-konva'

/**
 * TemporaryRectRoom - Shows visual feedback while drawing a rectangular room
 * @param {Object} props
 * @param {Object} props.startPos - Starting position {x, y}
 * @param {Object} props.currentPos - Current mouse position {x, y}
 */
export default function TemporaryRectRoom({ startPos, currentPos }) {
    if (!startPos || !currentPos) return null

    const x = Math.min(startPos.x, currentPos.x)
    const y = Math.min(startPos.y, currentPos.y)
    const width = Math.abs(currentPos.x - startPos.x)
    const height = Math.abs(currentPos.y - startPos.y)

    return (
        <>
            {/* Semi-transparent fill */}
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#4A90E2"
                opacity={0.2}
            />

            {/* Dashed border */}
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                stroke="#4A90E2"
                strokeWidth={2}
                dash={[5, 5]}
            />
        </>
    )
}