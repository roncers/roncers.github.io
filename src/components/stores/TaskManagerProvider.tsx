import { createContext, useReducer, use } from "react"
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
})

function tabsReducer(state: { maxZ: number; tabs: Tab[] }, action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_TAB":
      return { ...state, tabs: [...state.tabs, action.payload] }
    case "REMOVE_TAB":
      return { ...state, tabs: state.tabs.filter((tab) => tab.id !== action.payload) }
    case "UPDATE_TAB":
      return {
        ...state,
        tabs: state.tabs.map((tab) => (tab.id === action.payload.id ? {...tab, ...action.payload} : tab)),
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
            ? { ...tab, screenPosition: action.payload.screenPosition, prevPosition: { ...tab.screenPosition } }
            : tab
        ),
      }
    case "SET_TAB_PREV_SIZE":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, sizeX: tab.prevX!, sizeY: tab.prevY! }
            : tab
        ),
      }
    case "SET_TAB_PREV_POSITION":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, screenPosition: tab.prevPosition! }
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
    tabsStateDispatch({ type: "SET_TAB_POSITION", payload: { id, screenPosition } })
  }

  function setTabs(tabs: Tab[]) {
    tabsStateDispatch({ type: "SET_TABS", payload: tabs })
  }

  function incrementMaxZ() {
    tabsStateDispatch({ type: "INCREMENT_MAX_Z", payload: null })
  }

  function incrementTabZIndex(id: string) {
    incrementMaxZ()
    tabsStateDispatch({ type: "UPDATE_TAB_Z_INDEX", payload: { id } })
  }

  function maximizeTab(id: string) {
    tabsStateDispatch({ type: "SET_TAB_SIZE", payload: { id, sizeX: width, sizeY: height } })
    tabsStateDispatch({ type: "SET_TAB_POSITION", payload: { id, screenPosition: { x: 0, y: 0 } } })
  }

  function minimizeTab(id: string) {
    console.log('mini')
    tabsStateDispatch({ type: "SET_TAB_PREV_SIZE", payload: { id } })
    tabsStateDispatch({ type: "SET_TAB_PREV_POSITION", payload: { id } })
  }

  return (
    <TaskManagerContext.Provider value={{ maxZ: tabsState.maxZ, incrementMaxZ, tabs: tabsState.tabs, setTabs, addTab, removeTab, updateTab, setTabSize, setTabPosition, incrementTabZIndex, maximizeTab, minimizeTab }}>
      {children}
    </TaskManagerContext.Provider>
  )
}
