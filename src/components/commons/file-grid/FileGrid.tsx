import styles from "./FileGrid.module.css"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { useTranslation } from "@/i18n/useTranslation"
import type { TabEntry, TabType } from "@/types/available-tabs/commons.types"
import { use } from "react"
import { TAB_TYPES } from "@/types/available-tabs/tabs-index.types"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"
import { TableContext, SEMI_CLEAR_SUFFIX } from "@/components/stores/TableContextProvider"
import FileIcon from "@/components/icons/FileIcon"
import FolderIcon from "@/components/icons/FolderIcon"
import CodeIcon from "@/components/icons/CodeIcon"
import GlobeIcon from "@/components/icons/GlobeIcon"
import NvidiaIcon from "@/components/icons/NvidiaIcon"
import VideoIcon from "@/components/icons/VideoIcon"
import ImageIcon from "@/components/icons/ImageIcon"

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



function TabIcon({ type, ...rest }: { type: TabType }) {
  switch (type) {
    case TAB_TYPES.FILE:
      return <FileIcon {...rest} />
    case TAB_TYPES.SCRIPT:
      return <CodeIcon {...rest} />
    case TAB_TYPES.DIRECTORY:
      return <FolderIcon {...rest} />
    case TAB_TYPES.LINK:
      return <GlobeIcon {...rest} />
    case TAB_TYPES.SHADER:
      return <NvidiaIcon {...rest} />
    case TAB_TYPES.VIDEO:
      return <VideoIcon {...rest} />
    case TAB_TYPES.IMAGE:
      return <ImageIcon {...rest} />
    default:
      return <FileIcon {...rest} />
  }
}

function getTabSizeType(type: TabType) {
  switch (type) {
    case TAB_TYPES.VIDEO:
      return "16:9"
    default:
      return "default"
  }
}

export default function FileGrid({ links }: { links: TabEntry[] }) {
  const addTab = useAddTab()
  const { t } = useTranslation()
  const { isMobile } = use(UiWindowContext)
  const { selectedElement, selectElement } = use(TableContext)

  function performOperation(tab: TabEntry) {
    const { loader, args } = tab
    loader().then((c) => addTab(c, tab.label.toLowerCase().replace(/\s+/g, "-"), getTabSizeType(tab.type), args ?? []))
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
        {links.map((tab) => {
          const { label, date, type, size, disabled } = tab
          const title = label.toLowerCase().replace(/\s+/g, "-")
          return (
            <li
              key={title}
              id={title}
              onDoubleClick={(e) => {
                e.preventDefault()
                if (disabled) return
                performOperation(tab)
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (disabled) return
                selectElement(title)
                if (isMobile) {
                  performOperation(tab)
                }
              }}
              className={
                styles["grid-row"] +
                (selectedElement === title ? " " + styles["element-selected"] : "") +
                (selectedElement?.endsWith(title + SEMI_CLEAR_SUFFIX) ? " " + styles["element-semi-selected"] : "") +
                (disabled ? " " + styles["element-disabled"] : "")
              }
              style={{ "--_opacity-separator": "0.0" } as React.CSSProperties}
              title={disabled ? "working on it" : undefined}
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
                {/* TODO: MAYBE PICK UP LOCALE */}
                {date.toLocaleString("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
              <span
                className={styles["grid-cell"] + " " + styles["type-column"]}
              >
                {t(`table.types.${type}`)}
              </span>
              <span
                className={styles["grid-cell"] + " " + styles["size-column"]}
              >
                {fromNumberToBytes(size)}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
