'use client'
import React, { useState } from 'react'

/**
 * RoomPropertiesDialog - Modal for setting room properties
 * @param {Object} props
 * @param {Object} props.room - Temporary room data
 * @param {Function} props.onSave - Save callback
 * @param {Function} props.onCancel - Cancel callback
 * @param {boolean} props.isEditing - Whether editing existing room
 */
export default function RoomPropertiesDialog({ room, onSave, onCancel, isEditing = false }) {
    const [name, setName] = useState(room.name || '')
    const [type, setType] = useState(room.type || 'other')
    const [width, setWidth] = useState(room.dimensions?.width || 0)
    const [height, setHeight] = useState(room.dimensions?.height || 0)

    const roomTypes = [
        { value: 'bedroom', label: 'Bedroom' },
        { value: 'bathroom', label: 'Bathroom' },
        { value: 'kitchen', label: 'Kitchen' },
        { value: 'living', label: 'Living Room' },
        { value: 'dining', label: 'Dining Room' },
        { value: 'hallway', label: 'Hallway' },
        { value: 'office', label: 'Office' },
        { value: 'other', label: 'Other' },
    ]

    const handleSave = () => {
        if (!name.trim()) {
            alert('Please enter a room name')
            return
        }
        onSave({
            ...room,
            name: name.trim(),
            type,
            dimensions: {
                width: parseFloat(width) || room.dimensions?.width || 0,
                height: parseFloat(height) || room.dimensions?.height || 0,
            }
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Room' : 'Room Properties'}</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Master Bedroom"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {roomTypes.map(rt => (
                            <option key={rt.value} value={rt.value}>
                                {rt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
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
                    <div>
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
                </div>

                {room.area && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">
                            Area: <span className="font-semibold">{room.area.toFixed(2)} m²</span>
                        </p>
                    </div>
                )}

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        {isEditing ? 'Save Changes' : 'Create Room'}
                    </button>
                </div>
            </div>
        </div>
    )
}