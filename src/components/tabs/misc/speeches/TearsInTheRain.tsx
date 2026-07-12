import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import VideoRenderer from "@/components/commons/VideoRenderer"

export default function TearsInTheRain(props: TabComponentProps) {
    const { t } = useTranslation()

    return (
        <PoppingWindow {...props}>
            <VideoRenderer embedUrl="HU7Ga7qTLDU" title={t("info.miscellaneous.speeches.tearsIntheRain")} />
        </PoppingWindow>
    )
}