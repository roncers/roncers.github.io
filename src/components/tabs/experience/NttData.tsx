import type { TabComponentProps } from "@/types/internal-tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"

export default function EntryPointContent(props: TabComponentProps) {
  const { t } = useTranslation()

  return (
    <PoppingWindow {...props}>
    <section
      data-name="entry-point"
      className="data-container readable-content w-full h-full flex flex-col gap-4"
    >
      <section data-name="intro">
        <h2 className="default-header-1">{t("info.experience.nttData.title")}</h2>
        <h2 className="default-header-2 mt-1">{t("info.experience.nttData.period")}</h2>
        <p className="default-description mt-2">
          {t("info.experience.nttData.description")}
        </p>
      </section>
    </section>
    </PoppingWindow>
  )
}