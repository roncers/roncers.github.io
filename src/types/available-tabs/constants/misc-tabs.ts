import { TAB_TYPES, type TabDefinition } from "../commons.types"

// TODO: Put the size
export const MISC_TABS = {
  TEARS_IN_THE_RAIN: {
    loader: () => import("@/components/tabs/misc/speeches/TearsInTheRain").then((m) => m.default),
    i18key: "info.miscellaneous.tearsIntheRain",
    type: TAB_TYPES.VIDEO,
    date: new Date("1982-06-25 16:07"),
    size: 276,
  },
  OUR_TIME_HAS_PASSED: {
    loader: () => import("@/components/tabs/misc/speeches/OurTimeHasPassed").then((m) => m.default),
    i18key: "info.miscellaneous.ourTimeHasPassed",
    type: TAB_TYPES.VIDEO,
    date: new Date("2010-05-18 16:09"),
    size: 228,
  },
  SWEAT_OF_HIS_BROW: {
    loader: () => import("@/components/tabs/misc/speeches/SweatOfHisBrow").then((m) => m.default),
    i18key: "info.miscellaneous.sweatOfHisBrow",
    type: TAB_TYPES.VIDEO,
    date: new Date("2007-08-21 23:23"),
    size: 180,
  },
} as const satisfies Record<string, TabDefinition>
