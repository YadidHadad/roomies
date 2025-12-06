'use client'
import React, { useState, useRef, useEffect } from 'react'

/**
 * RoomContextMenu - Context menu for room right-click actions
 * @param {Object} props
 * @param {Object} props.room - Room data
 * @param {Object} props.position - {x, y} cursor position
 * @param {Function} props.onClose - Close callback
 * @param {Function} props.onSave - Save callback with {width, height}
 */
export default function RoomContextMenu({ room, position, onClose, onSave }) {
    const [width, setWidth] = useState(room.dimensions?.width || 0)
    const [height, setHeight] = useState(room.dimensions?.height || 0)
    const menuRef = useRef(null)

    const handleSave = () => {
        const newWidth = parseFloat(width) || room.dimensions?.width || 0
        const newHeight = parseFloat(height) || room.dimensions?.height || 0
        onSave({ width: newWidth, height: newHeight })
    }

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Only close if clicking outside the menu
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose()
            }
        }

        // Use a small delay to avoid closing immediately
        const timer = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside)
        }, 0)

        return () => {
            clearTimeout(timer)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    return (
        <div
            ref={menuRef}
            className="fixed bg-white border border-gray-300 rounded shadow-lg p-4 z-50 w-56"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <h3 className="font-semibold mb-4 text-gray-800">Edit Dimensions</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (px)
                </label>
                <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Width"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (px)
                </label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {room.area && (
                <div className="mb-4 p-2 bg-gray-50 rounded text-sm">
                    <p className="text-gray-600">
                        Current Area: <span className="font-semibold">{room.area.toFixed(2)} m²</span>
                    </p>
                </div>
            )}

            <div className="flex gap-2 justify-end">
                <button
                    onClick={onClose}
                    className="px-3 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
    )
}
