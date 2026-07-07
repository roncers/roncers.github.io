import type { TabComponentProps } from "@/types/tab.types"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
// TODO: create a video embedder for reutilization purposes.
export default function TearsInTheRain(props: TabComponentProps) {
    return (
        <PoppingWindow {...props}>
            <iframe
                style={{ display: "block", border: "none", width: "100%", height: "100%" }}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/HU7Ga7qTLDU?autoplay=1&controls=0"
                title="Tears in the Rain"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
        </PoppingWindow>
    )
}