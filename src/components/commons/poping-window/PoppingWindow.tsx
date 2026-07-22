import {
  type ReactNode,
  type CSSProperties,
  useRef,
  use,
  useState,
} from "react"
import styles from "./PoppingWindow.module.css"
import CloseIcon from "@/components/icons/CloseIcon"
import MaximizeIcon from "@/components/icons/MaximizeIcon"
import MinimizeIcon from "@/components/icons/MinimizeIcon"
import UiButton from "@/components/commons/ui-button/UiButton"
import BlackHoleIcon from "@/components/icons/BlackHoleIcon"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import { useDraggable } from "@/utils/hooks/useDraggable"
import { useResizable } from "@/utils/hooks/useResizable"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"
import type { TabComponentProps } from "@/types/internal-tab.types"

interface PoppingWindowProps extends TabComponentProps {
  children?: ReactNode
  style?: CSSProperties
  onSemiClear?: () => void
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
  prevPosition: _prevPosition,
  prevX: _prevX,
  prevY: _prevY,
  onSemiClear,
  ...rest
}: PoppingWindowProps): React.ReactElement {
  const {
    incrementTabZIndex,
    fadeTab,
    maximizeTab,
    minimizeTab,
    updateTab,
    // hideTab,
    setTabPosition,
  } = use(TaskManagerContext)
  const { width, height } = use(UiWindowContext)
  const ref = useRef<HTMLDivElement>(null)
  const [wState, setWState] = useState<"normal" | "isHiding" | "isToggling">(
    "normal",
  )
  const isToggling = wState === "isToggling"
  const isHiding = wState === "isHiding"

  function toggleWithAnimation(callback: () => void) {
    setWState("isToggling")
    callback()
    setTimeout(() => setWState("normal"), 500)
  }

  // function hideWithAnimation() {
  //   setWState("isHiding")
  //   setTimeout(() => hideTab(id), 500)
  // }

  const { onDragStart } = useDraggable(ref, updateTabPos, handleHeaderDbClick)

  function updateTabPos(screenPosition: { x: number; y: number }) {
    setTabPosition(id, {
      x: (screenPosition.x / width) * 100,
      y: (screenPosition.y / height) * 100,
    })
  }
  function updateTabSize(
    size: { width: number; height: number },
    position: { x: number; y: number },
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

  // Native double click doesn't work because of the workaround for touch devices & dragging over iframes
  const lastClickTime = useRef(0)

  function handleHeaderDbClick() {
    const now = Date.now()
    if (now - lastClickTime.current < 300) {
      toggleWithAnimation(() =>
        isMaximized ? minimizeTab(id) : maximizeTab(id),
      )
      lastClickTime.current = 0
    } else {
      lastClickTime.current = now
    }
  }

  return (
    <section
      id={id}
      className={`${styles.poppingWindow} ${fadingOut ? styles.fadingOut : ""} ${isToggling ? styles.fullScreenToggling : ""} ${isHiding ? styles.hiding : ""}`}
      style={{
        left: `${screenPosition!.x}%`,
        top: `${screenPosition!.y}%`,
        width: sizeX,
        height: sizeY,
        zIndex,
        ...style,
      }}
      ref={ref}
      onClick={() => onSemiClear?.()}
      onMouseDown={() => {
        incrementTabZIndex(id)
      }}
      {...rest}
    >
      <header
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
      >
        <section>
          <BlackHoleIcon className={styles.logoIcon} />
        </section>
        <section>
          {isMaximized && (
            <UiButton
              onClick={eventHandler(() =>
                toggleWithAnimation(() => minimizeTab(id)),
              )}
            >
              <MinimizeIcon />
            </UiButton>
          )}
          {!isMaximized && (
            <UiButton
              onClick={eventHandler(() =>
                toggleWithAnimation(() => maximizeTab(id)),
              )}
            >
              <MaximizeIcon />
            </UiButton>
          )}
          <UiButton
            className={styles.closeIcon}
            onClick={eventHandler(() => fadeTab(id))}
          >
            <CloseIcon />
          </UiButton>
        </section>
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
