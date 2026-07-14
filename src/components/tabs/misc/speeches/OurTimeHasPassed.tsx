import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import VideoRenderer from "@/components/commons/VideoRenderer"

export default function OurTimeHasPassed(props: TabComponentProps) {
    const { t } = useTranslation()

    return (
        <PoppingWindow {...props}>
            <VideoRenderer embedUrl="4IWN-6zBO2Q" title={t("info.miscellaneous.speeches.ourTimeHasPassed")} />
        </PoppingWindow>
    )
}