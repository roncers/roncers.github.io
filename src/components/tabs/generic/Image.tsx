// This generic component expect to receive as first parameter the Promise to a image url in the args[0]

import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import { TabComponentProps } from "@/types/tab.types"
import { useEffect, useState } from "react"
import { useTranslation } from "@/i18n/useTranslation"
import styles from "./Image.module.css"

export default function GenericImage({ args, ...props }: TabComponentProps) {
  const { t } = useTranslation()
  const [src, setSrc] = useState<string | null>(null)
  const [breakAspectRatio, setBreakAspectRatio] = useState(false)
  useEffect(() => {
    async function getSrc() {
      const ans = await args![0]()
      const src = ans.default ?? ans
      setSrc(src)
    }
    getSrc()
  }, [args])
  if (!src) {
    return <PoppingWindow {...props}>
      <div className="w-full h-full flex items-center justify-center">Loading...</div>
    </PoppingWindow>
  }
  return <PoppingWindow {...props}>
    <div className={`w-full h-full flex flex-col gap-1 default-padding ${styles.container}`}>
      <div className="flex items-center justify-between">
        <label className="default-label">{props.label}</label>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={breakAspectRatio} onChange={() => setBreakAspectRatio(!breakAspectRatio)} className="toggle-switch"/>
          {breakAspectRatio ? (
            <label className={`default-label ${styles.tag}`}>{t("info.miscellaneous.gallery.fixAspectRatio")}</label>
          ) : (
            <label className={`default-label ${styles.tag}`}>{t("info.miscellaneous.gallery.breakAspectRatio")}</label>
          )}
        </div>
      </div>
      <div className="w-full h-full overflow-hidden flex items-center justify-center default-border">
        <img src={src} alt="" className={`w-full h-full ${breakAspectRatio ? '' : 'object-contain'}`} />
      </div>
    </div>
  </PoppingWindow>
}