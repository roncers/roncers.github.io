import { ReactElement, use, useEffect } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { HELPER_TABS } from "@/types/available-tabs/tabs-index.types"
import { useTranslation } from "@/i18n/useTranslation"

const FIRST_RENDER_DELAY = 1000

function TabRenderer(): ReactElement {
  const { tabs } = use(TaskManagerContext)
  const addTab = useAddTab()
  const availableTabs = tabs.filter((tab) => tab.screenPosition !== null)
  const { t } = useTranslation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      import("@/components/tabs/main/EntryPoint").then(
        ({ default: EntryPoint }) => {
          addTab(EntryPoint, t(HELPER_TABS.ENTRY_POINT.i18key))
        },
      )
    }, FIRST_RENDER_DELAY)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {availableTabs.map(({ content: Content, ...tab }) => (
        <Content key={tab.id} {...tab} />
      ))}
    </>
  )
}

export default TabRenderer
