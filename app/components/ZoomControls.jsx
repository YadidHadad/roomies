'use client'
import { useDispatch, useSelector } from 'react-redux'
import { updateZoomAndPan, resetView } from '../../store/viewSlice'

/**
 * ZoomControls - Floating zoom and pan controls
 * @param {Object} props
 * @param {Function} props.onResetView - Optional callback for reset (uses Redux by default)
 */
export default function ZoomControls() {
    const dispatch = useDispatch()
    const { zoom, panX, panY } = useSelector(state => state.view)

    const handleZoomIn = () => {
        const newZoom = Math.min(5, zoom * 1.2)
        dispatch(updateZoomAndPan({ zoom: newZoom, panX, panY }))
    }

    const handleZoomOut = () => {
        const newZoom = Math.max(0.1, zoom / 1.2)
        dispatch(updateZoomAndPan({ zoom: newZoom, panX, panY }))
    }

    const handleReset = () => {
        dispatch(resetView())
    }

    return (
        <div className="flex gap-1 items-center text-white">
            <button button
                onClick={handleZoomIn}
                className="flex items-center justify-center px-2 py-1 rounded border border-transparent  hover:text-gray-800 transition-all cursor-pointer"
                title="Zoom In (scroll up)"
            >
                <span className="text-sm font-light">+</span>
            </button >
            <button
                onClick={handleZoomOut}
                className="flex items-center justify-center px-2 py-1 rounded border border-transparent  hover:text-gray-800 transition-all cursor-pointer"
                title="Zoom Out (scroll down)"
            >
                <span className="text-sm font-light">−</span>
            </button>
            <span className=" px-2 py-1 text-xs font-light">
                {(zoom * 100).toFixed(0)}%
            </span>
            <button
                onClick={handleReset}
                className="flex items-center justify-center px-2 py-1 rounded border border-transparent  hover:text-gray-800 transition-all cursor-pointer"
                title="Reset View"
            >
                <span className="text-sm font-light">↺</span>
            </button>
        </div >
    )
}
