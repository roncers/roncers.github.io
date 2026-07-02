import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import { useAddTab } from "@/utils/hooks/useAddTab"

export default function EntryPointContent(props: TabComponentProps) {
  const { t } = useTranslation()
  const addTab = useAddTab()

  return (
    <PoppingWindow {...props}>
      <section
        data-name="entry-point"
        className="data-container w-full h-full flex flex-col gap-4"
      >
        <section data-name="intro">
          <h1 className="default-header-1">
            {t("info.experience.indra.title")}
          </h1>
          <h2 className="default-header-2 mt-1">
            {t("info.experience.indra.period")}
          </h2>
          <p className="default-description mt-2">
            {t("info.experience.indra.description1")}
          </p>
          <p className="default-description mt-2">
            {t("info.experience.indra.description2")}
          </p>
          <p className="default-description mt-2">
            {t("info.experience.indra.description3")}
          </p>
          <div className="flex justify-center mt-2">
            <button
              className="default-button"
              onClick={() =>
                import("./IndraTasks").then((module) =>
                  addTab(module.default, "Indra Tasks"),
                )
              }
            >
              {t("info.experience.indra.tasksButton")}
            </button>
          </div>
        </section>
      </section>
    </PoppingWindow>
  )
}
