import { Group, Line } from 'react-konva';

/**
 * Door Component - Renders a door on a wall
 * @param {Object} props
 * @param {Object} props.door - Door data object
 * @param {Object} props.wall - Parent wall object
 */
export default function Door({ door, wall }) {
  const doorWidth = door.width || 30;

  // Calculate wall angle
  const wallAngle = Math.atan2(
    wall.end.y - wall.start.y,
    wall.end.x - wall.start.x
  );

  const doorX = door.position.x;
  const doorY = door.position.y;

  // Door swing arc
  const arcRadius = doorWidth;
  const swingAngle = door.swingDirection === 'right' ? Math.PI / 2 : -Math.PI / 2;

  return (
    <Group>
      {/* Door opening (gap in wall) */}
      <Line
        points={[
          doorX,
          doorY,
          doorX + doorWidth * Math.cos(wallAngle),
          doorY + doorWidth * Math.sin(wallAngle)
        ]}
        stroke="#ffffff"
        strokeWidth={wall.thickness}
        lineCap="round"
      />

      {/* Door panel line */}
      <Line
        points={[
          doorX,
          doorY,
          doorX + arcRadius * Math.cos(wallAngle + swingAngle),
          doorY + arcRadius * Math.sin(wallAngle + swingAngle)
        ]}
        stroke="#666666"
        strokeWidth={2}
      />

      {/* Door swing arc */}
      <Line
        points={[
          doorX,
          doorY,
          doorX + arcRadius * Math.cos(wallAngle + swingAngle),
          doorY + arcRadius * Math.sin(wallAngle + swingAngle)
        ]}
        stroke="#666666"
        strokeWidth={1}
        dash={[3, 3]}
      />
    </Group>
  );
}