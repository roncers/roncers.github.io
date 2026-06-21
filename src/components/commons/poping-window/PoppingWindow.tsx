import { ReactNode, CSSProperties, useRef, use, useState } from "react"
import styles from "./PoppingWindow.module.css"
import CloseIcon from '@/components/icons/CloseIcon'
// import MinimizeIcon from '@/components/icons/MinimizeIcon'
import MaximizeIcon from '@/components/icons/MaximizeIcon'
import MinimizeIcon from '@/components/icons/MinimizeIcon'
import HideIcon from '@/components/icons/HideIcon'
import UiButton from '@/components/commons/ui-button/UiButton'
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import { useDraggable } from "@/utils/hooks/useDraggable"
import { useResizable } from "@/utils/hooks/useResizable"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"

// this is highly coupled with the Tab type.
interface PoppingWindowProps {
  id: string
  sizeX: number
  sizeY: number
  screenPosition: { x: number; y: number } | null
  zIndex: number
  children?: ReactNode
  style?: CSSProperties
  fadingOut?: boolean
  [key: string]: any
}

const MIN_WIDTH = 150
const MIN_HEIGHT = 100

export default function PoppingWindow({
  id,
  sizeX,
  sizeY,
  screenPosition,
  style,
  zIndex,
  children,
  fadingOut,
  ...rest
}: PoppingWindowProps): React.ReactElement {
  const { incrementTabZIndex, fadeTab, maximizeTab, minimizeTab, updateTab, hideTab } = use(TaskManagerContext)
  const { width, height } = use(UiWindowContext)
  const ref = useRef<HTMLDivElement>(null)
  const [isToggling, setIsToggling] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  function toggleWithAnimation(callback: () => void) {
    setIsToggling(true)
    callback()
    setTimeout(() => setIsToggling(false), 500)
  }

  function hideWithAnimation() {
    setIsHiding(true)
    setTimeout(() => hideTab(id), 500)
  }

  const { onDragStart } = useDraggable(ref, updateTabPos)

  function updateTabPos(screenPosition: { x: number; y: number }) {
    screenPosition.x = (screenPosition.x / width) * 100
    screenPosition.y = (screenPosition.y / height) * 100
    updateTab({ id, screenPosition })
  }
  function updateTabSize(
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) {
    updateTab({
      id,
      sizeX: size.width,
      sizeY: size.height,
      screenPosition: {
        x: (position.x / width) * 100,
        y: (position.y / height) * 100,
      },
    })
  }
  const { onResizeStart, directions } = useResizable(ref, {
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    onResizeEnd: updateTabSize,
  })
  const isMaximized = width === sizeX && height === sizeY
  function eventHandler<E>(callback: (e: E) => void) {
    return (e: E) => {
      incrementTabZIndex(id)
      callback(e)
    }
  }

  return (
    <section
      id={id}
      className={`${styles.poppingWindow} ${fadingOut ? styles.fadingOut : ''} ${isToggling ? styles.fullScreenToggling : ''} ${isHiding ? styles.hiding : ''}`}
      style={{
        left: `${screenPosition!.x}%`,
        top: `${screenPosition!.y}%`,
        width: sizeX,
        height: sizeY,
        zIndex,
        ...style,
      }}
      ref={ref}
      onMouseDown={() => {
        incrementTabZIndex(id)
      }}
      {...rest}
    >
      <header onMouseDown={onDragStart}>
        <UiButton onClick={eventHandler(() => hideWithAnimation())}><HideIcon /></UiButton>
        {isMaximized && <UiButton onClick={eventHandler(() => toggleWithAnimation(() => minimizeTab(id)))}><MinimizeIcon /></UiButton>}
        {!isMaximized && <UiButton onClick={eventHandler(() => toggleWithAnimation(() => maximizeTab(id)))}><MaximizeIcon /></UiButton>}
        <UiButton className={styles.closeIcon} onClick={eventHandler(() => fadeTab(id))}><CloseIcon /></UiButton>
      </header>
      <div className={styles.content}>{children}</div>
      {directions.map((dir) => (
        <div
          key={dir}
          className={`${styles.handle} ${styles[dir]}`}
          onMouseDown={eventHandler(onResizeStart(dir))}
        />
      ))}
    </section>
  )
}
