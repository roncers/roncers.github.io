import FileGrid from "@/components/commons/file-grid/FileGrid"
import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { EXPERIENCE_TABS } from "@/types/available-tabs/tabs-index.types"
import { withTabStructure } from "../hocs/tabWithTable"

function MyExperienceContent(_: TabComponentProps) {
  const { t } = useTranslation()
  const links = Object.values(EXPERIENCE_TABS).map((tab) => ({
    label: t(tab.i18key),
    ...tab,
  }))

  return (
    <section
      data-name="entry-point"
      className="data-container w-full h-full flex flex-col gap-4"
    >
      <section data-name="intro">
        <h2 className="default-header-1">{t("info.experience.title")}</h2>
      </section>
      <FileGrid links={links} />
    </section>
  )
}

export default withTabStructure(MyExperienceContent)