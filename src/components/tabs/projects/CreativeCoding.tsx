import FileGrid from "@/components/commons/file-grid/FileGrid"
import type { TabComponentProps } from "@/types/internal-tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { CREATIVE_CODING_TABS } from "@/types/available-tabs/tabs-index.types"
import { withTabStructure } from "../hocs/tabWithTable"

function CreativeCodingContent(_: TabComponentProps) {
    const { t } = useTranslation()
    const creativeCodingLinks = Object.values(CREATIVE_CODING_TABS).map((tab) => ({
        label: t(tab.i18key),
        ...tab,
    }))

    return (
        <section
            data-name="entry-point"
            className="data-container w-full h-full flex flex-col gap-4"
        >
            <section data-name="p5">
                <h2 className="default-header-1">{t("info.projects.creativeCoding")}</h2>
            </section>
            <FileGrid links={creativeCodingLinks} />
        </section>
    )
}

export default withTabStructure(CreativeCodingContent)