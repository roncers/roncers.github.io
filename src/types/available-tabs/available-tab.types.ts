import type React from "react"
import type { TabComponentProps } from "@/types/reactive-tab.types"

export type TabLoader = () => Promise<React.ComponentType<TabComponentProps>>

export const TAB_TYPES = {
  FILE: "file",
  SCRIPT: "script",
  DIRECTORY: "directory",
  LINK: "link",
  VIDEO: "video",
  SHADER: "shader",
  IMAGE: "image",
} as const

export type VideoTabArgs = { es: string; en: string }

export type TabType = (typeof TAB_TYPES)[keyof typeof TAB_TYPES]

export type TabDefinition =
  | {
      loader: TabLoader
      i18key: string
      type: typeof TAB_TYPES.VIDEO
      date: Date
      size: number
      disabled?: boolean
      args: [VideoTabArgs]
    }
  | {
      loader: TabLoader
      i18key: string
      type: Exclude<TabType, typeof TAB_TYPES.VIDEO>
      date: Date
      size: number
      disabled?: boolean
      args?: Array<() => Promise<any>>
    }

export type TabEntry = TabDefinition & { label: string }