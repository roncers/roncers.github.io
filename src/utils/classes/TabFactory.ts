import { Tab, TabComponentProps } from "@/types/tab.types"

export default class TabFactory {
  constructor() {}

  private getRandomPosition({sizeX, sizeY, width, height}: {sizeX: number, sizeY: number, width: number, height: number}) {
    const top = Math.random() * ((height - sizeY) / height) * 100
    const left = Math.random() * ((width - sizeX) / width) * 100
    return { x: left, y: top }
  }

  // maybe depending on the screen size, so this class should pick up the screen size as reactive attrs
  private getSizeX(width: number) {
    return Math.min(400, width * 0.8)
  }

  private getSizeY(height: number) {
    return Math.min(400, height * 0.8)
  }

  createTab(
    zIndex: number,
    content: React.ComponentType<TabComponentProps>,
    label: string,
    {height, width}: {height: number, width: number}
  ): Tab {
    const sizeX = this.getSizeX(width)
    const sizeY = this.getSizeY(height)
    const screenPosition = this.getRandomPosition({sizeX, sizeY, width, height})
    return {
      id: Math.random().toString(36).substring(2, 9),
      label,
      sizeX,
      sizeY,
      screenPosition,
      content: content,
      zIndex: zIndex,
    }
  }
}
