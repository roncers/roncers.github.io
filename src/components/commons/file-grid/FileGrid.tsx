import styles from "./FileGrid.module.css"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { useTranslation } from "@/i18n/useTranslation"
import type { TabEntry, TabType } from "@/types/available-tabs.types"
import FileIcon from "@/components/icons/FileIcon"
import FolderIcon from "@/components/icons/FolderIcon"
import CodeIcon from "@/components/icons/CodeIcon"
import GlobeIcon from "@/components/icons/GlobeIcon"
import { useState } from "react"

function fromNumberToBytes(size: number) {
  const units = ["B", "KB", "MB", "GB", "TB"]
  let unitIndex = 0
  let sizeInUnits = size
  while (sizeInUnits >= 1024 && unitIndex < units.length - 1) {
    sizeInUnits /= 1024
    unitIndex++
  }
  const sizeValue = units[unitIndex] === "B" ? sizeInUnits : sizeInUnits.toFixed(2)
  return `${sizeValue} ${units[unitIndex]}`
}

function TabIcon({ type }: { type: TabType }) {
  switch (type) {
    case "File":
      return <FileIcon />
    case "Script":
      return <CodeIcon />
    case "Directory":
      return <FolderIcon />
    case "Link":
      return <GlobeIcon />
    default:
      return <FileIcon />
  }
}

export default function FileGrid({ links }: { links: TabEntry[] }) {
  const addTab = useAddTab()
  const { t } = useTranslation()
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  function setElementSelected(title: string) {
    setSelectedElement(title)
  }

  return (
    <nav data-name="links" className={styles.nav}>
      <ul className={styles["grid-table"]}>
        <li className={styles["grid-row"] + " " + styles["header-row"]}>
          <span
            className={
              styles["grid-cell"] +
              " " +
              styles["name-column"] +
              " " +
              styles["cell-header"]
            }
          >
            {t("table.name")}
          </span>
          <span
            className={
              styles["grid-cell"] +
              " " +
              styles["date-column"] +
              " " +
              styles["cell-header"]
            }
          >
            {t("table.modificationDate")}
          </span>
          <span
            className={
              styles["grid-cell"] +
              " " +
              styles["type-column"] +
              " " +
              styles["cell-header"]
            }
          >
            {t("table.type")}
          </span>
          <span
            className={
              styles["grid-cell"] +
              " " +
              styles["size-column"] +
              " " +
              styles["cell-header"]
            }
          >
            {t("table.size")}
          </span>
        </li>
        {links.map(({ label, loader, date, type, size }) => {
          const title = label.toLowerCase().replace(/\s+/g, "-")
          return (
            <li
              key={title}
              id={title}
              onDoubleClick={(e) => {
                e.preventDefault()
                loader().then((c) => addTab(c, title))
              }}
              onClick={() => setElementSelected(title)}
              className={styles["grid-row"] + (selectedElement === title ? " " + styles["element-selected"] : "")}
              style={{ "--_opacity-separator": "0.0" } as React.CSSProperties}
            >
              <span
                className={
                  styles["grid-cell"] +
                  " " +
                  styles["name-column"] +
                  " flex gap-2"
                }
              >
                <TabIcon type={type} />
                {label}
              </span>
              <span
                className={styles["grid-cell"] + " " + styles["date-column"]}
              >
                {date.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short", hour12: false })}
              </span>
              <span
                className={styles["grid-cell"] + " " + styles["type-column"]}
              >
                {type}
              </span>
              <span
                className={styles["grid-cell"] + " " + styles["size-column"]}
              >
                {fromNumberToBytes(size)}
              </span>
            </li>
          )
        })}
        {/* <li>
          <span
            onClick={(e) => {
              e.preventDefault()
              window.open("https://martin-roncero.com/uml-editor", "_blank")
            }}
          >
            UML Editor
          </span>
        </li>
        <li>
          <span
            onClick={(e) => {
              e.preventDefault()
              window.open(
                "https://martin-roncero.com/word-randomizer",
                "_blank",
              )
            }}
          >
            Phrase randomizer
          </span>
        </li>
        <li>
          <span
            onClick={(e) => {
              e.preventDefault()
              window.open("https://github.com/roncers", "_blank")
            }}
          >
            Github
          </span>
        </li> */}
      </ul>
    </nav>
  )
}
