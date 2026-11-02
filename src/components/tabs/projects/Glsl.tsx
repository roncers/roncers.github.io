import FileGrid from "@/components/commons/file-grid/FileGrid";
import type { TabComponentProps } from "@/types/internal-tab.types";
import { useTranslation } from "@/i18n/useTranslation";
import { GLSL_TABS } from "@/types/available-tabs/tabs-index.types";
import { withTabStructure } from "../hocs/tabWithTable";

function CreativeCodingContent(_: TabComponentProps) {
  const { t } = useTranslation();
  const glslLinks = Object.values(GLSL_TABS).map((tab) => ({
    label: t(tab.i18key),
    ...tab,
  }));

  return (
    <section
      data-name="entry-point"
      className="data-container w-full h-full flex flex-col gap-4"
    >
      <section data-name="glsl">
        <h2 className="default-header-1">{t("creativeCoding.glsl.title")}</h2>
      </section>
      <FileGrid links={glslLinks} />
    </section>
  );
}

export default withTabStructure(CreativeCodingContent);
