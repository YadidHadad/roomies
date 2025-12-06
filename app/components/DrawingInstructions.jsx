// components/DrawingInstructions.jsx
import React from 'react'

/**
 * DrawingInstructions - Shows instructions while drawing
 * @param {Object} props
 * @param {string} props.tool - Current tool
 * @param {number} props.vertexCount - Number of vertices placed
 */
export default function DrawingInstructions({ tool, vertexCount }) {
    if (tool !== 'room') return null

    return (
        <div className="absolute top-5 right-5 z-10 bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-lg mb-2">Drawing Room</h3>
            {vertexCount === 0 && (
                <p className="text-sm text-gray-600">
                    Click on the canvas to place the first corner of your room.
                </p>
            )}
            {vertexCount > 0 && vertexCount < 3 && (
                <p className="text-sm text-gray-600">
                    Keep clicking to add more corners. You need at least 3 corners to create a room.
                </p>
            )}
            {vertexCount >= 3 && (
                <div className="text-sm text-gray-600">
                    <p className="mb-2">
                        <strong>Double-click</strong> or press <kbd className="px-2 py-1 bg-gray-100 rounded border">Enter</kbd> to finish.
                    </p>
                    <p className="mb-2">
                        Press <kbd className="px-2 py-1 bg-gray-100 rounded border">Esc</kbd> to cancel.
                    </p>
                    <p className="text-xs text-blue-600">
                        Click near the first point (red circle) to close the room automatically.
                    </p>
                </div>
            )}
            <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">
                    Vertices placed: <strong>{vertexCount}</strong>
                </p>
            </div>
        </div>
    )
}