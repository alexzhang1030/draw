import { create } from 'zustand'

interface DarkState {
  isDark: boolean
  toggleDark: () => void
}

const STORAGE_KEY = '$$dark-mode$$'

const TRUE = 'dark'
const FALSE = 'light'

const isDarkInitial = localStorage.getItem(STORAGE_KEY)

if (!isDarkInitial)
  localStorage.setItem(STORAGE_KEY, FALSE)
window.document.body.classList.toggle('dark', isDarkInitial === TRUE)

export const useDark = create<DarkState>(set => ({
  isDark: isDarkInitial === TRUE,
  toggleDark: () => set(state => ({ isDark: !state.isDark })),
}))

useDark.subscribe((state) => {
  const isDark = state.isDark
  localStorage.setItem(STORAGE_KEY, isDark ? TRUE : FALSE)
  window.document.body.classList.toggle('dark', isDark)
})

window.addEventListener('storage', (s) => {
  if (s.key === STORAGE_KEY)
    useDark.setState({ isDark: s.newValue === TRUE })
})
