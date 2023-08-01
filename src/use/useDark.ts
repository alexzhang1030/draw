import { create } from 'zustand'

interface DarkState {
  isDark: boolean
  toggleDark: () => void
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const STORAGE_KEY = '$$dark-mode$$'

const TRUE = Theme.DARK
const FALSE = Theme.LIGHT

const isDarkInitial = localStorage.getItem(STORAGE_KEY)
export const globalIsDark = {
  isDark: isDarkInitial === TRUE,
}

if (!isDarkInitial)
  localStorage.setItem(STORAGE_KEY, FALSE)
window.document.body.classList.toggle('dark', isDarkInitial === TRUE)

export const useDark = create<DarkState>(set => ({
  isDark: isDarkInitial === TRUE,
  toggleDark: () => set(state => ({ isDark: !state.isDark })),
}))

useDark.subscribe((state) => {
  const isDark = state.isDark
  const darkValue = isDark ? TRUE : FALSE
  localStorage.setItem(STORAGE_KEY, darkValue)
  window.document.body.classList.toggle('dark', isDark)
  globalIsDark.isDark = isDark
})

window.addEventListener('storage', (s) => {
  if (s.key === STORAGE_KEY)
    useDark.setState({ isDark: s.newValue === TRUE })
})
