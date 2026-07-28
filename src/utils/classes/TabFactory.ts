import { Tab, TabComponentProps, SizeMode } from "@/types/internal-tab.types"
import { TabDefinition } from "@/types/available-tabs/available-tab.types"
import { ID_PREFIX } from "@/constants/general"

export default class TabFactory {
  constructor() {}

  private getRandomPosition({
    sizeX,
    sizeY,
    width,
    height,
  }: {
    sizeX: number
    sizeY: number
    width: number
    height: number
  }) {
    const top = Math.random() * ((height - sizeY) / height) * 100
    const left = Math.random() * ((width - sizeX) / width) * 100
    return { x: left, y: top }
  }

  private getSize(
    { width, height }: { width: number; height: number },
    mode: SizeMode,
  ) {
    switch (mode) {
      case "16:9": {
        const w = Math.min(500, width * 0.8, height * 0.8 * (16 / 9))
        return { sizeX: w, sizeY: w * (9 / 16) }
      }
      case "default":
      default: {
        const size = Math.min(400, width * 0.8, height * 0.8)
        return { sizeX: size, sizeY: size }
      }
    }
  }

  createTab(
    zIndex: number,
    content: React.ComponentType<TabComponentProps>,
    label: string,
    { height, width }: { height: number; width: number },
    sizeMode: SizeMode = "default",
    args?: TabDefinition["args"],
  ): Tab {
    const { sizeX, sizeY } = this.getSize({ height, width }, sizeMode)
    const screenPosition = this.getRandomPosition({
      sizeX,
      sizeY,
      width,
      height,
    })
    let idPrefix = ""
    // TODO: fix this if to adapt to changes automatically, maybe using i18n key instead of label inside tab, I think this would only affect the FileGrid component.
    if (label === "Mi info" || label === "My info") {
      idPrefix = ID_PREFIX
    }
    return {
      id: idPrefix + Math.random().toString(36).substring(2, 9),
      label,
      sizeX,
      sizeY,
      screenPosition,
      content: content,
      zIndex: zIndex,
      args: args,
    }
  }
}
