import { ReactElement, use } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import styles from "./TaskManagerDock.module.css"
import { OverflowMenuHorizontal } from "../icons/OverflowHIcon"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { HELPER_TABS } from "@/types/available-tabs/tabs-index.types"
import { useTranslation } from "@/i18n/useTranslation"

function TaskManagerDock(): ReactElement {
  // const { tabs, setTabPosition, incrementTabZIndex } = use(TaskManagerContext)
  const { tabs, maximizedTabs } = use(TaskManagerContext)
  const addTab = useAddTab()
  const { t } = useTranslation()

  const entryClosed = !tabs.find((tab) => tab.label === t(HELPER_TABS.ENTRY_POINT.i18key))
  const someFullScreen = maximizedTabs > 0
  const buttonHidden =
    !entryClosed || someFullScreen

  return (
    <div className={`${styles.dock} ${buttonHidden ? styles.hidden : ""}`}>
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
