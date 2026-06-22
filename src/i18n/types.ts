import type en from "./locales/en"

// Recursively widen string-literal leaves to `string` so other locales
// only need to match the *shape* of the base locale, not its exact values.
export type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>
}

// The canonical translation shape, derived from the `en` base locale.
export type Translation = DeepString<typeof en>

// Dot-notation union of every leaf key, e.g. "sketches.cell" | "window.close".
export type TranslationKey<T = typeof en, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : TranslationKey<T[K], `${Prefix}${K}.`>
}[keyof T & string]

export type Locale = "en" | "es"

export type InterpolationVars = Record<string, string | number>
