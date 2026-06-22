import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/tab.types"
import { useAddTab } from "@/utils/hooks/useAddTab"
import CellSketch from "../p5/CellSketch"
import LavaSketch from "../p5/LavaSketch"
import KaleidoscopeSketch from "../p5/KaleidoscopeSketch"
import MyCv from "./MyCv"

import { useTranslation } from "@/i18n/useTranslation"

export default function EntryPoint({ ...props }: TabComponentProps) {
  const createTab = useAddTab()
  const { t } = useTranslation()
  const links = [
    { label: t('sketches.cell'), component: CellSketch, title: 'cell p5' },
    { label: t('info.title'), component: MyCv, title: 'my cv' },
    { label: 'lava p5', component: LavaSketch, title: 'lava p5' },
    { label: 'kaleidoscope p5', component: KaleidoscopeSketch, title: 'kaleidoscope p5' },
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
            {links.map(({ label, component, title }) => (
              <li key={title}>
                <a onClick={(e) => { e.preventDefault(); createTab(component, title) }}>
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