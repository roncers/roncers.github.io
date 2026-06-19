import { Tab } from "@/types/tab.types"
export default class TabFactory {

    constructor() {}

    private getRandomPosition() {
        const top = Math.floor(Math.random() * 80) + 10
        const left = Math.floor(Math.random() * 80) + 10
        return { x: left, y: top }
    }

    createTab(zIndex: number, content: () => React.ReactNode): Tab {
        return {
            id: Math.random().toString(36).substring(2, 9),
            sizeX: 400,
            sizeY: 400,
            screenPosition: this.getRandomPosition(),
            content: content,
            zIndex: zIndex
        }
    }
}