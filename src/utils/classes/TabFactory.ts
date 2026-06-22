import { Tab, TabComponentProps } from "@/types/tab.types"
export default class TabFactory {
  constructor() {}

  private getRandomPosition() {
    const top = Math.random() * 60
    const left = Math.random() * 75
    return { x: left, y: top }
  }

  // maybe depending on the screen size, so this class should pick up the screen size as reactive attrs
  private getSizeX(content: React.ComponentType<TabComponentProps>) {
    // TODO: implement logic to determine size based on content
    return 400
  }

  private getSizeY(content: React.ComponentType<TabComponentProps>) {
    // TODO: implement logic to determine size based on content
    return 400
  }

  createTab(
    zIndex: number,
    content: React.ComponentType<TabComponentProps>,
    label?: string,
  ): Tab {
    return {
      id: Math.random().toString(36).substring(2, 9),
      label,
      sizeX: this.getSizeX(content),
      sizeY: this.getSizeY(content),
      screenPosition: this.getRandomPosition(),
      content: content,
      zIndex: zIndex,
    }
  }
}
