import { createContext, useReducer } from "react"
import { Tab } from "@/types/tab.types"

interface TaskManagerContextType {
  maxZ: number
  tabs: Tab[]
  incrementMaxZ: () => void
  setTabs: (tabs: Tab[]) => void
  addTab: (tab: Tab) => void
  removeTab: (id: string) => void
  updateTab: (tab: Tab) => void
  setTabSize: (id: string, sizeX: number, sizeY: number) => void
  setTabPosition: (id: string, screenPosition: { x: number; y: number } | null) => void
  incrementTabZIndex: (id: string) => void
}

export const TaskManagerContext = createContext<TaskManagerContextType>({
  maxZ: 0,
  tabs: [],
  incrementMaxZ: () => {},
  setTabs: () => {},
  addTab: () => {},
  removeTab: () => {},
  updateTab: () => {},
  setTabSize: () => {},
  setTabPosition: () => {},
  incrementTabZIndex: () => {},
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
        tabs: state.tabs.map((tab) => (tab.id === action.payload.id ? action.payload : tab)),
      }
    case "SET_TAB_SIZE":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, sizeX: action.payload.sizeX, sizeY: action.payload.sizeY }
            : tab
        ),
      }
    case "SET_TAB_POSITION":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, screenPosition: action.payload.screenPosition }
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
  const [tabsState, tabsStateDispatch] = useReducer(tabsReducer, {maxZ: 0, tabs: []})

  function addTab(tab: Tab) {
    tabsStateDispatch({ type: "ADD_TAB", payload: tab })
  }

  function removeTab(id: string) {
    tabsStateDispatch({ type: "REMOVE_TAB", payload: id })
  }

  function updateTab(tab: Tab) {
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

  return (
    <TaskManagerContext.Provider value={{ maxZ: tabsState.maxZ, incrementMaxZ, tabs: tabsState.tabs, setTabs, addTab, removeTab, updateTab, setTabSize, setTabPosition, incrementTabZIndex }}>
      {children}
    </TaskManagerContext.Provider>
  )
}
