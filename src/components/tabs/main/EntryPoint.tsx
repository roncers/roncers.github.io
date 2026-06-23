import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/tab.types"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { useTranslation } from "@/i18n/useTranslation"

export default function EntryPoint({ ...props }: TabComponentProps) {
  const createTab = useAddTab()
  const { t } = useTranslation()
  const links = [
    { label: t('sketches.cell'), loader: () => import("../p5/CellSketch"), title: 'cell p5' },
    { label: t('info.title'), loader: () => import("./MyCv"), title: 'my cv' },
    { label: 'lava p5', loader: () => import("../p5/LavaSketch"), title: 'lava p5' },
    { label: 'kaleidoscope p5', loader: () => import("../p5/KaleidoscopeSketch"), title: 'kaleidoscope p5' },
  ];

  return (
    <PoppingWindow {...props}>
      <section data-name="entry-point" className="data-container flex flex-col gap-4">
        <section data-name="intro">
          <h1 className="default-header-1">{t('info.entryPoint.header')}</h1>
          <p className="default-description">{t('info.entryPoint.description')}</p>
        </section>

        <h2 className="default-header-2">{t('info.entryPoint.linksDescription')}</h2>
        <nav data-name="links">
          <ul>
            {links.map(({ label, loader, title }) => (
              <li key={title}>
                <a onClick={(e) => { e.preventDefault(); loader().then(({ default: c }) => createTab(c, title)) }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </PoppingWindow>
  )
}