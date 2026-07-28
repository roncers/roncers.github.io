import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import {
  DEFAULT_LOCALE,
  translate,
  type InterpolationVars,
  type Locale,
  type TranslationKey,
} from "@/i18n"

const STORAGE_KEY = "locale"

interface TranslationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, vars?: InterpolationVars) => string
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
  if (stored) return stored
  const browser = window.navigator.language.split("-")[0]
  return browser === "es" ? "es" : DEFAULT_LOCALE
}

export const TranslationContext = createContext<TranslationContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
})

export default function TranslationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    // TODO communicate with the taskmaanagerProvider to id the language of all tabs
  }, [locale])

  const t = useCallback(
    (key: TranslationKey, vars?: InterpolationVars) => translate(locale, key, vars),
    [locale]
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}
