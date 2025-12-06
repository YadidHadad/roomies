// components/ResizeHandles.jsx
import React from 'react'
import { Circle, Rect } from 'react-konva'

/**
 * ResizeHandles - Renders corner and edge handles for resizing rooms
 * @param {Object} props
 * @param {Array} props.vertices - Array of 4 vertices (rectangular room)
 * @param {boolean} props.visible - Whether to show handles
 * @param {Function} props.onHandleDrag - Callback when handle is dragged
 */
export default function ResizeHandles({ vertices, visible, onHandleDrag }) {
    if (!visible || vertices.length !== 4) return null

    // Define corner handles
    const cornerHandles = vertices.map((vertex, index) => ({
        x: vertex.x,
        y: vertex.y,
        index,
        type: 'corner'
    }))

    // Define edge handles (midpoints)
    const edgeHandles = [
        { x: (vertices[0].x + vertices[1].x) / 2, y: (vertices[0].y + vertices[1].y) / 2, edge: 'top' },
        { x: (vertices[1].x + vertices[2].x) / 2, y: (vertices[1].y + vertices[2].y) / 2, edge: 'right' },
        { x: (vertices[2].x + vertices[3].x) / 2, y: (vertices[2].y + vertices[3].y) / 2, edge: 'bottom' },
        { x: (vertices[3].x + vertices[0].x) / 2, y: (vertices[3].y + vertices[0].y) / 2, edge: 'left' }
    ]

    const handleDragMove = (e, type, key) => {
        console.log('[ResizeHandles] Rendering with vertices:', vertices, 'visible:', visible)
        const stage = e.target.getStage()
        const pointerPos = stage.getPointerPosition()
        console.log(`[ResizeHandles] ${type} handle ${key} drag position:`, pointerPos)
        if (pointerPos && onHandleDrag) {
            console.log(`[ResizeHandles] Calling onHandleDrag with type=${type}, key=${key}`)
            if (type === 'corner') {
                onHandleDrag('corner', key, pointerPos)
            } else if (type === 'edge') {
                onHandleDrag('edge', key, pointerPos)
            }
        } else {
            console.warn(`[ResizeHandles] Missing pointerPos or onHandleDrag callback`)
        }
    }

    return (
        <>
            {/* Corner handles */}
            {cornerHandles.map((handle, index) => (
                <Circle
                    key={`corner-${index}`}
                    x={handle.x}
                    y={handle.y}
                    radius={6}
                    fill="#4A90E2"
                    stroke="#ffffff"
                    strokeWidth={2}
                    draggable
                    onDragMove={(e) => handleDragMove(e, 'corner', index)}
                    onMouseEnter={(e) => {
                        const container = e.target.getStage().container()
                        container.style.cursor = index % 2 === 0 ? 'nwse-resize' : 'nesw-resize'
                    }}
                    onMouseLeave={(e) => {
                        const container = e.target.getStage().container()
                        container.style.cursor = 'default'
                    }}
                />
            ))}

            {/* Edge handles */}
            {edgeHandles.map((handle, index) => (
                <Rect
                    key={`edge-${index}`}
                    x={handle.x - 4}
                    y={handle.y - 4}
                    width={8}
                    height={8}
                    fill="#4A90E2"
                    stroke="#ffffff"
                    strokeWidth={2}
                    draggable
                    onDragMove={(e) => handleDragMove(e, 'edge', handle.edge)}
                    onMouseEnter={(e) => {
                        const container = e.target.getStage().container()
                        const cursors = { top: 'ns-resize', right: 'ew-resize', bottom: 'ns-resize', left: 'ew-resize' }
                        container.style.cursor = cursors[handle.edge]
                    }}
                    onMouseLeave={(e) => {
                        const container = e.target.getStage().container()
                        container.style.cursor = 'default'
                    }}
                />
            ))}
        </>
    )
}