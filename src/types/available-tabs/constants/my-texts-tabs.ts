import { TAB_TYPES, type TabDefinition } from "../commons.types"

// TODO: update the size
export const MY_TEXTS_TABS = {
    FARMER_AND_VAGABOND: {
        loader: () => import("@/components/tabs/misc/writings/FarmerAndVagabond").then((m) => m.default),
        i18key: "info.miscellaneous.myTexts.farmerAndVagabond.title",
        type: TAB_TYPES.FILE,
        date: new Date("2024-12-15 22:23"),
        size: 232,
    },
    STAGECOACH_REVIEW: {
        loader: () => import("@/components/tabs/misc/writings/StagecoachReview").then((m) => m.default),
        i18key: "info.miscellaneous.myTexts.stagecoachReview.title",
        type: TAB_TYPES.FILE,
        date: new Date("2024-12-03 12:08"),
        size: 232,
    }
} as const satisfies Record<string, TabDefinition>
