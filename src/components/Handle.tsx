import { Fragment, useState } from 'react'
import { clsx } from 'clsx'

interface HandleGroup {
  name: string
  handles: Handle[]
}

interface Handle {
  name: string
  icon: string
  handler: () => void
}

const handles: HandleGroup[] = [
  {
    name: 'Mode switch',
    handles: [
      {
        name: 'Select mode',
        icon: 'i-fluent:cursor-16-filled',
        handler() {

        },
      },
      {
        name: 'Move mode',
        icon: 'i-fluent:hand-left-16-filled',
        handler() {

        },
      },
    ],
  },
  {
    name: 'Shapes',
    handles: [
      {
        name: 'Rectangle',
        icon: 'i-fluent:square-16-filled',
        handler() {
        },
      },
      {
        name: 'Circle',
        icon: 'i-fluent:circle-16-filled',
        handler() {
        },
      },
      {
        name: 'Triangle',
        icon: 'i-fluent:triangle-16-filled',
        handler() {
        },
      },
    ],
  },
]

const styles = {
  handle: 'w30px h30px flex-center rounded-lg ',
  wrapper: 'fixed bottom-3 left-50% translate-x--50% rounded-xl dark:bg-black/30 bg-gray-100 p8px overflow-hidden flex gap1',
  handleActive: 'bg-blue6 text-white',
  nonActive: 'hover:(dark:bg-gray-200/10 bg-gray-200)',
}

export function HandleWrapper() {
  const [active, setActive] = useState(handles[0].name)
  return <div className={styles.wrapper}>
    {
      handles.map((group, index) =>
        <Fragment key={group.name}>
          {
            index
              ? <div className="w5px h30px flex-center flex-col">
                  <div className="w1px h15px bg-gray-400" />
                </div>
              : null
          }
          {
            group.handles.map(handle =>
              <button className={clsx([styles.handle, active === handle.name ? styles.handleActive : styles.nonActive])}
                onClick={() => {
                  handle.handler()
                  setActive(handle.name)
                }} title={handle.name} key={handle.name}>
                  <div className={handle.icon} />
              </button>,
            )
          }
        </Fragment>,
      )
    }
  </div>
}
