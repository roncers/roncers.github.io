import { ReactNode, CSSProperties, useRef, useMemo, use } from "react"
import styles from "./PoppingWindow.module.css"
import CloseIcon from '@/components/icons/CloseIcon'
// import MinimizeIcon from '@/components/icons/MinimizeIcon'
import MaximizeIcon from '@/components/icons/MaximizeIcon'
import HideIcon from '@/components/icons/HideIcon'
import UiButton from '@/components/commons/ui-button/UiButton'
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import { useDraggable } from "@/utils/hooks/useDraggable"
import { useResizable } from "@/utils/hooks/useResizable"

interface PoppingWindowProps {
  id: string
  sizeX: number
  sizeY: number
  screenPosition: { x: number; y: number } | null
  children?: ReactNode
  style?: CSSProperties
  [key: string]: any
}

// move this logic to the Tab class which will be available for all tabs


const MIN_WIDTH = 150
const MIN_HEIGHT = 100

// TODO: if clicked put the max z-index available + 1
// Also in this context It would be useful to include all the shared relevant data of the popovers, to being able to close them without references.

export default function PoppingWindow({
  id,
  sizeX,
  sizeY,
  screenPosition,
  style,
  children,
  ...rest
}: PoppingWindowProps): React.ReactElement {
  const { incrementTabZIndex, removeTab } = use(TaskManagerContext)
  const ref = useRef<HTMLDivElement>(null)

  const { onDragStart } = useDraggable(ref)
  const { onResizeStart, directions } = useResizable(ref, {
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
  })

  return (
    <section
      id={id}
      className={styles.poppingWindow}
      style={{
        left: `${screenPosition!.x}%`,
        top: `${screenPosition!.y}%`,
        width: sizeX,
        height: sizeY,
        ...style,
      }}
      ref={ref}
      onMouseDown={() => {
        incrementTabZIndex(id)
      }}
      {...rest}
    >
      <header onMouseDown={onDragStart}>
        <UiButton><HideIcon /></UiButton>
        <UiButton><MaximizeIcon /></UiButton>
        <UiButton className={styles.closeIcon} onClick={() => removeTab(id)}><CloseIcon /></UiButton>
      </header>
      <div className={styles.content}>{children}</div>
      {directions.map((dir) => (
        <div
          key={dir}
          className={`${styles.handle} ${styles[dir]}`}
          onMouseDown={onResizeStart(dir)}
        />
      ))}
    </section>
  )
}
