import type { TabComponentProps } from "@/types/internal-tab.types"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import VideoRenderer from "@/components/commons/VideoRenderer"
import { useEffect, useState } from "react"
import { useTranslation } from "@/i18n/useTranslation"
import type { VideoTabArgs } from "@/types/available-tabs/available-tab.types"

export default function Video(props: TabComponentProps) {
  const { locale } = useTranslation()
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    const videoArgs = props.args?.[0] as VideoTabArgs | undefined
    if (videoArgs) {
      setVideoUrl(videoArgs[locale])
    } else {
      throw new Error('Invalid Args passed to the Video Renderer.')
    }
  }, [locale])

  if (!videoUrl) return null

  return (
    <PoppingWindow {...props}>
      <VideoRenderer embedUrl={videoUrl} title={props.label!} />
    </PoppingWindow>
  )
}
