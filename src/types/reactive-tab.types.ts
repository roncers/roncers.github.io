import { TabDefinition } from "./available-tabs/available-tab.types"

export type TabComponentProps = {
  id: string
  label?: string
  sizeX: number
  sizeY: number
  screenPosition: { x: number; y: number } | null
  zIndex: number
  prevX?: number
  prevY?: number
  prevPosition?: { x: number; y: number } | null
  fadingOut?: true
  args?: TabDefinition['args']
}

// why is this content added?
export type Tab = TabComponentProps & {
  content: React.ComponentType<TabComponentProps>
}

export type SizeMode = 'default' | '16:9'