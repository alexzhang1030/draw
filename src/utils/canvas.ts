import type { UI } from 'leafer-ui'
import { Theme } from '../use'

export const Color = {
  [Theme.DARK]: '#fff',
  [Theme.LIGHT]: '#000',
}

export function changeTheme(isDark: boolean, shapes: UI[]) {
  const color = Color[isDark ? Theme.DARK : Theme.LIGHT]
  for (const shape of shapes) {
    shape.set({
      stroke: color,
    })
  }
}

export function move(moveX: number, moveY: number, shapes: UI[]) {
  for (const Shape of shapes) {
    const { x, y } = Shape.get()
    Shape.set({
      x: x! + moveX,
      y: y! + moveY,
    })
  }
}
