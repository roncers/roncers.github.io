import { TAB_TYPES, type TabDefinition } from "../commons.types"

// contact me, miscellaneous
export const MISC_TABS = {
  TEARS_IN_THE_RAIN: {
    loader: () => import("@/components/tabs/misc/TearsInTheRain").then((m) => m.default),
    i18key: "info.miscellaneous.tearsIntheRain",
    type: TAB_TYPES.VIDEO,
    date: new Date("2026-07-07 18:46"),
    size: 17,
  },
} as const satisfies Record<string, TabDefinition>
