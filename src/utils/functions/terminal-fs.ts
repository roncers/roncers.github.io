import type {
  TabDefinition,
  TabEntry,
} from "@/types/available-tabs/available-tab.types"
import {
  ENTRY_POINT_TABS,
  PROJECTS_TABS,
  EXPERIENCE_TABS,
  MISC_TABS,
  SPEECHES_TABS,
  MY_TEXTS_TABS,
  GALLERY_TABS,
  P5JS_TABS,
  GLSL_TABS,
  TAB_TYPES,
} from "@/types/available-tabs/tabs-index.types"
import type { TranslationKey } from "@/i18n/types"

export interface FsNode {
  id: string
  name: string
  entry: TabEntry
  children?: FsNode[]
}

type Group = Record<string, TabDefinition>

// Which tab (by key) is the directory that lists which group of tabs.
const DIRECTORY_CONTENTS: Record<string, Group[]> = {
  MY_PROJECTS: [PROJECTS_TABS],
  CREATIVE_CODING: [P5JS_TABS, GLSL_TABS],
  MY_EXPERIENCE: [EXPERIENCE_TABS],
  MISCELLANEOUS: [MISC_TABS],
  SPEECHES: [SPEECHES_TABS],
  MY_TEXTS: [MY_TEXTS_TABS],
  GALLERY: [GALLERY_TABS],
}

export function toFileName(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "")
}

export function toTabLabel(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-")
}

function buildLevel(
  groups: Group[],
  t: (key: TranslationKey) => string,
): FsNode[] {
  const nodes: FsNode[] = []
  for (const group of groups) {
    for (const [id, def] of Object.entries(group)) {
      const entry: TabEntry = { ...def, label: t(def.i18key) }
      const contents =
        def.type === TAB_TYPES.DIRECTORY ? DIRECTORY_CONTENTS[id] : undefined
      nodes.push({
        id,
        name: toFileName(entry.label),
        entry,
        children: contents ? buildLevel(contents, t) : undefined,
      })
    }
  }
  return nodes
}

export function buildFileSystem(t: (key: TranslationKey) => string) {
  return buildLevel([ENTRY_POINT_TABS], t)
}

export function isDirectory(node: FsNode) {
  return node.children !== undefined
}

export function childrenOf(root: FsNode[], stack: FsNode[]) {
  return stack.length ? (stack[stack.length - 1].children ?? []) : root
}

export function resolveStack(root: FsNode[], ids: string[]) {
  const stack: FsNode[] = []
  for (const id of ids) {
    const node = childrenOf(root, stack).find((n) => n.id === id)
    if (!node || !isDirectory(node)) break
    stack.push(node)
  }
  return stack
}

export type ResolveResult =
  | { ok: true; stack: FsNode[]; node: FsNode | null }
  | { ok: false; error: string }

// `node` is the last resolved element (null means the root / a directory path).
export function resolvePath(
  root: FsNode[],
  cwd: FsNode[],
  path: string,
): ResolveResult {
  let stack =
    path.startsWith("/") || path === "~" || path.startsWith("~/") ? [] : [...cwd]
  let node: FsNode | null = stack.length ? stack[stack.length - 1] : null

  const segments = path.replace(/^~/, "").split("/")
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === "" || segment === ".") continue
    if (node && !isDirectory(node)) {
      return { ok: false, error: `${path}: Not a directory` }
    }
    if (segment === "..") {
      stack = stack.slice(0, -1)
      node = stack.length ? stack[stack.length - 1] : null
      continue
    }
    const found: FsNode | undefined = childrenOf(root, stack).find(
      (n) => n.name === segment,
    )
    if (!found) return { ok: false, error: `${path}: No such file or directory` }
    if (isDirectory(found)) stack = [...stack, found]
    node = found
  }
  return { ok: true, stack, node }
}

export function pathToString(stack: FsNode[]) {
  return stack.length ? "~/" + stack.map((n) => n.name).join("/") : "~"
}
