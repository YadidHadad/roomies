'use client'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setWallThickness,
    updateWallLayer,
    addWallLayer,
    removeWallLayer
} from '../../store/wallSlice'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function WallSettingsPanel() {
    const dispatch = useDispatch()
    const { wallSettings } = useSelector(state => state.wall)
    const [isExpanded, setIsExpanded] = useState(false)

    const handleThicknessChange = (e) => {
        dispatch(setWallThickness(Number(e.target.value)))
    }

    const handleLayerChange = (index, field, value) => {
        const layer = { [field]: field === 'thickness' ? Number(value) : value }
        dispatch(updateWallLayer({ index, layer }))
    }

    const handleAddLayer = () => {
        dispatch(addWallLayer({
            name: 'New Layer',
            thickness: 0.1,
            color: '#DDDDDD',
        }))
    }

    const handleRemoveLayer = (index) => {
        if (wallSettings.layers.length > 1) {
            dispatch(removeWallLayer(index))
        }
    }

    // Normalize layer thicknesses to add up to 1.0
    const normalizeThicknesses = () => {
        const total = wallSettings.layers.reduce((sum, layer) => sum + layer.thickness, 0)
        wallSettings.layers.forEach((layer, index) => {
            handleLayerChange(index, 'thickness', layer.thickness / total)
        })
    }

    return (
        <div className="absolute top-5 right-5 z-10 bg-white p-4 rounded-lg shadow-lg w-80">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="font-bold text-lg">Wall Settings</h3>
                <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
            </div>

            {isExpanded && (
                <div className="mt-4">
                    {/* Total Thickness */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Thickness (cm)
                        </label>
                        <input
                            type="number"
                            value={wallSettings.thickness}
                            onChange={handleThicknessChange}
                            min="5"
                            max="100"
                            step="5"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Layers */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Wall Layers
                            </label>
                            <button
                                onClick={handleAddLayer}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                            >
                                <FiPlus size={12} />
                                Add Layer
                            </button>
                        </div>

                        <div className="space-y-3">
                            {wallSettings.layers.map((layer, index) => (
                                <div key={index} className="border border-gray-200 rounded p-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <input
                                            type="text"
                                            value={layer.name}
                                            onChange={(e) => handleLayerChange(index, 'name', e.target.value)}
                                            className="flex-1 p-1 border border-gray-300 rounded text-sm mr-2"
                                            placeholder="Layer name"
                                        />
                                        {wallSettings.layers.length > 1 && (
                                            <button
                                                onClick={() => handleRemoveLayer(index)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <FiTrash2 size={14} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Ratio (0-1)
                                            </label>
                                            <input
                                                type="number"
                                                value={layer.thickness}
                                                onChange={(e) => handleLayerChange(index, 'thickness', e.target.value)}
                                                min="0.05"
                                                max="1"
                                                step="0.05"
                                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Color
                                            </label>
                                            <input
                                                type="color"
                                                value={layer.color}
                                                onChange={(e) => handleLayerChange(index, 'color', e.target.value)}
                                                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <div className="text-xs text-gray-600">
                                            Actual: {(wallSettings.thickness * layer.thickness).toFixed(1)} cm
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={normalizeThicknesses}
                            className="w-full mt-3 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                        >
                            Normalize Ratios
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preview
                        </label>
                        <div className="border border-gray-300 rounded p-4">
                            <div className="flex flex-col" style={{ width: '100%' }}>
                                {wallSettings.layers.map((layer, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            height: `${layer.thickness * 60}px`,
                                            backgroundColor: layer.color,
                                            borderBottom: index < wallSettings.layers.length - 1 ? '1px solid #999' : 'none'
                                        }}
                                        className="flex items-center justify-center"
                                    >
                                        <span className="text-xs text-gray-700">{layer.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center text-xs text-gray-600 mt-2">
                                Total: {wallSettings.thickness} cm
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}