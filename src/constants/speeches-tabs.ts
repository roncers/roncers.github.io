import { TAB_TYPES, type TabDefinition } from "../types/available-tabs/available-tab.types"

export const SPEECHES_TABS = {
  TEARS_IN_THE_RAIN: {
    loader: () => import("@/components/tabs/generic/Video").then((m) => m.default),
    args: [{ es: "qKpMFMiRkBI", en: "HU7Ga7qTLDU" }],
    i18key: "info.miscellaneous.speeches.tearsIntheRain",
    type: TAB_TYPES.VIDEO,
    date: new Date("1982-06-25 16:07"),
    size: 2760,
  },
  OUR_TIME_HAS_PASSED: {
    loader: () => import("@/components/tabs/generic/Video").then((m) => m.default),
    args: [{ es: "4IWN-6zBO2Q", en: "4IWN-6zBO2Q" }],
    i18key: "info.miscellaneous.speeches.ourTimeHasPassed",
    type: TAB_TYPES.VIDEO,
    date: new Date("2010-05-18 16:09"),
    size: 2280,
  },
  SWEAT_OF_HIS_BROW: {
    loader: () => import("@/components/tabs/generic/Video").then((m) => m.default),
    args: [{ es: "9_KMoUkX_os", en: "hyur9r0ekZY" }],
    i18key: "info.miscellaneous.speeches.sweatOfHisBrow",
    type: TAB_TYPES.VIDEO,
    date: new Date("2007-08-21 23:23"),
    size: 1800,
  },
} as const satisfies Record<string, TabDefinition>
