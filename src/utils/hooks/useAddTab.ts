import { useCallback } from "react"
import { use } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import TabFactory from "../classes/TabFactory"
import type { TabComponentProps, SizeMode } from "@/types/tab.types"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"
const factory = new TabFactory()

export function useAddTab() {
  const { maxZ, incrementMaxZ, addTab } = use(TaskManagerContext)
  const { height, width } = use(UiWindowContext)

  return useCallback((content: React.ComponentType<TabComponentProps>, label: string, sizeMode: SizeMode = 'default') => {
    const tab = factory.createTab(maxZ, content, label, {height, width}, sizeMode)
    incrementMaxZ()
    addTab(tab)
  }, [maxZ, incrementMaxZ, addTab])
}