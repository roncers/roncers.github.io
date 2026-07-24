import { ReactElement, use, useEffect } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { HELPER_TABS, ENTRY_POINT_TABS } from "@/types/available-tabs/tabs-index.types"
import { useTranslation } from "@/i18n/useTranslation"
import Router from '@/utils/classes/Router'
import type { TabDefinition } from "@/types/available-tabs/available-tab.types"

const FIRST_RENDER_DELAY = 2000

function TabRenderer(): ReactElement {
  const { tabs } = use(TaskManagerContext)
  const addTab = useAddTab()
  const availableTabs = tabs.filter((tab) => tab.screenPosition !== null)
  const { t } = useTranslation()
  let tabToLoad: TabDefinition = HELPER_TABS.ENTRY_POINT

  useEffect(() => {
    const router = new Router()
    router.get('?projects', () => {
      tabToLoad = ENTRY_POINT_TABS.MY_PROJECTS
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.hash
      )
    })
    router.init()
    const timeout = setTimeout(() => {
      tabToLoad.loader().then((EntryPoint) => {
        addTab(EntryPoint, t(tabToLoad.i18key))
      })
    }, FIRST_RENDER_DELAY)

    return () => clearTimeout(timeout)
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
