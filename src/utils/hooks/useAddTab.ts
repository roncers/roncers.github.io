import { useCallback } from "react"
import { use } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import TabFactory from "../classes/TabFactory"
import type { TabComponentProps } from "@/types/tab.types"

const factory = new TabFactory()

export function useAddTab() {
  const { maxZ, incrementMaxZ, addTab } = use(TaskManagerContext)

  return useCallback((content: React.ComponentType<TabComponentProps>, label?: string) => {
    const tab = factory.createTab(maxZ, content, label)
    incrementMaxZ()
    addTab(tab)
  }, [maxZ, incrementMaxZ, addTab])
}