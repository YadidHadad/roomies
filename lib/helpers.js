// Helper: Find closest wall to a point
const findClosestWall = (point, walls) => {
	let closestWall = null
	let minDistance = Infinity

	walls.forEach((wall) => {
		const distance = distanceToLine(point, wall.points)
		if (distance < minDistance && distance < 30) {
			// Within 30px
			minDistance = distance
			closestWall = wall
		}
	})

	return closestWall
}

// Helper: Distance from point to line
const distanceToLine = (point, linePoints) => {
	const [x1, y1, x2, y2] = linePoints
	const A = point.x - x1
	const B = point.y - y1
	const C = x2 - x1
	const D = y2 - y1

	const dot = A * C + B * D
	const lenSq = C * C + D * D
	let param = -1

	if (lenSq !== 0) param = dot / lenSq

	let xx, yy

	if (param < 0) {
		xx = x1
		yy = y1
	} else if (param > 1) {
		xx = x2
		yy = y2
	} else {
		xx = x1 + param * C
		yy = y1 + param * D
	}

	const dx = point.x - xx
	const dy = point.y - yy
	return Math.sqrt(dx * dx + dy * dy)
}

// Helper: Project point onto line
const projectPointOnLine = (point, linePoints) => {
	const [x1, y1, x2, y2] = linePoints
	const A = point.x - x1
	const B = point.y - y1
	const C = x2 - x1
	const D = y2 - y1

	const dot = A * C + B * D
	const lenSq = C * C + D * D
	const param = Math.max(0, Math.min(1, dot / lenSq))

	return {
		x: x1 + param * C,
		y: y1 + param * D,
	}
}

// Helper: Calculate wall angle
const calculateWallAngle = (points) => {
	const [x1, y1, x2, y2] = points
	return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
}

export {
	findClosestWall,
	distanceToLine,
	projectPointOnLine,
	calculateWallAngle,
}
