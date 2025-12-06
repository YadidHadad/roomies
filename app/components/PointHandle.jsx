import React, { useState } from 'react'
import { Rect } from 'react-konva'

const PointHandle = ({ point, onPointChange }) => {
    const [position, setPosition] = useState({ x: point.x, y: point.y })

    const handleDragMove = (e) => {
        const newPosition = {
            x: e.target.x() + 4,
            y: e.target.y() + 4
        }

        // Prevent Konva from auto-positioning the dragged element
        e.target.to({ x: 0, y: 0, duration: 0 })

        setPosition(newPosition)
        if (onPointChange) {
            onPointChange(newPosition)
        }
    }

    const handleDragEnd = (e) => {
        // Reset position after drag ends
        e.target.to({ x: 0, y: 0, duration: 0 })
    }

    return (
        <>
            <Rect
                x={position.x - 4}
                y={position.y - 4}
                width={8}
                height={8}
                fill="#4A90E2"
                // stroke="#ffffff"
                strokeWidth={2}
                onClick={(e) => {
                }}
                draggable
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            />

        </>
    )
}

export default PointHandle
