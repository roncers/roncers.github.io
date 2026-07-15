import FileGrid from "@/components/commons/file-grid/FileGrid"
import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { MY_TEXTS_TABS } from "@/types/available-tabs/tabs-index.types"
import { withTabStructure } from "@/components/tabs/hocs/tabWithTable"

function Gallery(_: TabComponentProps) {
  const { t } = useTranslation()
  const links = Object.values(MY_TEXTS_TABS).map((tab) => ({
    label: t(tab.i18key),
    ...tab,
  }))

  return (
    <section
      data-name="gallery"
      className="data-container w-full h-full flex flex-col gap-4"
    >
      <section data-name="intro">
        <h1 className="default-header-1">{t("info.miscellaneous.gallery.title")}</h1>
        <p className="default-description mt-1">{t("info.miscellaneous.gallery.description")}</p>
      </section>
      <FileGrid links={links} />
    </section>
  )
}

export default withTabStructure(Gallery)