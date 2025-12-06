// components/TemporaryRoom.jsx
import React from 'react'
import { Line, Circle } from 'react-konva'

/**
 * TemporaryRoom - Shows visual feedback while drawing a room
 * @param {Object} props
 * @param {Array} props.vertices - Current vertices being drawn
 * @param {Object} props.mousePosition - Current mouse position {x, y}
 */
export default function TemporaryRoom({ vertices, mousePosition }) {
    if (vertices.length === 0) return null

    // Create points array for the polygon (including current mouse position)
    const points = []
    vertices.forEach(v => {
        points.push(v.x, v.y)
    })

    // Add current mouse position if we have at least one vertex
    if (mousePosition && vertices.length > 0) {
        points.push(mousePosition.x, mousePosition.y)
    }

    return (
        <>
            {/* Draw lines connecting vertices */}
            {vertices.length > 0 && (
                <>
                    {/* Completed lines */}
                    <Line
                        points={vertices.flatMap(v => [v.x, v.y])}
                        stroke="#4A90E2"
                        strokeWidth={2}
                        dash={[5, 5]}
                        lineCap="round"
                        lineJoin="round"
                    />

                    {/* Line to mouse cursor */}
                    {mousePosition && (
                        <Line
                            points={[
                                vertices[vertices.length - 1].x,
                                vertices[vertices.length - 1].y,
                                mousePosition.x,
                                mousePosition.y
                            ]}
                            stroke="#4A90E2"
                            strokeWidth={2}
                            dash={[5, 5]}
                            opacity={0.5}
                        />
                    )}

                    {/* Closing line preview (from last vertex to first) */}
                    {vertices.length >= 2 && (
                        <Line
                            points={[
                                vertices[vertices.length - 1].x,
                                vertices[vertices.length - 1].y,
                                vertices[0].x,
                                vertices[0].y
                            ]}
                            stroke="#FF6B6B"
                            strokeWidth={1}
                            dash={[3, 3]}
                            opacity={0.3}
                        />
                    )}
                </>
            )}

            {/* Draw vertex circles */}
            {vertices.map((vertex, index) => (
                <Circle
                    key={`temp-vertex-${index}`}
                    x={vertex.x}
                    y={vertex.y}
                    radius={6}
                    fill={index === 0 ? '#FF6B6B' : '#4A90E2'}
                    stroke="#ffffff"
                    strokeWidth={2}
                />
            ))}

            {/* Highlight first vertex when we can close */}
            {vertices.length >= 3 && (
                <Circle
                    x={vertices[0].x}
                    y={vertices[0].y}
                    radius={10}
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    opacity={0.5}
                />
            )}
        </>
    )
}