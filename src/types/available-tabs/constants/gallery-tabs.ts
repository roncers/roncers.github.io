import { TAB_TYPES, type TabDefinition } from "../commons.types"

export const GALLERY_TABS = {
  ME: {
    loader: () => import("@/components/tabs/generic/Image").then((m) => m.default),
    args: [() => import("@/assets/images/me.jpg").then((m) => m.default)],
    i18key: "info.miscellaneous.gallery.me",
    type: TAB_TYPES.IMAGE,
    date: new Date("2024-08-26 01:14"),
    size: 1004773,
  },
  KEBAB_PLACE: {
    loader: () => import("@/components/tabs/generic/Image").then((m) => m.default),
    args: [() => import("@/assets/images/kebab-place.jpg").then((m) => m.default)],
    i18key: "info.miscellaneous.gallery.kebabPlace",
    type: TAB_TYPES.IMAGE,
    date: new Date("2026-07-03 21:56"),
    size: 1033482,
  },
  DEATH_BEACH: {
    loader: () => import("@/components/tabs/generic/Image").then((m) => m.default),
    args: [() => import("@/assets/images/death-beach.jpg").then((m) => m.default)],
    i18key: "info.miscellaneous.gallery.deathBeach",
    type: TAB_TYPES.IMAGE,
    date: new Date("2025-10-06 13:53"),
    size: 388275,
  },
  SECONDARY_DIPLOMA: {
    loader: () => import("@/components/tabs/generic/Image").then((m) => m.default),
    args: [() => import("@/assets/images/secondary-diploma.jpg").then((m) => m.default)],
    i18key: "info.miscellaneous.gallery.secondaryDiploma",
    type: TAB_TYPES.IMAGE,
    date: new Date("2026-06-17 19:33"),
    size: 546780,
  }
} as const satisfies Record<string, TabDefinition>
