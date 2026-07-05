import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import { Css } from "@/components/icons/my-technologies/CSSIcon"
import { Git } from "@/components/icons/my-technologies/GitIcon"
import { Html } from "@/components/icons/my-technologies/HTMLIcon"
import { Java } from "@/components/icons/my-technologies/JavaIcon"
import { Javascript } from "@/components/icons/my-technologies/JavaScriptIcon"
import { React } from "@/components/icons/my-technologies/ReactIcon"
import { Sass } from "@/components/icons/my-technologies/SassIcon"
import { Typescript } from "@/components/icons/my-technologies/TypeScriptIcon"
import { Vue } from "@/components/icons/my-technologies/VueIcon"
import { Vitejs } from "@/components/icons/my-technologies/ViteIcon"

const TECH_ICONS = [
  { icon: Javascript, label: "JavaScript" },
  { icon: Html, label: "HTML" },
  { icon: Css, label: "CSS" },
  { icon: Vue, label: "Vue" },
  { icon: React, label: "React" },
  { icon: Git, label: "Git" },
  { icon: Typescript, label: "TypeScript" },
  { icon: Sass, label: "Sass" },
  { icon: Vitejs, label: "Vite" },
  { icon: Java, label: "Java" },
]

export default function EntryPointContent(props: TabComponentProps) {
  const { t } = useTranslation()

  return (
    <PoppingWindow {...props}>
    <section
      data-name="entry-point"
      className="data-container w-full h-full flex flex-col gap-4"
    >
      <section data-name="intro">
        <h1 className="default-header-1">{t("info.technologies.title")}</h1>
      </section>
      <section data-name="technologies-grid" className="grid grid-cols-auto-fill gap-4 mt-2">
        {TECH_ICONS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon className="w-12 h-12" />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </section>
    </section>
    </PoppingWindow>
  )
}