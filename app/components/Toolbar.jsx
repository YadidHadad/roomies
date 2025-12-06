'use client'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadMenuModal from './LoadMenuModal'
import ToolButton from './ToolButton'
import ActionButton from './ActionButton'
import WallSettings from './WallSettings'
import { setTool, toggleShowGrid } from '../../store/uiSlice'
import { deleteSelected, clearAll, loadFloorPlan } from '../../store/floorPlanActions'
import {
	FiMousePointer,
	FiSquare,
	FiCircle,
	FiTrash2,
	FiRefreshCw,
	FiDownload,
	FiSave,
	FiGrid
} from 'react-icons/fi'
import {
	BsDoorOpen,
	BsWindow
} from 'react-icons/bs'
import {
	MdOutlineRectangle
} from 'react-icons/md'

function Toolbar() {
	const dispatch = useDispatch()

	// Get state from different slices
	const { tool, selectedId, showGrid } = useSelector(state => state.ui)
	const { rooms } = useSelector(state => state.room)
	const { walls, wallSettings } = useSelector(state => state.wall)
	const { doors } = useSelector(state => state.door)
	const { windows } = useSelector(state => state.window)

	const [savedFloorPlans, setSavedFloorPlans] = useState([])
	const [showLoadMenu, setShowLoadMenu] = useState(false)

	// Delete selected object
	const handleDelete = () => {
		if (!selectedId) return
		dispatch(deleteSelected())
	}

	// Save floor plan to database
	const saveFloorPlan = async () => {
		const floorPlanData = {
			walls,
			doors,
			windows,
			rooms,
			createdAt: new Date(),
		}

		try {
			const response = await fetch('/api/floorplans', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(floorPlanData),
			})

			if (response.ok) {
				alert('Floor plan saved!')
			}
		} catch (error) {
			console.error('Error saving floor plan:', error)
		}
	}

	// Load all saved floor plans
	const loadFloorPlans = async () => {
		try {
			const response = await fetch('/api/floorplans')
			if (response.ok) {
				const plans = await response.json()
				setSavedFloorPlans(plans)
				setShowLoadMenu(true)
			}
		} catch (error) {
			console.error('Error loading floor plans:', error)
		}
	}

	// Load a specific floor plan
	const handleLoadFloorPlan = (plan) => {
		dispatch(loadFloorPlan(plan))
		setShowLoadMenu(false)
	}

	// Clear current floor plan (start new)
	const clearFloorPlan = () => {
		if (confirm('Are you sure you want to clear the current floor plan?')) {
			dispatch(clearAll())
		}
	}

	return (
		<>
			<div className="p-3 h-full flex flex-col">
				{/* Drawing Tools */}
				<div className="mb-4">
					<h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Drawing Tools</h3>
					<div className="flex flex-col gap-2">
						<ToolButton
							onClick={() => dispatch(setTool('select'))}
							active={tool === 'select'}
							icon={FiMousePointer}
							label="Select"
						/>
						<ToolButton
							onClick={() => dispatch(setTool('wall'))}
							active={tool === 'wall'}
							icon={FiSquare}
							label="Draw Wall"
						/>
						<ToolButton
							onClick={() => dispatch(setTool('room'))}
							active={tool === 'room'}
							icon={MdOutlineRectangle}
							label="Draw Room"
						/>
						<ToolButton
							onClick={() => dispatch(toggleShowGrid())}
							active={showGrid}
							icon={FiGrid}
							label="Grid"
						/>
					</div>
				</div>

				{/* Placement Tools */}
				<div className="mb-4">
					<h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Elements</h3>
					<div className="flex flex-col gap-2">
						<ToolButton
							onClick={() => dispatch(setTool('door'))}
							active={tool === 'door'}
							icon={BsDoorOpen}
							label="Place Door"
						/>
						<ToolButton
							onClick={() => dispatch(setTool('window'))}
							active={tool === 'window'}
							icon={BsWindow}
							label="Place Window"
						/>
						<ToolButton
							onClick={() => dispatch(setTool('furniture'))}
							active={tool === 'furniture'}
							icon={FiCircle}
							label="Place Furniture"
						/>
					</div>
				</div>

				{/* Wall Settings */}
				<div className="mb-4">
					<WallSettings />
				</div>

				{/* Actions */}
				<div>
					<h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Actions</h3>
					<div className="flex flex-row gap-2 flex-wrap">
						<ActionButton
							onClick={handleDelete}
							disabled={!selectedId}
							color="red"
							icon={FiTrash2}
							label="Delete"
						/>
						<ActionButton
							onClick={clearFloorPlan}
							color="orange"
							icon={FiRefreshCw}
							label="Clear"
						/>
						<ActionButton
							onClick={loadFloorPlans}
							color="purple"
							icon={FiDownload}
							label="Load"
						/>
						<ActionButton
							onClick={saveFloorPlan}
							color="blue"
							icon={FiSave}
							label="Save"
						/>
					</div>
				</div>
			</div>

			<LoadMenuModal
				showLoadMenu={showLoadMenu}
				setShowLoadMenu={setShowLoadMenu}
				savedFloorPlans={savedFloorPlans}
				loadFloorPlan={handleLoadFloorPlan}
			/>
		</>
	)
}

export default Toolbar
