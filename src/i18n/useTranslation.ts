import { useContext } from "react"
import { TranslationContext } from "@/components/stores/TranslationProvider"

export function useTranslation() {
  return useContext(TranslationContext)
}
