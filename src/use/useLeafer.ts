import { Leafer } from 'leafer-ui'
import { create } from 'zustand'

interface LeaferCtx {
  leafer?: Leafer
  register: (domNode: HTMLElement) => void
}

export const useLeafer = create<LeaferCtx>((set, get) => ({
  leafer: undefined,
  register(domNode: HTMLElement) {
    if (get().leafer)
      return
    const leafer = new Leafer({
      view: domNode,
    })
    set({ leafer })
  },
}))
