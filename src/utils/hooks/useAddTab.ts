import { useCallback } from "react"
import { use } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import TabFactory from "@/utils/classes/TabFactory"
import type { TabComponentProps, SizeMode } from "@/types/reactive-tab.types"
import type { TabDefinition } from "@/types/available-tabs/available-tab.types"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"
const factory = new TabFactory()

export function useAddTab() {
  const { maxZ, incrementMaxZ, addTab } = use(TaskManagerContext)
  const { height, width } = use(UiWindowContext)

  return useCallback((content: React.ComponentType<TabComponentProps>, label: string, sizeMode: SizeMode = 'default', args: TabDefinition['args'] = []) => {
    const tab = factory.createTab(maxZ, content, label, {height, width}, sizeMode, args)
    incrementMaxZ()
    addTab(tab)
  }, [maxZ, incrementMaxZ, addTab])
}