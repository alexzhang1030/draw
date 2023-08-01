import type { CSSProperties } from 'react'

export function updateCursor(cursor: CSSProperties['cursor'], target: HTMLElement = document.body) {
  if (cursor)
    target.style.cursor = cursor
}
