import FileGrid from "@/components/commons/file-grid/FileGrid"
import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { ENTRY_POINT_TABS } from "@/types/available-tabs.types.ts"
import { withTabStructure } from "../hocs/tabWithTable"

function EntryPointContent(_: TabComponentProps) {
  const { t } = useTranslation()
  const links = Object.values(ENTRY_POINT_TABS).map((tab) => ({
    label: t(tab.i18key),
    ...tab,
  }))

  return (
    <section
      data-name="entry-point"
      className="data-container w-full h-full flex flex-col gap-4"
    >
      <section data-name="intro">
        <h1 className="default-header-1">{t("info.entryPoint.header")}</h1>
        <p className="default-description">
          {t("info.entryPoint.description")}
        </p>
      </section>
      <FileGrid links={links} />
    </section>
  )
}

// Automatically wraps EntryPointContent with TableContextProvider and PoppingWindow
export default withTabStructure(EntryPointContent)