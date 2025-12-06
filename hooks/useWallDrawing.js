// hooks/useWallDrawing.js
import { useDispatch, useSelector } from 'react-redux'
import { startDrawingWall, updateWallEndPos, finishDrawingWall, cancelDrawingWall } from '../store/wallSlice'

export default function useWallDrawing() {
	const dispatch = useDispatch()
	const { wallSettings } = useSelector((state) => state.wall)

	const handleStartDrawing = (pos) => {
		dispatch(startDrawingWall(pos))
	}

	const handleUpdateEndPos = (pos) => {
		dispatch(updateWallEndPos(pos))
	}

	const handleFinishDrawing = (startPos, endPos) => {
		if (!startPos || !endPos) {
			dispatch(cancelDrawingWall())
			return
		}

		// Minimum length check
		const dx = endPos.x - startPos.x
		const dy = endPos.y - startPos.y
		const length = Math.sqrt(dx * dx + dy * dy)

		if (length < 10) {
			dispatch(cancelDrawingWall())
			return
		}

		const newWall = {
			id: `wall-${Date.now()}`,
			start: { ...startPos },
			end: { ...endPos },
			thickness: wallSettings.thickness,
			layers: [...wallSettings.layers],
			doors: [],
			windows: [],
		}

		dispatch(finishDrawingWall(newWall))
	}

	const handleCancelDrawing = () => {
		dispatch(cancelDrawingWall())
	}

	return {
		handleStartDrawing,
		handleUpdateEndPos,
		handleFinishDrawing,
		handleCancelDrawing,
	}
}
