import { useState, useEffect, memo } from "react"
import { motion } from "framer-motion"

import type { TabComponentProps } from "@/types/internal-tab.types"
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
import { Npm } from "@/components/icons/my-technologies/NPMIcon"

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
  { icon: Npm, label: "NPM" },
]

function shuffle<T>(array: T[]): T[] {
  let shuffled: T[]

  do {
    shuffled = [...array]

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
  } while (shuffled.some((item, index) => item === array[index]))

  return shuffled
}

function rotateForward<T>(array: T[]): T[] {
  if (array.length < 2) return [...array]

  return [array[array.length - 1], ...array.slice(0, -1)]
}

const TechnologiesGrid = memo(function TechnologiesGrid() {
  const { t } = useTranslation()
  const [icons, setIcons] = useState(TECH_ICONS)

  useEffect(() => {
    const interval = setInterval(() => {
      setIcons(rotateForward)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="data-container w-full flex flex-col gap-4">
        <section className="flex items-center justify-between">
          <h2 className="default-header-1">
            {t("info.technologies.title")}
          </h2>
        </section>

        <section className="grid grid-cols-auto-fill gap-4 mt-2">
          {icons.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              layout
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                },
              }}
              className="flex flex-col items-center gap-2"
            >
              <Icon className="w-12 h-12" />
              <span className="text-sm">{label}</span>
            </motion.div>
          ))}
        </section>
      </section>
      <section className="flex justify-center">
        <button
          onClick={() => setIcons(shuffle)}
          className="default-button mb-4"
        >
          {t("info.technologies.randomize")}
        </button>
      </section>
    </>
  )
})

export default function EntryPointContent(props: TabComponentProps) {
  return (
    <PoppingWindow {...props}>
      <TechnologiesGrid />
    </PoppingWindow>
  )
}