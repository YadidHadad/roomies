// components/ResizeHandles.jsx
import React, { useMemo } from 'react'
import { Circle, Rect } from 'react-konva'

/**
 * ResizeHandles - Renders corner and edge handles for resizing rooms
 * @param {Object} props
 * @param {Array} props.vertices - Array of 4 vertices (rectangular room)
 * @param {boolean} props.visible - Whether to show handles
 * @param {Function} props.onHandleDrag - Callback when handle is dragged
 */
export default function ResizeHandles({ vertices, visible, onHandleDrag }) {
    // Memoize edge handles to avoid recalculating
    const edgeHandles = useMemo(() => [
        { x: (vertices[0].x + vertices[1].x) / 2, y: (vertices[0].y + vertices[1].y) / 2, edge: 'top' },
        { x: (vertices[1].x + vertices[2].x) / 2, y: (vertices[1].y + vertices[2].y) / 2, edge: 'right' },
        { x: (vertices[2].x + vertices[3].x) / 2, y: (vertices[2].y + vertices[3].y) / 2, edge: 'bottom' },
        { x: (vertices[3].x + vertices[0].x) / 2, y: (vertices[3].y + vertices[0].y) / 2, edge: 'left' }
    ], [vertices])

    if (!visible || vertices.length !== 4) return null

    // Define corner handles
    const cornerHandles = vertices.map((vertex, index) => ({
        x: vertex.x,
        y: vertex.y,
        index,
        type: 'corner'
    }))

    const handleDragStart = (e) => {
        e.cancelBubble = true
    }

    const handleDragMove = (e, type, key) => {
        e.cancelBubble = true // Stop event propagation to parent

        const stage = e.target.getStage()
        const layer = e.target.getLayer()

        // Convert stage pointer position to layer/world coordinates
        let worldPos = layer.getRelativePointerPosition()
        console.log(`[ResizeHandles] ${type} ${key} drag - raw worldPos:`, worldPos)

        // For edge handles, constrain movement to only perpendicular to the edge
        if (type === 'edge') {
            // Calculate which vertices define this edge and get their current values
            let constraintX, constraintY

            if (key === 'top') {
                // Top edge: vertices 0 and 1, constrain to keep x average, allow y change
                constraintX = (vertices[0].x + vertices[1].x) / 2
                worldPos = { x: constraintX, y: worldPos.y }
                console.log(`[ResizeHandles] top edge - constraint x=${constraintX}, new pos:`, worldPos)
            } else if (key === 'right') {
                // Right edge: vertices 1 and 2, constrain to keep y average, allow x change
                constraintY = (vertices[1].y + vertices[2].y) / 2
                worldPos = { x: worldPos.x, y: constraintY }
                console.log(`[ResizeHandles] right edge - constraint y=${constraintY}, new pos:`, worldPos)
            } else if (key === 'bottom') {
                // Bottom edge: vertices 2 and 3, constrain to keep x average, allow y change
                constraintX = (vertices[2].x + vertices[3].x) / 2
                worldPos = { x: constraintX, y: worldPos.y }
                console.log(`[ResizeHandles] bottom edge - constraint x=${constraintX}, new pos:`, worldPos)
            } else if (key === 'left') {
                // Left edge: vertices 3 and 0, constrain to keep y average, allow x change
                constraintY = (vertices[3].y + vertices[0].y) / 2
                worldPos = { x: worldPos.x, y: constraintY }
                console.log(`[ResizeHandles] left edge - constraint y=${constraintY}, new pos:`, worldPos)
            }
        }

        if (worldPos && onHandleDrag) {
            console.log(`[ResizeHandles] Calling onHandleDrag with type=${type}, key=${key}, pos=`, worldPos)
            if (type === 'corner') {
                onHandleDrag('corner', key, worldPos)
            } else if (type === 'edge') {
                onHandleDrag('edge', key, worldPos)
            }
        } else {
            console.warn(`[ResizeHandles] Missing worldPos or onHandleDrag callback`)
        }
    }

    const handleDragEnd = (e) => {
        e.cancelBubble = true // Stop event propagation to parent
    }

    const handleDragBound = (pos) => {
        // Prevent the shape from actually moving
        return { x: 0, y: 0 }
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
                    dragBoundFunc={handleDragBound}
                    onDragStart={(e) => handleDragStart(e)}
                    onDragMove={(e) => handleDragMove(e, 'corner', index)}
                    onDragEnd={handleDragEnd}
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
                    dragBoundFunc={handleDragBound}
                    onDragStart={(e) => handleDragStart(e)}
                    onDragMove={(e) => handleDragMove(e, 'edge', handle.edge)}
                    onDragEnd={handleDragEnd}
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