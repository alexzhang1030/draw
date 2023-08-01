import { Ellipse, Polygon, Rect } from 'leafer-ui'
import type { IUIInputData, Leafer, UI } from 'leafer-ui'
import { Theme } from '../use'
import { Color, calcPosition } from '.'

export enum Shape {
  SQUARE,
  CIRCLE,
  TRIANGLE,
}

type CreateShapeFn = (rerender: Leafer | undefined, type: Shape, params: { x: number; y: number }, isDark: boolean) => UI

const DEFAULT_SIZE = 100

const commonParams: Partial<IUIInputData> = {
  width: DEFAULT_SIZE,
  height: DEFAULT_SIZE,
  strokeWidth: 2,
  cornerRadius: 5,
}

const apis: Record<Shape, typeof UI> = {
  [Shape.SQUARE]: Rect,
  [Shape.CIRCLE]: Ellipse,
  [Shape.TRIANGLE]: Polygon,
}

export const createShape: CreateShapeFn = (r, t, p, d) => {
  const { x, y } = calcPosition(DEFAULT_SIZE, { x: p.x, y: p.y })
  const rect = new apis[t]({
    x,
    y,
    ...commonParams,
    stroke: Color[d ? Theme.DARK : Theme.LIGHT],
  })
  r?.add(rect)
  return rect
}
