import { TAB_TYPES, linkLoader, type TabDefinition } from "../commons.types"

export const PROJECTS_TABS = {
  PHRASE_RANDOMIZER: {
    loader: linkLoader("https://martin-roncero.com/word-randomizer"),
    i18key: "info.projects.phraseRandomizer",
    type: TAB_TYPES.LINK,
    date: new Date("2026-06-03 22:24"),
    size: 3687,
  },
  UML_EDITOR: {
    loader: linkLoader("https://martin-roncero.com/uml-editor"),
    i18key: "info.projects.umlEditor",
    type: TAB_TYPES.LINK,
    date: new Date("2026-01-03 14:00"),
    size: 3380,
  },
  ATV: {
    loader: linkLoader("https://martin-roncero.com/avoid-the-void"),
    i18key: "info.projects.atv",
    type: TAB_TYPES.LINK,
    date: new Date(),
    size: 4500,
    disabled: true
  },
  CREATIVE_CODING: {
    loader: () =>
      import("@/components/tabs/projects/CreativeCoding").then((m) => m.default),
    i18key: "info.projects.creativeCoding",
    type: TAB_TYPES.DIRECTORY,
    date: new Date("2026-03-29 18:23"),
    size: 1287,
  }
} as const satisfies Record<string, TabDefinition>
