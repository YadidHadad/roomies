/**
 * Get bounding box for room from vertices
 * @param {Array} vertices - Room vertices
 * @returns {Object} {minX, maxX, minY, maxY}
 */
export const getRoomBounds = (vertices) => {
	if (!vertices || vertices.length === 0) return null
	const xValues = vertices.map((v) => v.x)
	const yValues = vertices.map((v) => v.y)
	return {
		minX: Math.min(...xValues),
		maxX: Math.max(...xValues),
		minY: Math.min(...yValues),
		maxY: Math.max(...yValues),
	}
}

/**
 * Check if edges overlap on perpendicular axis
 * For vertical edges (same X), check Y overlap
 * For horizontal edges (same Y), check X overlap
 */
export const doEdgesOverlap = (edge1, edge2, axis) => {
	if (axis === 'x') {
		// Vertical edges - check Y overlap
		const e1YMin = Math.min(edge1.start.y, edge1.end.y)
		const e1YMax = Math.max(edge1.start.y, edge1.end.y)
		const e2YMin = Math.min(edge2.start.y, edge2.end.y)
		const e2YMax = Math.max(edge2.start.y, edge2.end.y)
		return !(e1YMax < e2YMin || e2YMax < e1YMin)
	} else {
		// Horizontal edges - check X overlap
		const e1XMin = Math.min(edge1.start.x, edge1.end.x)
		const e1XMax = Math.max(edge1.start.x, edge1.end.x)
		const e2XMin = Math.min(edge2.start.x, edge2.end.x)
		const e2XMax = Math.max(edge2.start.x, edge2.end.x)
		return !(e1XMax < e2XMin || e2XMax < e1XMin)
	}
}

/**
 * Get edges for a room based on bounding box
 * Returns edges as {axis, position, start, end}
 */
export const getRoomEdges = (room) => {
	const bounds = getRoomBounds(room.vertices)
	if (!bounds) return []

	return [
		// Vertical edges (constant X)
		{
			axis: 'x',
			position: bounds.minX,
			type: 'left',
			start: { x: bounds.minX, y: bounds.minY },
			end: { x: bounds.minX, y: bounds.maxY },
		},
		{
			axis: 'x',
			position: bounds.maxX,
			type: 'right',
			start: { x: bounds.maxX, y: bounds.minY },
			end: { x: bounds.maxX, y: bounds.maxY },
		},
		// Horizontal edges (constant Y)
		{
			axis: 'y',
			position: bounds.minY,
			type: 'top',
			start: { x: bounds.minX, y: bounds.minY },
			end: { x: bounds.maxX, y: bounds.minY },
		},
		{
			axis: 'y',
			position: bounds.maxY,
			type: 'bottom',
			start: { x: bounds.minX, y: bounds.maxY },
			end: { x: bounds.maxX, y: bounds.maxY },
		},
	]
}

/**
 * Find best snap point when dragging a room
 * @param {Object} movingRoom - Room being dragged
 * @param {Array} allRooms - All rooms
 * @param {Object} delta - {x, y} current drag delta
 * @returns {Object|null} {axis, snapValue, distance} or null
 */
export const findSnapPoint = (movingRoom, allRooms, delta) => {
	const SNAP_DISTANCE = 15
	if (!movingRoom || !movingRoom.vertices) return null

	// Get edges of moving room after drag
	const movedVertices = movingRoom.vertices.map((v) => ({
		x: v.x + delta.x,
		y: v.y + delta.y,
	}))

	const movingEdges = getRoomEdges({ ...movingRoom, vertices: movedVertices })
	let bestSnap = null
	let closestDist = SNAP_DISTANCE

	// Compare with all other rooms
	allRooms.forEach((otherRoom) => {
		if (otherRoom.id === movingRoom.id || !otherRoom.vertices) return

		const otherEdges = getRoomEdges(otherRoom)

		// Check vertical edges (X-axis snapping)
		movingEdges
			.filter((e) => e.axis === 'x')
			.forEach((movingEdge) => {
				otherEdges
					.filter((e) => e.axis === 'x')
					.forEach((otherEdge) => {
						// Check if edges overlap on Y
						if (doEdgesOverlap(movingEdge, otherEdge, 'x')) {
							const dist = Math.abs(movingEdge.position - otherEdge.position)
							if (dist < closestDist) {
								closestDist = dist
								bestSnap = {
									axis: 'x',
									snapValue: otherEdge.position,
									distance: dist,
									movingEdgeType: movingEdge.type,
									targetEdgeType: otherEdge.type,
								}
							}
						}
					})
			})

		// Check horizontal edges (Y-axis snapping)
		movingEdges
			.filter((e) => e.axis === 'y')
			.forEach((movingEdge) => {
				otherEdges
					.filter((e) => e.axis === 'y')
					.forEach((otherEdge) => {
						// Check if edges overlap on X
						if (doEdgesOverlap(movingEdge, otherEdge, 'y')) {
							const dist = Math.abs(movingEdge.position - otherEdge.position)
							if (dist < closestDist) {
								closestDist = dist
								bestSnap = {
									axis: 'y',
									snapValue: otherEdge.position,
									distance: dist,
									movingEdgeType: movingEdge.type,
									targetEdgeType: otherEdge.type,
								}
							}
						}
					})
			})
	})

	return bestSnap
}

/**
 * Apply snap to delta during drag
 * @param {Object} delta - Current {x, y} delta
 * @param {Object} snapInfo - {axis, snapValue} from findSnapPoint
 * @returns {Object} Adjusted delta
 */
export const applySnap = (delta, snapInfo) => {
	if (!snapInfo) return delta

	if (snapInfo.axis === 'x') {
		// Snap on X, keep Y as-is
		return {
			...delta,
			x: snapInfo.snapValue,
		}
	} else {
		// Snap on Y, keep X as-is
		return {
			...delta,
			y: snapInfo.snapValue,
		}
	}
}
