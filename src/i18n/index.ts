import en from "./locales/en"
import es from "./locales/es"
import type {
  InterpolationVars,
  Locale,
  Translation,
  TranslationKey,
} from "./types"

export const DEFAULT_LOCALE: Locale = "en"

export const translations: Record<Locale, Translation> = { en, es }

export const AVAILABLE_LOCALES = Object.keys(translations) as Locale[]

/**
 * Resolve a dot-notation key (e.g. "sketches.cell") against a translation object.
 * Falls back to the key itself if the path is missing.
 */
function resolve(dict: Translation, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>((acc, part) => (acc as Record<string, unknown>)?.[part], dict)

  return typeof value === "string" ? value : key
}

/**
 * Replace {{var}} placeholders with the provided values.
 */
function interpolate(template: string, vars?: InterpolationVars): string {
  if (!vars) return template
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{{${name}}}`
  )
}

/**
 * Translate a key for a given locale, with optional interpolation.
 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: InterpolationVars
): string {
  return interpolate(resolve(translations[locale], key), vars)
}

export type { Locale, TranslationKey, Translation, InterpolationVars }
