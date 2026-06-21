import { ReactElement, use, useEffect, useRef } from "react"
import { TaskManagerContext } from "@/components/stores/TaskManagerProvider"
import CellSketch from "@/components/tabs/p5/CellSketch"
import LavaSketch from "@/components/tabs/p5/LavaSketch"
import TabFactory from "@/utils/classes/TabFactory"

const FIRST_RENDER_DELAY = 1000

function TabRenderer(): ReactElement {
    const { tabs, maxZ, setTabs, incrementMaxZ } = use(TaskManagerContext)
    const tabFactoryRef = useRef<TabFactory>(new TabFactory())
    const availableTabs = tabs.filter(tab => tab.screenPosition)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const tabFactory = tabFactoryRef.current
            const tab1 = tabFactory.createTab(maxZ, CellSketch)
            incrementMaxZ()
            const tab2 = tabFactory.createTab(maxZ, LavaSketch)
            incrementMaxZ()
            setTabs([
                tab1,
                tab2
            ])
        }, FIRST_RENDER_DELAY)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {availableTabs.map(({ content: Content, ...tab }) => (
                <Content key={tab.id} {...tab} />
            ))}
        </>
    )
}

export default TabRenderer

