import { TAB_TYPES, type TabDefinition } from "../commons.types"

// contact me, miscellaneous
export const MISC_TABS = {
  TEARS_IN_THE_RAIN: {
    loader: () => import("@/components/tabs/misc/TearsInTheRain").then((m) => m.default),
    i18key: "info.miscellaneous.tearsIntheRain",
    type: TAB_TYPES.VIDEO,
    date: new Date("1982-06-25 16:07"),
    size: 17,
  },
} as const satisfies Record<string, TabDefinition>
