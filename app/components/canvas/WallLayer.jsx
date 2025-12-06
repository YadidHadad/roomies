// components/canvas/WallLayer.jsx
import { useSelector } from 'react-redux'
import Wall from '../Wall'
import useWallInteractions from '../../../hooks/useWallInteractions'

export default function WallLayer() {
    const { walls } = useSelector(state => state.wall)
    const { tool, selectedId, selectedType } = useSelector(state => state.ui)

    const { handleWallSelect, handleWallDragEnd } = useWallInteractions()

    return (
        <>
            {walls.map(wall => (
                <Wall
                    key={wall.id}
                    wall={wall}
                    isSelected={selectedId === wall.id && selectedType === 'wall'}
                    onSelect={handleWallSelect}
                    onDragEnd={handleWallDragEnd}
                    draggable={tool === 'select'}
                />
            ))}
        </>
    )
}