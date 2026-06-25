import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import FileGrid from "@/components/commons/file-grid/FileGrid"
import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { ENTRY_POINT_TABS } from "@/types/available-tabs.types.ts"
import TableContextProvider, { TableContext } from "@/components/stores/TableContextProvider"
import { use } from "react"

function EntryPointContent(props: TabComponentProps) {
  const { semiClearSelection } = use(TableContext)
  const { t } = useTranslation()
  const links = Object.values(ENTRY_POINT_TABS).map((tab) => ({
    label: t(tab.i18key),
    ...tab,
  }))

  return (
    <PoppingWindow {...props} onSemiClear={semiClearSelection}>
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

        {/* <h2 className="default-header-2">{t('info.entryPoint.linksDescription')}</h2> */}
        <FileGrid links={links} />
      </section>
    </PoppingWindow>
  )
}

export default function EntryPoint({ ...props }: TabComponentProps) {
  return (
    <TableContextProvider>
      <EntryPointContent {...props} />
    </TableContextProvider>
  )
}
