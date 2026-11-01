import { use, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/internal-tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import { useAddTab } from "@/utils/hooks/useAddTab"
import { TAB_TYPES } from "@/types/available-tabs/tabs-index.types"
import {
  buildFileSystem,
  childrenOf,
  isDirectory,
  pathToString,
  resolvePath,
  resolveStack,
  toTabLabel,
  type FsNode,
} from "@/utils/functions/terminal-fs"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"
import styles from "./Terminal.module.css"

type Part = { text: string; className?: string }
type Line = { parts: Part[] }

const COMMANDS = ["cd", "ls", "pwd", "clear", "help"]

const HELP: string[] = [
  "Available commands:",
  "  ls [-l] [path]   list directory contents",
  "  cd [path]        change directory (cd, cd .., cd ~, cd /)",
  "  pwd              print the current directory",
  "  ./name           open a file or directory in a new window",
  "  clear            clear the terminal",
  "  help             show this message",
  "Tab autocompletes, up/down arrows browse the history.",
]

const text = (value: string, className?: string): Line => ({
  parts: [{ text: value, className }],
})

const error = (value: string) => text(value, styles.error)

function promptParts(path: string): Part[] {
  return [
    { text: "guest@roncers", className: styles.user },
    { text: ":" },
    { text: path, className: styles.path },
    { text: "$" },
  ]
}

function formatDate(date: Date) {
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

function commonPrefix(values: string[]) {
  return values.reduce((prefix, value) => {
    let i = 0
    while (i < prefix.length && prefix[i] === value[i]) i++
    return prefix.slice(0, i)
  })
}

export default function Terminal(props: TabComponentProps) {
  const { t } = useTranslation()
  const addTab = useAddTab()
  const { isMobile } = use(UiWindowContext)
  const root = useMemo(() => buildFileSystem(t), [t])

  const [cwdIds, setCwdIds] = useState<string[]>([])
  const [lines, setLines] = useState<Line[]>([
    text("Type 'help' to see the available commands.", styles.dim),
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const cwd = useMemo(() => resolveStack(root, cwdIds), [root, cwdIds])
  const promptPath = pathToString(cwd)
  const echoLine = (command: string): Line => ({
    parts: [...promptParts(promptPath), { text: " " + command }],
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" })
  }, [lines])

  function nodeParts(node: FsNode): Part[] {
    return [
      {
        text: isDirectory(node) ? node.name + "/" : node.name,
        className: node.entry.disabled
          ? styles.disabled
          : isDirectory(node)
            ? styles.dir
            : undefined,
      },
    ]
  }

  function ls(args: string[]): Line[] {
    const long = args.some((a) => a.startsWith("-") && a.includes("l"))
    const paths = args.filter((a) => !a.startsWith("-"))
    const target = paths[0] ?? "."
    const result = resolvePath(root, cwd, target)
    if (!result.ok) return [error(`ls: ${result.error}`)]

    const { node, stack } = result
    const items =
      node && !isDirectory(node) ? [node] : childrenOf(root, stack)
    if (!long) {
      return items.length
        ? [
            {
              parts: items.flatMap((n) => [
                ...nodeParts(n),
                { text: "  " },
              ]),
            },
          ]
        : []
    }
    return items.map((n) => ({
      parts: [
        {
          text: `${isDirectory(n) ? "d" : "-"}r-xr-xr-x ${n.entry.size
            .toString()
            .padStart(8)} ${formatDate(n.entry.date)} `,
        },
        ...nodeParts(n),
      ],
    }))
  }

  function cd(args: string[]): Line[] {
    const target = args[0] ?? "~"
    const result = resolvePath(root, cwd, target)
    if (!result.ok) return [error(`cd: ${result.error}`)]
    if (result.node && !isDirectory(result.node)) {
      return [error(`cd: ${target}: Not a directory`)]
    }
    setCwdIds(result.stack.map((n) => n.id))
    return []
  }

  function open(path: string): Line[] {
    const result = resolvePath(root, cwd, path)
    if (!result.ok) return [error(result.error)]
    const { node } = result
    if (!node) return [error(`${path}: Is the root directory`)]
    const { entry } = node
    if (entry.disabled) return [error(`${path}: Permission denied (working on it)`)]
    entry.loader().then((component) =>
      addTab(
        component,
        toTabLabel(entry.label),
        entry.type === TAB_TYPES.VIDEO ? "16:9" : "default",
        entry.args ?? [],
      ),
    )
    return []
  }

  function execute(raw: string) {
    const command = raw.trim()
    const echo = echoLine(raw)
    if (!command) {
      setLines((prev) => [...prev, echo])
      return
    }
    setHistory((prev) => [...prev, command])

    const [name, ...args] = command.split(/\s+/)
    let output: Line[]
    if (name.includes("/")) {
      output = open(name)
    } else {
      switch (name) {
        case "ls":
          output = ls(args)
          break
        case "cd":
          output = cd(args)
          break
        case "pwd":
          output = [text(pathToString(cwd))]
          break
        case "help":
          output = HELP.map((l) => text(l))
          break
        case "clear":
          setLines([])
          return
        default:
          output = [error(`${name}: command not found`)]
      }
    }
    setLines((prev) => [...prev, echo, ...output])
  }

  function autocomplete() {
    const tokens = input.split(/\s+/)
    const token = tokens[tokens.length - 1]
    const isCommand = tokens.length === 1 && !token.includes("/")
    let candidates: string[]
    let base = ""
    if (isCommand) {
      candidates = COMMANDS.filter((c) => c.startsWith(token))
    } else {
      const slash = token.lastIndexOf("/")
      base = token.slice(0, slash + 1)
      const partial = token.slice(slash + 1)
      const result = resolvePath(root, cwd, base || ".")
      if (!result.ok || (result.node && !isDirectory(result.node))) return
      candidates = childrenOf(root, result.stack)
        .filter((n) => n.name.startsWith(partial))
        .map((n) => (isDirectory(n) ? n.name + "/" : n.name))
    }
    if (!candidates.length) return

    const completed = base + commonPrefix(candidates)
    const prefix = input.slice(0, input.length - token.length)
    if (candidates.length === 1) {
      setInput(prefix + completed + (isCommand ? " " : ""))
    } else {
      setInput(prefix + completed)
      setLines((prev) => [
        ...prev,
        echoLine(input),
        text(candidates.join("  ")),
      ])
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "Enter":
        e.preventDefault()
        execute(input)
        setInput("")
        setHistoryIndex(null)
        break
      case "Tab":
        e.preventDefault()
        autocomplete()
        break
      case "ArrowUp": {
        e.preventDefault()
        if (!history.length) break
        const next =
          historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0)
        setHistoryIndex(next)
        setInput(history[next])
        break
      }
      case "ArrowDown": {
        e.preventDefault()
        if (historyIndex === null) break
        const next = historyIndex + 1
        if (next >= history.length) {
          setHistoryIndex(null)
          setInput("")
        } else {
          setHistoryIndex(next)
          setInput(history[next])
        }
        break
      }
      case "l":
        if (e.ctrlKey) {
          e.preventDefault()
          setLines([])
        }
        break
      case "c":
        if (e.ctrlKey && !window.getSelection()?.toString()) {
          e.preventDefault()
          setLines((prev) => [...prev, echoLine(input + "^C")])
          setInput("")
          setHistoryIndex(null)
        }
        break
    }
  }

  return (
    <PoppingWindow {...props}>
      <div
        className={styles.terminal}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus()
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className={styles.line}>
            {line.parts.map((part, j) => (
              <span key={j} className={part.className}>
                {part.text}
              </span>
            ))}
          </div>
        ))}
        <label className={styles.inputLine}>
          <span className={styles.prompt}>
            {promptParts(promptPath).map((part, j) => (
              <span key={j} className={part.className}>
                {part.text}
              </span>
            ))}
          </span>
          <input
            ref={inputRef}
            autoFocus={!isMobile}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="terminal input"
            className={styles.input}
          />
        </label>
        <div ref={bottomRef} />
      </div>
    </PoppingWindow>
  )
}
