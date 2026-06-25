import { createContext, useReducer, use, useEffect } from "react"
import { Tab } from "@/types/tab.types"
import { UiWindowContext } from "@/components/stores/UiWindowProvider"

type TabUpdate = Pick<Tab, 'id'> & Partial<Omit<Tab, 'id'>>;

interface TaskManagerContextType {
  maxZ: number
  tabs: Tab[]
  incrementMaxZ: () => void
  setTabs: (tabs: Tab[]) => void
  addTab: (tab: Tab) => void
  removeTab: (id: string) => void
  updateTab: (tab: TabUpdate) => void
  setTabSize: (id: string, sizeX: number, sizeY: number) => void
  setTabPosition: (id: string, screenPosition: { x: number; y: number } | null) => void
  incrementTabZIndex: (id: string) => void
  maximizeTab: (id: string) => void
  minimizeTab: (id: string) => void
  fadeTab: (id: string) => void
  hideTab: (id: string) => void
}

export const TaskManagerContext = createContext<TaskManagerContextType>({
  maxZ: 0,
  tabs: [],
  incrementMaxZ: () => { },
  setTabs: () => { },
  addTab: () => { },
  removeTab: () => { },
  updateTab: () => { },
  setTabSize: () => { },
  setTabPosition: () => { },
  incrementTabZIndex: () => { },
  maximizeTab: () => { },
  minimizeTab: () => { },
  fadeTab: () => { },
  hideTab: () => { },
})

function tabsReducer(state: { maxZ: number; tabs: Tab[] }, action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_TAB":
      return { ...state, tabs: [...state.tabs, action.payload] }
    case "FADE_OUT":
      return {
        ...state,
        tabs: state.tabs.map((tab) => (tab.id === action.payload.id ? { ...tab, fadingOut: true } : tab)),
      }
    case "REMOVE_TAB":
      return { ...state, tabs: state.tabs.filter((tab) => tab.id !== action.payload) }
    case "UPDATE_TAB":
      return {
        ...state,
        tabs: state.tabs.map((tab) => (tab.id === action.payload.id ? { ...tab, ...action.payload } : tab)),
      }
    case "SET_TAB_SIZE":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, sizeX: action.payload.sizeX, sizeY: action.payload.sizeY, prevX: tab.sizeX, prevY: tab.sizeY }
            : tab
        ),
      }
    case "SET_TAB_POSITION":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, screenPosition: action.payload.screenPosition, prevPosition: tab.screenPosition ?? null }
            : tab
        ),
      }
    case "SET_TAB_PREV_SIZE":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, sizeX: Math.min(tab.prevX!, (action.payload.width - 10)), sizeY: Math.min(tab.prevY!, (action.payload.height - 10)) }
            : tab
        ),
      }
    case "SET_TAB_PREV_POSITION":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, screenPosition: tab.prevPosition ?? { x: 10, y: 10 } }
            : tab
        ),
      }
    case "SET_TABS":
      return { ...state, tabs: action.payload }
    case "INCREMENT_MAX_Z":
      return { ...state, maxZ: state.maxZ + 1 }
    case "UPDATE_TAB_Z_INDEX":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, zIndex: state.maxZ }
            : tab
        ),
      }
    case "FIT_TABS_TO_VIEWPORT":
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          const minX = Math.min(tab.sizeX, action.payload.width)
          const minY = Math.min(tab.sizeY, action.payload.height)
          return {
          ...tab,
          sizeX: minX,
          sizeY: minY,
          prevX: Math.min(tab.prevX ?? (minX - 100), minX),
          prevY: Math.min(tab.prevY ?? (minY - 100), minY),
        }
      }),
      }
    default:
      return state
  }
}

export default function TaskManagerContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [tabsState, tabsStateDispatch] = useReducer(tabsReducer, { maxZ: 0, tabs: [] })
  const { width, height } = use(UiWindowContext)

  function addTab(tab: Tab) {
    tabsStateDispatch({ type: "ADD_TAB", payload: tab })
  }

  function removeTab(id: string) {
    tabsStateDispatch({ type: "REMOVE_TAB", payload: id })
  }

  function updateTab(tab: TabUpdate) {
    tabsStateDispatch({ type: "UPDATE_TAB", payload: tab })
  }

  function setTabSize(id: string, sizeX: number, sizeY: number) {
    tabsStateDispatch({ type: "SET_TAB_SIZE", payload: { id, sizeX, sizeY } })
  }

  function setTabPosition(id: string, screenPosition: { x: number; y: number } | null) {
    const clamped = screenPosition
      ? {
          x: Math.min(Math.max(screenPosition.x, -10), 90),
          y: Math.min(Math.max(screenPosition.y, 0), 90),
        }
      : null
    tabsStateDispatch({ type: "UPDATE_TAB", payload: { id, screenPosition: clamped } })
  }

  function setTabs(tabs: Tab[]) {
    tabsStateDispatch({ type: "SET_TABS", payload: tabs })
  }

  function incrementMaxZ() {
    tabsStateDispatch({ type: "INCREMENT_MAX_Z", payload: null })
  }

  function incrementTabZIndex(id: string) {
    const tab = tabsState.tabs.find((t: Tab) => t.id === id)
    if (tab && tab.zIndex === tabsState.maxZ) return
    incrementMaxZ()
    tabsStateDispatch({ type: "UPDATE_TAB_Z_INDEX", payload: { id } })
  }

  function maximizeTab(id: string) {
    tabsStateDispatch({ type: "SET_TAB_SIZE", payload: { id, sizeX: width, sizeY: height } })
    tabsStateDispatch({ type: "SET_TAB_POSITION", payload: { id, screenPosition: { x: 0, y: 0 } } })
  }

  function minimizeTab(id: string) {
    tabsStateDispatch({ type: "SET_TAB_PREV_SIZE", payload: { id, width, height } })
    tabsStateDispatch({ type: "SET_TAB_PREV_POSITION", payload: { id } })
  }

  function fadeTab(id: string) {
    tabsStateDispatch({ type: "FADE_OUT", payload: { id } })
    setTimeout(() => {
      // removes it from the dom when a certain time passes
      removeTab(id)
    }, 1000)
  }

  function hideTab(id: string) {
    updateTab({ id, screenPosition: null })
  }

  useEffect(() => {
    tabsStateDispatch({ type: "FIT_TABS_TO_VIEWPORT", payload: { width, height } })
  }, [width, height])

  return (
    <TaskManagerContext.Provider value={{ maxZ: tabsState.maxZ, incrementMaxZ, tabs: tabsState.tabs, setTabs, addTab, removeTab, updateTab, setTabSize, setTabPosition, incrementTabZIndex, maximizeTab, minimizeTab, fadeTab, hideTab }}>
      {children}
    </TaskManagerContext.Provider>
  )
}
