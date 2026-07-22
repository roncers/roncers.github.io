import type { TabLoader } from "@/types/available-tabs/available-tab.types"

export function loadPage(url: string): TabLoader {
  return () => {
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    a.click()
    return Promise.resolve(() => null)
  }
}