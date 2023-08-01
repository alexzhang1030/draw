export function calcPosition(width: number, pos: { x: number; y: number }) {
  const x = pos.x - width / 2
  const y = pos.y - width / 2
  return { x, y }
}
