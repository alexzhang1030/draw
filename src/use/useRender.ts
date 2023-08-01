import { create } from 'zustand'
import type { IPointerEvent, UI } from 'leafer-ui'
import { Leafer, PointerEvent } from 'leafer-ui'
import { oneOf } from 'uttype'
import { Shape, changeTheme, createShape, move } from '../utils'
import { updateCursor } from './useCursor'
import { globalIsDark, useDark } from '.'

export enum STATE {
  // move
  MODE_SELECT,
  MODE_MOVE,
  // draw
  DRAW_SQUARE,
  DRAW_CIRCLE,
  DRAW_TRIANGLE,
}

const stateTargetShape = {
  [STATE.DRAW_SQUARE]: Shape.SQUARE,
  [STATE.DRAW_CIRCLE]: Shape.CIRCLE,
  [STATE.DRAW_TRIANGLE]: Shape.TRIANGLE,
}

export interface RendererCtx {
  renderer?: Leafer
  isMoving: boolean
  movingState: { x: number; y: number }
  register: (domNode: HTMLElement) => void
  createShape: (type: Shape, x: number, y: number, isDark: boolean) => void
  onClick: (e: IPointerEvent) => void
  onMove: (e: IPointerEvent) => void
  onMouseDown: (e: IPointerEvent) => void
  onMouseup: (e: IPointerEvent) => void
}

export interface RenderCtx {
  rendererCtx: RendererCtx
  currentDom?: HTMLElement
  currentState: STATE
  allShapes: UI[]
  updateCursor: (cursor: React.CSSProperties['cursor']) => void
  updateState: (state: STATE) => void
  register: (domNode: HTMLElement) => void
}

export const useRender = create<RenderCtx>((set, get) => ({
  currentState: STATE.MODE_SELECT,
  allShapes: [],
  rendererCtx: {
    isMoving: false,
    movingState: { x: 0, y: 0 },
    register(domNode: HTMLElement) {
      if (get().rendererCtx.renderer)
        return
      const leafer = new Leafer({
        view: domNode,
      })
      leafer.on(PointerEvent.CLICK, get().rendererCtx.onClick)
      leafer.on(PointerEvent.UP, get().rendererCtx.onMouseup)
      leafer.on(PointerEvent.DOWN, get().rendererCtx.onMouseDown)
      leafer.on(PointerEvent.MOVE, get().rendererCtx.onMove)
      set({ rendererCtx: { ...get().rendererCtx, renderer: leafer } })
    },
    createShape(type, x, y, isDark: boolean) {
      const renderer = get().rendererCtx.renderer
      const shape = createShape(renderer, type, { x, y }, isDark)
      set({ allShapes: [...get().allShapes, shape] })
    },
    onClick(e) {
      const state = get().currentState
      if (oneOf(state, [STATE.DRAW_CIRCLE, STATE.DRAW_SQUARE, STATE.DRAW_TRIANGLE])) {
        const shapeType = stateTargetShape[state as keyof typeof stateTargetShape]!
        const x = e.x!
        const y = e.y!
        get().rendererCtx.createShape(shapeType, x, y, globalIsDark.isDark)
      }
    },
    onMouseDown(e) {
      const state = get().currentState
      const { x, y } = e
      if (state === STATE.MODE_MOVE) {
        get().updateCursor('grabbing')
        set({ rendererCtx: { ...get().rendererCtx, isMoving: true, movingState: { x, y } } })
      }
    },
    onMouseup() {
      const state = get().currentState
      if (state === STATE.MODE_MOVE) {
        get().updateCursor('grab')
        set({ rendererCtx: { ...get().rendererCtx, isMoving: false, movingState: { x: 0, y: 0 } } })
      }
    },
    onMove(e) {
      const state = get().currentState
      const isMoving = get().rendererCtx.isMoving
      if (state !== STATE.MODE_MOVE || !isMoving)
        return
      const { x, y } = e
      const { x: oldX, y: oldY } = get().rendererCtx.movingState
      const [moveX, moveY] = [x - oldX, y - oldY]
      move(moveX, moveY, get().allShapes)
      set({ rendererCtx: { ...get().rendererCtx, movingState: { x, y } } })
    },
  },
  updateState(currentState) {
    set({ currentState })
  },
  register(domNode) {
    set({ currentDom: domNode })
    const rerenderCtx = get().rendererCtx
    rerenderCtx.register(domNode)
    useDark.subscribe(({ isDark }) => {
      changeTheme(isDark, get().allShapes)
    })
  },
  updateCursor(cursor) {
    const dom = get().currentDom
    if (dom)
      updateCursor(cursor, dom)
  },
}))
