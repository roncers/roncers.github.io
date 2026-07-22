import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import TabCanvas from "@/components/commons/TabCanvas";
import { useEffect, useState } from "react"
import type { TabComponentProps } from "@/types/internal-tab.types";

export default function P5TabCanvas({ args, ...props }: TabComponentProps) {
    const [sketch, setSketch] = useState<any>(null)
    useEffect(() => {
        (async () => {
            const sketchCode = await args![0]()
            setSketch(() => sketchCode)
        })()
    }, [args])
    return (
        <PoppingWindow {...props}>
            {sketch === null ? (
                <div className="w-full h-full flex items-center justify-center">Loading...</div>
            ) : (
                <TabCanvas sketch={sketch} label={props.label!} />
            )}
        </PoppingWindow>
    )
}