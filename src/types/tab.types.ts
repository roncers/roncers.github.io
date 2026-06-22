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
}

export type Tab = TabComponentProps & {
  content: React.ComponentType<TabComponentProps>
}