import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/reactive-tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { useEffect, useState } from "react"

const CV_PATH = "/src/assets/cv"

const cvModules = import.meta.glob<string>(`/src/assets/cv/*.pdf`, {
  eager: false,
  import: "default",
  query: "?url",
})

export default function EntryPoint({ ...props }: TabComponentProps) {
  const { locale } = useTranslation()
  const [cvUrl, setCvUrl] = useState<string | null>(null)

  useEffect(() => {
    const loader = cvModules[`${CV_PATH}/${locale}.pdf`]
    if (!loader) return
    loader().then((url) => setCvUrl(url))
  }, [locale])

  return (
    <PoppingWindow {...props}>
      {cvUrl && <iframe src={cvUrl} width="100%" height="100%" />}
    </PoppingWindow>
  )
}