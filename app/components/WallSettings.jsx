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

export default function WallSettings() {
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

    const normalizeThicknesses = () => {
        const total = wallSettings.layers.reduce((sum, layer) => sum + layer.thickness, 0)
        wallSettings.layers.forEach((layer, index) => {
            handleLayerChange(index, 'thickness', layer.thickness / total)
        })
    }

    return (
        <div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-xs font-semibold text-gray-600 uppercase mb-3 py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between transition-colors"
            >
                Wall Settings
                <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {isExpanded && (
                <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-3">
                    {/* Total Thickness */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Total Thickness (cm)
                        </label>
                        <input
                            type="number"
                            value={wallSettings.thickness}
                            onChange={handleThicknessChange}
                            min="5"
                            max="100"
                            step="5"
                            className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Layers */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-medium text-gray-700">
                                Layers
                            </label>
                            <button
                                onClick={handleAddLayer}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                            >
                                <FiPlus size={10} />
                                Add
                            </button>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {wallSettings.layers.map((layer, index) => (
                                <div key={index} className="border border-gray-300 rounded p-2 bg-white">
                                    <div className="flex justify-between items-center mb-1">
                                        <input
                                            type="text"
                                            value={layer.name}
                                            onChange={(e) => handleLayerChange(index, 'name', e.target.value)}
                                            className="flex-1 p-1 border border-gray-300 rounded text-xs mr-1"
                                            placeholder="Layer name"
                                        />
                                        {wallSettings.layers.length > 1 && (
                                            <button
                                                onClick={() => handleRemoveLayer(index)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <FiTrash2 size={12} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-1">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-0.5">
                                                Ratio
                                            </label>
                                            <input
                                                type="number"
                                                value={layer.thickness}
                                                onChange={(e) => handleLayerChange(index, 'thickness', e.target.value)}
                                                min="0.05"
                                                max="1"
                                                step="0.05"
                                                className="w-full p-1 border border-gray-300 rounded text-xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs text-gray-600 mb-0.5">
                                                Color
                                            </label>
                                            <input
                                                type="color"
                                                value={layer.color}
                                                onChange={(e) => handleLayerChange(index, 'color', e.target.value)}
                                                className="w-full h-6 border border-gray-300 rounded cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-1">
                                        <div className="text-xs text-gray-600">
                                            {(wallSettings.thickness * layer.thickness).toFixed(1)} cm
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={normalizeThicknesses}
                            className="w-full mt-2 px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                        >
                            Normalize
                        </button>
                    </div>

                    {/* Preview */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Preview
                        </label>
                        <div className="border border-gray-300 rounded p-2 bg-white">
                            <div className="flex flex-col" style={{ width: '100%', height: '60px' }}>
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
                            <div className="text-center text-xs text-gray-600 mt-1">
                                {wallSettings.thickness} cm
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
