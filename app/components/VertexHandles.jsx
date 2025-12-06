// components/floorplan/VertexHandles.jsx
import { Circle } from 'react-konva';

/**
 * VertexHandles - Renders draggable vertex handles for editing
 * @param {Object} props
 * @param {Array} props.vertices - Array of {x, y} points
 * @param {boolean} props.visible - Whether to show handles
 * @param {Function} props.onVertexDrag - Callback when vertex is dragged
 */
export default function VertexHandles({ vertices, visible, onVertexDrag }) {
    if (!visible) return null;

    return (
        <>
            {vertices.map((vertex, index) => (
                <Circle
                    key={`vertex-${index}`}
                    x={vertex.x}
                    y={vertex.y}
                    radius={5}
                    fill="#4A90E2"
                    stroke="#ffffff"
                    strokeWidth={2}
                    draggable
                    onDragMove={(e) => {
                        if (onVertexDrag) {
                            onVertexDrag(index, e.target.position());
                        }
                    }}
                />
            ))}
        </>
    );
}