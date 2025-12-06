// components/canvas/TemporaryRoomLayer.jsx
import { useSelector } from 'react-redux'
import TemporaryRectRoom from '../TemporaryRectRoom'

export default function TemporaryRoomLayer() {
    const { isDrawingRoom, roomStartPos, currentMousePos } = useSelector(state => state.room)

    if (!isDrawingRoom) return null

    return (
        <TemporaryRectRoom
            startPos={roomStartPos}
            currentPos={currentMousePos}
        />
    )
}