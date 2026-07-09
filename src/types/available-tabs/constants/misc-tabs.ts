import { TAB_TYPES, type TabDefinition } from "../commons.types"

// contact me, miscellaneous
export const MISC_TABS = {
  TEARS_IN_THE_RAIN: {
    loader: () => import("@/components/tabs/misc/speeches/TearsInTheRain").then((m) => m.default),
    i18key: "info.miscellaneous.tearsIntheRain",
    type: TAB_TYPES.VIDEO,
    date: new Date("1982-06-25 16:07"),
    size: 0,
  },
  OUR_TIME_HAS_PASSED: {
    loader: () => import("@/components/tabs/misc/speeches/OurTimeHasPassed").then((m) => m.default),
    i18key: "info.miscellaneous.ourTimeHasPassed",
    type: TAB_TYPES.VIDEO,
    date: new Date("2010-05-18 16:09"),
    size: 0,
  },
} as const satisfies Record<string, TabDefinition>
