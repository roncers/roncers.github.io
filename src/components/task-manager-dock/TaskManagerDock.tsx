import { ReactElement, use, useState } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import styles from "./TaskManagerDock.module.css"
import { OverflowMenuHorizontal } from "../icons/OverflowHIcon"

function TaskManagerDock(): ReactElement {
  const { tabs, setTabPosition, incrementTabZIndex } = use(TaskManagerContext)
  const [open, setOpen] = useState(false)

  function focusTab(id: string) {
    incrementTabZIndex(id)
  }

  function restoreTab(id: string) {
    // re-open a hidden tab at a default position
    setTabPosition(id, { x: 30, y: 30 })
    incrementTabZIndex(id)
  }

  return (
    <div className={styles.dock}>
      {open && (
        <ul className={styles.list}>
          {tabs.length === 0 && <li className={styles.empty}>No tasks</li>}
          {tabs.map((tab) => {
            const isHidden = tab.screenPosition === null
            return (
              <li key={tab.id}>
                <button
                  className={`${styles.item} ${isHidden ? styles.hidden : styles.active}`}
                  onClick={() => (isHidden ? restoreTab(tab.id) : focusTab(tab.id))}
                >
                  <span className={styles.statusDot} />
                  <span className={styles.label}>{tab.label ?? tab.id}</span>
                  <span className={styles.state}>{isHidden ? "hidden" : "open"}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <button
        className={styles.button}
        aria-label="Toggle task manager"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <OverflowMenuHorizontal />
      </button>
    </div>
  )
}

export default TaskManagerDock
