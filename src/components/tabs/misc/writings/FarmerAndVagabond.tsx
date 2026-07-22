import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"

export default function EntryPointContent(props: TabComponentProps) {
  const { t } = useTranslation()

  return (
    <PoppingWindow {...props}>
      <section
        data-name="entry-point"
        className="data-container w-full h-full flex flex-col gap-4"
      >
        <section data-name="intro" className="readable-content">
          <h2 className="default-header-1">
            {t("info.miscellaneous.myTexts.farmerAndVagabond.title")}
          </h2>
          <p className="default-description mt-2" style={{ whiteSpace: "pre-wrap" }}>
            {t("info.miscellaneous.myTexts.farmerAndVagabond.story")}
          </p>
        </section>
      </section>
    </PoppingWindow>
  )
}
