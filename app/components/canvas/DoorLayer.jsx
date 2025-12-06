// components/canvas/DoorLayer.jsx
import { useSelector } from 'react-redux'
import Door from '../Door'

export default function DoorLayer() {
    const { doors } = useSelector(state => state.door)
    const { walls } = useSelector(state => state.wall)

    return (
        <>
            {doors.map(door => {
                // Find the wall this door belongs to
                const wall = walls.find(w => w.id === door.wallId)
                if (!wall) return null

                return (
                    <Door
                        key={door.id}
                        door={door}
                        wall={wall}
                    />
                )
            })}
        </>
    )
}