import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import { useDark } from './use/useDark'
import { useLeafer } from './use/useLeafer'
import { HandleWrapper } from './components/Handle'

function App() {
  const darkState = useDark()

  const canvasRef = useRef<HTMLDivElement>(null)
  const leaferState = useLeafer()

  useEffect(() => {
    if (!canvasRef.current || leaferState.leafer)
      return
    leaferState.register(canvasRef.current)
  })

  return <div className="w-full h100vh overflow-hidden bg-white color-black dark:(bg-#212529 color-white) ">
    <button onClick={() => darkState.toggleDark()}>
      <div className={clsx([darkState.isDark ? 'i-carbon-moon' : 'i-carbon-light'])} />
    </button>
    <div ref={canvasRef} className="w500px h500px"></div>
    <HandleWrapper />
  </div>
}

export default App
