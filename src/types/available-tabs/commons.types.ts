import type React from "react"
import type { TabComponentProps } from "@/types/tab.types"

export type TabLoader = () => Promise<React.ComponentType<TabComponentProps>>

export const TAB_TYPES = {
  FILE: "file",
  SCRIPT: "script",
  DIRECTORY: "directory",
  LINK: "link",
  VIDEO: "video",
} as const

export type TabType = (typeof TAB_TYPES)[keyof typeof TAB_TYPES]

export type TabDefinition = {
  loader: TabLoader
  i18key: string
  type: TabType
  date: Date
  size: number
  disabled?: boolean
}

export type TabEntry = TabDefinition & { label: string }

export function linkLoader(url: string): TabLoader {
  return () => {
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    a.click()
    return Promise.resolve(() => null)
  }
}
