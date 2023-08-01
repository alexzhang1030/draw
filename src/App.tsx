import { useEffect, useRef } from 'react'
import { useRender } from './use'
import { DarkToggle, GithubIcon, HandleWrapper } from './components'

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
    <div className="fixed top-5 right-5 flex gap4">
      <GithubIcon />
      <DarkToggle />
    </div>
  </div>
}

export default App
