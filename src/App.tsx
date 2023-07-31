import { clsx } from 'clsx'
import { useDark } from './use/useDark'

function App() {
  const darkState = useDark()
  return <div className="w-full h100vh overflow-hidden bg-white color-black dark:(bg-#212529 color-white) ">
    <button onClick={() => darkState.toggleDark()}>
      <div className={clsx([darkState.isDark ? 'i-carbon-moon' : 'i-carbon-light'])} />
    </button>
  </div>
}

export default App
