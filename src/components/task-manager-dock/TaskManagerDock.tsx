import { ReactElement, use } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import styles from "./TaskManagerDock.module.css"
import { OverflowMenuHorizontal } from "../icons/OverflowHIcon"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { HELPER_TABS } from "@/types/available-tabs/tabs-index.types"
import { useTranslation } from "@/i18n/useTranslation"

function TaskManagerDock(): ReactElement {
  const { tabs, setTabPosition, incrementTabZIndex } = use(TaskManagerContext)
  const addTab = useAddTab()
  const { t } = useTranslation()

  function focusTab(id: string) {
    incrementTabZIndex(id)
  }

  function restoreTab(id: string) {
    setTabPosition(id, { x: 30, y: 30 })
    focusTab(id)
  }

  console.log(restoreTab)

  const noTabs = tabs.length === 0

  return (
    <div className={`${styles.dock} ${noTabs ? "" : styles.hidden}`}>
      <button
        className={styles.button}
        aria-label="Toggle task manager"
        aria-expanded={false}
        onClick={() => {
          HELPER_TABS.ENTRY_POINT.loader().then((e) =>
            addTab(e, t(HELPER_TABS.ENTRY_POINT.i18key)),
          )
        }}
      >
        <OverflowMenuHorizontal />
      </button>
    </div>
  )
}

export default TaskManagerDock
