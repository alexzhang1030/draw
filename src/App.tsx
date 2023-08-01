import { useEffect, useRef } from 'react'
import { useRender } from './use'
import { DarkToggle, HandleWrapper } from './components'

function App() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const renderCtx = useRender()

  useEffect(() => {
    if (!canvasRef.current)
      return
    renderCtx.register(canvasRef.current)
  }, [])

  return <div className="w-full h100vh overflow-hidden bg-white color-black dark:(bg-#212529 color-white) ">
    <div ref={canvasRef} className="w-full h-full"></div>
    <HandleWrapper />
    <DarkToggle />
  </div>
}

export default App
