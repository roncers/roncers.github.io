import type { TabComponentProps } from "@/types/tab.types"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import VideoRenderer from "@/components/commons/VideoRenderer"
// TODO: Pause the video immediately when closing the tab.
export default function TearsInTheRain(props: TabComponentProps) {
    return (
        <PoppingWindow {...props}>
            <VideoRenderer embedUrl="HU7Ga7qTLDU" title="Tears in the Rain" />
        </PoppingWindow>
    )
}