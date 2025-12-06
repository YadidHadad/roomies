// utils/roomHelpers.js (update this file)

/**
 * Calculate room area using shoelace formula
 * @param {Array} vertices - Array of {x, y} points
 * @returns {number} Area in square units
 */
export const calculateArea = (vertices) => {
	if (vertices.length < 3) return 0

	let area = 0
	for (let i = 0; i < vertices.length; i++) {
		const j = (i + 1) % vertices.length
		area += vertices[i].x * vertices[j].y
		area -= vertices[j].x * vertices[i].y
	}
	return Math.abs(area / 2)
}

/**
 * Calculate centroid for label placement
 * @param {Array} vertices - Array of {x, y} points
 * @returns {Object} Centroid position {x, y}
 */
export const calculateCentroid = (vertices) => {
	const x = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length
	const y = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length
	return { x, y }
}

/**
 * Create walls from vertices
 * @param {Array} vertices - Array of {x, y} points
 * @returns {Array} Array of wall objects
 */
export const createWallsFromVertices = (vertices) => {
	const walls = []
	for (let i = 0; i < vertices.length; i++) {
		const start = vertices[i]
		const end = vertices[(i + 1) % vertices.length]
		walls.push({
			id: `wall-${Date.now()}-${i}`,
			start: { ...start },
			end: { ...end },
			thickness: 10,
			doors: [],
			windows: [],
		})
	}
	return walls
}

/**
 * Create rectangular room vertices from two points
 * @param {Object} start - Starting point {x, y}
 * @param {Object} end - Ending point {x, y}
 * @returns {Array} Array of 4 vertices
 */
export const createRectVertices = (start, end) => {
	return [
		{ x: start.x, y: start.y },
		{ x: end.x, y: start.y },
		{ x: end.x, y: end.y },
		{ x: start.x, y: end.y },
	]
}

/**
 * Update vertices when corner is dragged
 * @param {Array} vertices - Current vertices (4 points)
 * @param {number} cornerIndex - Index of corner being dragged (0-3)
 * @param {Object} newPos - New position {x, y}
 * @returns {Array} Updated vertices
 */
export const updateCornerVertex = (vertices, cornerIndex, newPos) => {
	console.log('[updateCornerVertex] Input:', { cornerIndex, newPos, vertices })

	// Create completely new vertex objects - don't mutate originals
	const newVertices = vertices.map((v, i) => ({ x: v.x, y: v.y }))

	// Update the dragged corner
	newVertices[cornerIndex] = { x: newPos.x, y: newPos.y }

	// Update adjacent corners to maintain rectangle
	// Corners are: 0: top-left, 1: top-right, 2: bottom-right, 3: bottom-left
	switch (cornerIndex) {
		case 0: // Top-left
			newVertices[1] = { x: newVertices[1].x, y: newPos.y }
			newVertices[3] = { x: newPos.x, y: newVertices[3].y }
			break
		case 1: // Top-right
			newVertices[0] = { x: newVertices[0].x, y: newPos.y }
			newVertices[2] = { x: newPos.x, y: newVertices[2].y }
			break
		case 2: // Bottom-right
			newVertices[3] = { x: newVertices[3].x, y: newPos.y }
			newVertices[1] = { x: newPos.x, y: newVertices[1].y }
			break
		case 3: // Bottom-left
			newVertices[2] = { x: newVertices[2].x, y: newPos.y }
			newVertices[0] = { x: newPos.x, y: newVertices[0].y }
			break
	}

	console.log('[updateCornerVertex] Output:', newVertices)
	return newVertices
}

/**
 * Update vertices when edge is dragged
 * @param {Array} vertices - Current vertices (4 points)
 * @param {string} edge - Edge being dragged ('top', 'right', 'bottom', 'left')
 * @param {Object} newPos - New position {x, y}
 * @returns {Array} Updated vertices
 */
export const updateEdgeVertex = (vertices, edge, newPos) => {
	console.log('[updateEdgeVertex] Input:', { edge, newPos, vertices })

	// Create completely new vertex objects - don't mutate originals
	const newVertices = vertices.map((v, i) => ({ x: v.x, y: v.y }))

	switch (edge) {
		case 'top':
			newVertices[0] = { x: newVertices[0].x, y: newPos.y }
			newVertices[1] = { x: newVertices[1].x, y: newPos.y }
			break
		case 'right':
			newVertices[1] = { x: newPos.x, y: newVertices[1].y }
			newVertices[2] = { x: newPos.x, y: newVertices[2].y }
			break
		case 'bottom':
			newVertices[2] = { x: newVertices[2].x, y: newPos.y }
			newVertices[3] = { x: newVertices[3].x, y: newPos.y }
			break
		case 'left':
			newVertices[0] = { x: newPos.x, y: newVertices[0].y }
			newVertices[3] = { x: newPos.x, y: newVertices[3].y }
			break
	}

	console.log('[updateEdgeVertex] Output:', newVertices)
	return newVertices
}

/**
 * Generate room style with fixed dark pastel blue color
 * @returns {Object} Style object with white fill and dark pastel blue stroke
 */
export const generateRoomStyle = () => {
	return {
		fillColor: '#ffffff', // Solid white
		strokeColor: '#6374cd', // Dark pastel blue
		opacity: 1,
	}
}
