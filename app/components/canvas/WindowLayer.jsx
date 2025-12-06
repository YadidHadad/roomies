// components/canvas/WindowLayer.jsx
import { useSelector } from 'react-redux'
import Window from '../Window'

export default function WindowLayer() {
    const { windows } = useSelector(state => state.window)
    const { walls } = useSelector(state => state.wall)

    return (
        <>
            {windows.map(window => {
                // Find the wall this window belongs to
                const wall = walls.find(w => w.id === window.wallId)
                if (!wall) return null

                return (
                    <Window
                        key={window.id}
                        window={window}
                        wall={wall}
                    />
                )
            })}
        </>
    )
}