export type BoundsSize = { x: number; y: number; z: number };

export function fitCameraDistance(size: BoundsSize, fovDegrees: number, aspect = 1, padding = 1.2) {
  const maxSize = Math.max(size.x, size.y, size.z, 0.01);
  const verticalFov = (fovDegrees * Math.PI) / 180;
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * Math.max(aspect, 0.1));
  const verticalDistance = maxSize / (2 * Math.tan(verticalFov / 2));
  const horizontalDistance = maxSize / (2 * Math.tan(horizontalFov / 2));
  return Math.max(verticalDistance, horizontalDistance) * padding;
}

export function orbitLimits(distance: number) {
  return { min: Math.max(distance * 0.62, 0.25), max: Math.max(distance * 2.65, 3) };
}
