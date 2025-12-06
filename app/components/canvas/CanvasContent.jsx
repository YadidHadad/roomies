// components/canvas/CanvasContent.jsx
import { useSelector } from 'react-redux'
import Grid from './Grid'
import RoomLayer from './RoomLayer'
import WallLayer from './WallLayer'
import DoorLayer from './DoorLayer'
import WindowLayer from './WindowLayer'
import TemporaryRoomLayer from './TemporaryRoomLayer'
import TemporaryWallLayer from './TemporaryWallLayer'

export default function CanvasContent({ onRoomContextMenu }) {
    return (
        <>
            <Grid />
            <RoomLayer onRoomContextMenu={onRoomContextMenu} />
            <WallLayer />
            <DoorLayer />
            <WindowLayer />
            <TemporaryRoomLayer />
            <TemporaryWallLayer />
        </>
    )
}