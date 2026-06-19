import { ReactElement, use, useEffect } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import CellSketch from "@/components/tabs/p5/CellSketch"
import LavaSketch from "@/components/tabs/p5/LavaSketch"

function getRandomPosition() {
  const top = Math.floor(Math.random() * 80) + 10
  const left = Math.floor(Math.random() * 80) + 10
  return { x: top, y: left }
}

function TabRenderer(): ReactElement {
    const { tabs, setTabs } = use(TaskManagerContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTabs([
                {
                    id: "1",
                    sizeX: 400,
                    sizeY: 400,
                    screenPosition: getRandomPosition(),
                    zIndex: 1,
                    content: CellSketch,
                },
                {
                    id: "2",
                    sizeX: 400,
                    sizeY: 400,
                    screenPosition: getRandomPosition(),
                    zIndex: 2,
                    content: LavaSketch,
                },
            ])
        }, 1000)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {tabs.map(({ content: Content, ...tab }) => (
                <Content key={tab.id} {...tab} />
            ))}
        </>
    )
}

export default TabRenderer

