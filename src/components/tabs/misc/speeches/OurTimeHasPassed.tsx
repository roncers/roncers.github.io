import type { TabComponentProps } from "@/types/tab.types"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import VideoRenderer from "@/components/commons/VideoRenderer"
// TODO: Pause the video immediately when closing the tab.
export default function OurTimeHasPassed(props: TabComponentProps) {
    return (
        <PoppingWindow {...props}>
            <VideoRenderer embedUrl="4IWN-6zBO2Q" title="Our Time Has Passed" />
        </PoppingWindow>
    )
}