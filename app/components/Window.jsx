import { Group, Line } from 'react-konva';

/**
 * Window Component - Renders a window on a wall
 * @param {Object} props
 * @param {Object} props.window - Window data object
 * @param {Object} props.wall - Parent wall object
 */
export default function Window({ window, wall }) {
    const windowWidth = window.width || 40;

    // Calculate wall angle
    const wallAngle = Math.atan2(
        wall.end.y - wall.start.y,
        wall.end.x - wall.start.x
    );

    const windowX = window.position.x;
    const windowY = window.position.y;

    return (
        <Group>
            {/* Window opening */}
            <Line
                points={[
                    windowX,
                    windowY,
                    windowX + windowWidth * Math.cos(wallAngle),
                    windowY + windowWidth * Math.sin(wallAngle)
                ]}
                stroke="#4A90E2"
                strokeWidth={wall.thickness * 0.8}
                lineCap="round"
            />

            {/* Window frame - vertical divider */}
            <Line
                points={[
                    windowX + (windowWidth / 2) * Math.cos(wallAngle),
                    windowY + (windowWidth / 2) * Math.sin(wallAngle),
                    windowX + (windowWidth / 2) * Math.cos(wallAngle) + 5 * Math.cos(wallAngle + Math.PI / 2),
                    windowY + (windowWidth / 2) * Math.sin(wallAngle) + 5 * Math.sin(wallAngle + Math.PI / 2)
                ]}
                stroke="#4A90E2"
                strokeWidth={1}
            />

            {/* Window sill indicators */}
            <Line
                points={[
                    windowX + 5 * Math.cos(wallAngle + Math.PI / 2),
                    windowY + 5 * Math.sin(wallAngle + Math.PI / 2),
                    windowX + windowWidth * Math.cos(wallAngle) + 5 * Math.cos(wallAngle + Math.PI / 2),
                    windowY + windowWidth * Math.sin(wallAngle) + 5 * Math.sin(wallAngle + Math.PI / 2)
                ]}
                stroke="#4A90E2"
                strokeWidth={1}
                opacity={0.5}
            />
        </Group>
    );
}