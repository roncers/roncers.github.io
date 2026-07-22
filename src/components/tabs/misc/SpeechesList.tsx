import FileGrid from "@/components/commons/file-grid/FileGrid"
import type { TabComponentProps } from "@/types/internal-tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { SPEECHES_TABS } from "@/types/available-tabs/tabs-index.types"
import { withTabStructure } from "@/components/tabs/hocs/tabWithTable"

function SpeechesList(_: TabComponentProps) {
  const { t } = useTranslation()
  const links = Object.values(SPEECHES_TABS).map((tab) => ({
    label: t(tab.i18key),
    ...tab,
  }))

  return (
    <section
      data-name="speeches-list"
      className="data-container w-full h-full flex flex-col gap-4"
    >
      <section data-name="intro">
        <h2 className="default-header-1">{t("info.miscellaneous.speeches.title")}</h2>
        <p className="default-description mt-1">{t("info.miscellaneous.speeches.description")}</p>
      </section>
      <FileGrid links={links} />
    </section>
  )
}

export default withTabStructure(SpeechesList)