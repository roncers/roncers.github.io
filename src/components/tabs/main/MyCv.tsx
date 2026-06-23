import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/tab.types"
import cv from "@/assets/cv/es.pdf"

// import { useTranslation } from "@/i18n/useTranslation"

export default function EntryPoint({ ...props }: TabComponentProps) {
//   const { t } = useTranslation()
  return (
    <PoppingWindow {...props}>
        <iframe src={cv} width="100%" height="100%" onClick={() => console.log('hello')} />
    </PoppingWindow>
  )
}