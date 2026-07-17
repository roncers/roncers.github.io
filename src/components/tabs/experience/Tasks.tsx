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
      <section data-name="intro">
        <h2 className="default-header-1">{t("info.experience.indra.title")}</h2>
        <h2 className="default-header-2">{t("info.experience.indra.period")}</h2>
        <p className="default-description">
          {t("info.experience.indra.description")}
        </p>
      </section>
    </section>
    </PoppingWindow>
  )
}