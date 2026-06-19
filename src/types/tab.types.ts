export type TabComponentProps = {
  id: string
  sizeX: number
  sizeY: number
  screenPosition: { x: number; y: number } | null
  zIndex: number
}

export type Tab = TabComponentProps & {
  content: React.ComponentType<TabComponentProps>
}